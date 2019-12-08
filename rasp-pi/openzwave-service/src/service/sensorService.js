import logger from '../util/logger.js';
import SensorRepository from '../database/sensorRepository';
import AppDAO from '../database/appDao';
import { postNewSensor } from '../client';

class SensorService {
	

    sensorRepository;

    constructor() {
        const appDao = new AppDAO('/home/pi/databases/iot_team_3/iot_team_3.sqlite');
        this.sensorRepository = new SensorRepository(appDao);
    }

    createTable() {
        return this.sensorRepository.createTable();
    }

    create(sensor) {
		sensor.hardware = this.determineSensorType(sensor.hardware);
        this.sensorRepository.create(sensor);
    }
    
    getSensorType(nodeId){
		return this.sensorRepository.getSensorType(nodeId);
	}
    
    configure(nodeId){
		logger.debug(`NODE ID IS ${nodeId}`);
		const userId = 'b8:27:eb:25:bf:f5';
		this.getById(nodeId)
			.then((sensor) => {
				if(sensor.hardware === 'Multi Sensor'){
					postNewSensor({nodeId: 10, userId, roomType: sensor.roomType, name: sensor.name, type1: 'Temperature', type2: 'Motion', type3: 'Relative Humidity', type4: 'Luminance', type5: 'Ultraviolet'});
					/*postNewSensor({nodeId: 10, userId, roomType: sensor.roomType, name: sensor.name, type: 'Motion'});
					postNewSensor({nodeId: 10, userId, roomType: sensor.roomType, name: sensor.name, type: 'Relative Humidity'});
					postNewSensor({nodeId: 10, userId, roomType: sensor.roomType, name: sensor.name, type: 'Luminance'});
					postNewSensor({nodeId: 10, userId, roomType: sensor.roomType, name: sensor.name, type: 'Ultraviolet'}); */
				}
			});
	}

    updateSensor(sensorId, roomType, name) {
        //return this.sensorRepository.updateSensor(sensorId, type, name);
    }

    getAll() {
        return this.sensorRepository.getAll();
    }

    getById(nodeId){
        return this.sensorRepository.getById(nodeId);
    }

    sensorHasBeenShook(notificationType) {
        return notificationType === 'Burglar';
    };
    
     getRoomType(nodeId){
		switch(nodeId){
			case 3:
				return "Bedroom";
			case 4:
				return "Kitchen";
			default:
				return "Bedroom";
		}
	};
	
    determineSensorType(hardware) {
        switch(hardware){
			case 'MultiSensor 6':
				return 'Multi Sensor';
			case 'Smart Switch 6':
				return 'Smart Switch';
			default:
				return 'None';
		}
    };
}

export default SensorService;
