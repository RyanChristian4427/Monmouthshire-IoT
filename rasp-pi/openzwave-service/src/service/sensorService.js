import logger from '../util/logger.js';
import SensorRepository from "../database/sensorRepository";
import AppDAO from "../database/appDao";

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
        return this.sensorRepository.create(sensor);
    }

    updateSensor(sensorId, type, name) {
        return this.sensorRepository.update(sensorId, type, name);
    }

    getAll() {
        return this.sensorRepository.getAll();
    }

    getById(nodeId){
        return this.sensorRepository.getById(nodeId)[0];
    }

    sensorHasBeenShook(notificationType) {
        return notificationType === 'Burglar';
    };
}

export default SensorService;
