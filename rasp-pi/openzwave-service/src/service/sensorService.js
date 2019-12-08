import logger from '../util/logger.js';
import SensorRepository from '../database/sensorRepository';
import AppDAO from '../database/appDao';
import { postNewMultiSensor } from '../client';

class SensorService {
	

    sensorRepository;

    constructor() {
        const appDao = new AppDAO('/home/pi/databases/iot_team_3/iot_team_3.sqlite');
        this.sensorRepository = new SensorRepository(appDao);
    }

    createTable() {
        return this.sensorRepository.createTable();
    }

    create(sensor){
        this.sensorRepository.create(sensor);
    }
    
    getSensorType(nodeId){
		return this.sensorRepository.getSensorType(nodeId);
	}
    
    configure(nodeId){
		const userId = 'b8:27:eb:25:bf:f5';
		this.getById(nodeId)
			.then((sensor) => {
				if(sensor.hardware === 'MultiSensor 6'){
					const types = ['Temperature', 'Relative Humidity', 'Motion', 'Luminance', 'Ultraviolet'];
					postNewMultiSensor({
						nodeId: 10,
						userId,
						roomType: sensor.roomType,
						name: sensor.name, 
						types
					});

				}
			});
	}

    updateSensor(nodeId, roomType, name) {
        return this.sensorRepository.updateSensor(nodeId, roomType, name);
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
			case 0:
				return "Kitchen";
			case 1:
				return "Bedroom";
			case 2:
				return "Bathroom";
			case 3:
				return "Living Room";
			case 4:
				return "Front Door";
			default:
				return "None";
		}
	};
}

export default SensorService;
