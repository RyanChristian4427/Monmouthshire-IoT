import ZWave, { NodeInfo } from 'openzwave-shared';
import { SensorHardwareType, RoomType } from '@core/types';

import { createNode, getNodeById, setupDB } from 'src/dataStorageHandler';
import { setUpSockets } from 'src/sockets/setup';
import logger from 'src/util/logger';
import { Node } from 'src/models/Node';
// import { USER_ID } from 'src/util/secrets';

// Socket configuration
export const socket = setUpSockets();

setupDB();

const zwave = new ZWave({
    ConsoleOutput: false,
    Logging: false,
    SaveConfiguration: false,
    DriverMaxAttempts: 5,
    PollInterval: 200,
    SuppressValueRefresh: true,
});

const nodes: NodeInfo[] = [];

zwave.on('driver ready', (homeId: number) => {
    logger.info('scanning homeId=0x%s...', homeId.toString(16));
});

zwave.on('driver failed', () => {
    logger.info('failed to start driver');
    process.exit();
});

zwave.on('node added', (nodeId: number) => {
    nodes[nodeId] = {
        manufacturer: '',
        manufacturerid: '',
        product: '',
        producttype: '',
        productid: '',
        type: '',
        name: '',
        loc: '',
    };
});

const getNodePath = (nodeId: string): number[] => nodeId.split('-').map((entry) => parseInt(entry, 10));

zwave.on('value added', (nodeId, comclass, value) => {
    const classes = nodes[nodeId].classes;

    if ('112' in classes) {
        if ('2' in classes['112']) {
            logger.debug(`Setting values to poll for motion on node ${nodeId}`);
            const onTime = getNodePath(classes['112']['2'].value_id);
            zwave.setValue(...onTime, 200);
            const motionType = getNodePath(classes['112']['2'].value_id);
            zwave.setValue(...motionType, 'Binary Sensor Report');
        }
    }

    if (value) {
        const data = {
            nodeId,
            value: value.value,
            roomType: getNodeById(nodeId).roomType,
            sensorType: value.label,
            userId: USER_ID,
        };

        readingService.sendReading(data);

        if (!nodes[nodeId]['classes'][comclass]) {
            nodes[nodeId]['classes'][comclass] = {};
            nodes[nodeId]['classes'][comclass][value.index] = value;
        }
    }
});

zwave.on('value changed', (nodeId, comclass, value) => {
    if (value) {
        logger.info(`node ${nodeId}: ${comclass} : ${value['label']}: ${value['value']}`);

        const node = getNodeById(nodeId);
        readingService.sendReading({
            nodeId,
            value: value.value,
            roomType: node.roomType,
            sensorType: value.label,
            userId: USER_ID,
            units: value.units,
        });

        if (value.label === 'Burglar') {
            const node = getNodeById(nodeId);
            logger.debug(`Sensor shake detected from sensor ${nodeId}`);
            socket.alertSensorShake(node);
        }
    }
    nodes[nodeId]['classes'][comclass][value.index] = value;
});

zwave.on('value removed', (nodeId, comclass, index) => {
    if (nodes[nodeId]['classes'][comclass] && nodes[nodeId]['classes'][comclass][index])
        delete nodes[nodeId]['classes'][comclass][index];
});

const isControllerNode = (hardwareType: SensorHardwareType): boolean => {
    return hardwareType == 'Z-Stick Gen5';
};

zwave.on('node ready', (nodeId, nodeinfo) => {
    logger.debug(`Node ${nodeId} ready`);

    const sensorHardwareType =
        nodeinfo.product == SensorHardwareType.multiSensor
            ? SensorHardwareType.multiSensor
            : SensorHardwareType.smartSwitch;

    const sensor: Node = {
        nodeId,
        name: `Sensor ${nodeId} (${nodeinfo.product})`,
        roomType: RoomType.none,
        sensorHardwareType,
    };

    if (!isControllerNode(sensor.sensorHardwareType)) {
        createNode(sensor);
        socket.alertSensorAdded(sensor);
    }

    nodes[nodeId] = {
        manufacturer: nodeinfo.manufacturer,
        manufacturerid: nodeinfo.manufacturerid,
        product: nodeinfo.product,
        producttype: nodeinfo.producttype,
        productid: nodeinfo.productid,
        type: nodeinfo.type,
        name: nodeinfo.name,
        loc: nodeinfo.loc,
    };

    for (const comclass in nodes[nodeId]['classes']) {
        switch (comclass) {
            case 0x25: // COMMAND_CLASS_SWITCH_BINARY
            case 0x26: // COMMAND_CLASS_SWITCH_MULTILEVEL
                const valueIds = nodes[nodeId]['classes'][comclass];
                for (valueId in valueIds) {
                    zwave.enablePoll(valueId, comclass);
                    break;
                }
        }
    }
});

zwave.on('scan complete', () => {
    logger.info('====> scan complete');
    zwave.requestAllConfigParams(3);
});

zwave.connect('/dev/ttyACM0');

process.on('SIGINT', () => {
    logger.info('disconnection...');
    zwave.disconnect('/dev/ttyACM0');
    process.exit();
});
