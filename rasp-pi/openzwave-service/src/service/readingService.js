import logger from '../util/logger.js';
import { postNewReading } from '../client';
import AppDAO from '../database/appDao.js';
import { DATABASE_LOCATION } from  '../util/readings';
import { fahrenheitToCelsius } from '../util/readings';
import SensorRepository from '../database/sensorRepository.js';

class ReadingService {
	
	sensorRepository;
	
	constructor(){
		const appDao = new AppDAO('/home/pi/databases/iot_team_3/iot_team_3.sqlite');
		this.sensorRepository = new SensorRepository(appDao);
	}
	
	sendReading(sensorReading){
		if(this.readingIsValid(sensorReading)){
			const formattedReading = this.formatReading(sensorReading);
			postNewReading(formattedReading);
		}
	}
	
	formatReading(sensorReading){
		if (sensorReading['sensorType'] === 'Temperature' && sensorReading['units'] === 'F') {
			sensorReading = this.correctTemperature(sensorReading);
		}
		if(sensorReading['sensorType'] === 'Movement Detected' || sensorReading['sensorType'] === 'Burglar'){
			sensorReading['sensorType'] = 'Motion';
		}
		return sensorReading;
	}
	
	correctTemperature(sensorReading){
		const readingValue = sensorReading['value'];
		
		sensorReading['value'] = fahrenheitToCelsius(readingValue);
		logger.debug(`New reading is ${sensorReading['value']} ${sensorReading['units']}`);
		return sensorReading;
	}
	
	readingIsValid(reading){
		logger.debug(`Reading type is ${reading.sensorType}`);
        const validEvents = ['Temperature', 'Luminance', 'Relative Humidity', 'Ultraviolet', 'Motion', 'Burglar'];
        return validEvents.indexOf(reading['sensorType']) > -1;
    }
}

export default ReadingService;
