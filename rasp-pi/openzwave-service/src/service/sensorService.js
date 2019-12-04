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
		logger.info(sensor.hardware);
		sensor.hardware = this.determineSensorType(sensor.hardware);
        this.sensorRepository.create(sensor);
    }
    
    configure(sensor){
		delete sensor.id;
		postNewSensor(sensor);
	}

    updateSensor(sensorId, type, name) {
        return this.sensorRepository.updateSensor(sensorId, type, name);
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
