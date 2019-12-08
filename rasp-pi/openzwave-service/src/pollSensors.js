import ZWave from 'openzwave-shared';
import io from 'socket.io';
import SensorService from './service/sensorService';
import ServerSocket from './sockets/serverSocket';
import logger from './util/logger';
import ReadingService from './service/readingService';
import {USER_ID} from './util/secrets';


const sensorService = new SensorService();
const readingService = new ReadingService();
const socket = io.listen('3030');
const serverSocket = new ServerSocket(socket);

serverSocket.setUpSocketConnection();

const zwave = new ZWave({
	ConsoleOutput: false,
    Logging: false,
    SaveConfiguration: false,
    DriverMaxAttempts: 5,
    PollInterval: 200,
    SuppressValueRefresh: true,
});

let nodes = [];
let homeid = null;
zwave.on('driver ready', function(home_id) {
	homeid = home_id;
	console.log('scanning homeid=0x%s...', homeid.toString(16));
});

zwave.on('driver failed', function() {
	console.log('failed to start driver');
	process.exit();
});

zwave.on('node added', function(nodeId) {
	nodes[nodeId] = {
		manufacturer: '',
		manufacturerid: '',
		product: '',
		producttype: '',
		productid: '',
		type: '',
		name: '',
		loc: '',
		classes: {},
		ready: false,
	};
});

const getNodePath = (nodeId) => nodeId.split('-').map((entry) => parseInt(entry, 10));

zwave.on('value added', function(nodeId, comclass, value) {
	const classes = nodes[nodeId].classes;

	if('112' in classes){
		if('2' in classes['112']){
			logger.debug(`Setting values to poll for motion on node ${nodeId}`);
			const onTime = getNodePath(classes['112']['2'].value_id);
			zwave.setValue(...onTime, 200);
			const motionType = getNodePath(classes['112']['2'].value_id);
			zwave.setValue(...motionType, 'Binary Sensor Report');
		}
	}

	if(value){
		const data = {
			nodeId,
			value: value.value,
			roomType: sensorService.getRoomType(nodeId),
			sensorType: value.label,
			userId: USER_ID
		};

		readingService.sendReading(data);

		if (!nodes[nodeId]['classes'][comclass]) {
			nodes[nodeId]['classes'][comclass] = {};
			nodes[nodeId]['classes'][comclass][value.index] = value;
		}
	}
});

zwave.on('value changed', function(nodeId, comclass, value) {
	if(value){
		logger.info(`node ${nodeId}: ${comclass} : ${value['label']}: ${value['value']}`);

		sensorService.getById(nodeId)
			.then((sensor) => {
				const data = {
					nodeId,
					value: value.value,
					roomType: sensor.roomType,
					sensorType: value.label,
					userId: USER_ID,
					units: value.units
				};
				readingService.sendReading(data);
			});

		if(sensorService.sensorHasBeenShook(value.label)){
			sensorService.getById(nodeId)
				.then((sensor) => {
					logger.debug(`Sensor shake detected from sensor ${nodeId}`);
					logger.debug(sensor);
					serverSocket.alertSensorShake(sensor);
				});
			}
		}
  nodes[nodeId]['classes'][comclass][value.index] = value;
});

zwave.on('value removed', function(nodeId, comclass, index) {
  if (nodes[nodeId]['classes'][comclass] &&
    nodes[nodeId]['classes'][comclass][index])
    delete nodes[nodeId]['classes'][comclass][index];
});

const isControllerNode = (hardwareType) => {
	return hardwareType === 'Z-Stick Gen5';
};

zwave.on('node ready', function(nodeId, nodeinfo) {
	logger.debug(`Node ${nodeId} ready`);

	const sensor = {
		nodeId,
		hardware: nodeinfo.product,
		name: `Sensor ${nodeId} (${nodeinfo.product})`,
	};

	if(!isControllerNode(sensor.hardware)){
		sensorService.create(sensor);
		serverSocket.alertSensorAdded(sensor);
	}

	nodes[nodeId]['manufacturer'] = nodeinfo.manufacturer;
	nodes[nodeId]['manufacturerid'] = nodeinfo.manufacturerid;
	nodes[nodeId]['product'] = nodeinfo.product;
	nodes[nodeId]['producttype'] = nodeinfo.producttype;
	nodes[nodeId]['productid'] = nodeinfo.productid;
	nodes[nodeId]['type'] = nodeinfo.type;
	nodes[nodeId]['name'] = nodeinfo.name;
	nodes[nodeId]['loc'] = nodeinfo.loc;
	nodes[nodeId]['ready'] = true;


	for (let comclass in nodes[nodeId]['classes']) {
		switch (comclass) {
			case 0x25: // COMMAND_CLASS_SWITCH_BINARY
			case 0x26: // COMMAND_CLASS_SWITCH_MULTILEVEL
				let valueIds = nodes[nodeId]['classes'][comclass];
				for (valueId in valueIds) {
					zwave.enablePoll(valueId, comclass);
					break;
				}
		}
	}
});

zwave.on('scan complete', function() {
	logger.info('====> scan complete');
	zwave.requestAllConfigParams(3);
});

zwave.connect('/dev/ttyACM0');

process.on('SIGINT', function() {
	logger.info('disconnection...');
    zwave.disconnect('/dev/ttyACM0');
    process.exit();
});
