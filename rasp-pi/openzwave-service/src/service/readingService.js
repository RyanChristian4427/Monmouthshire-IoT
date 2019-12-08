import logger from '../util/logger.js';
import { postNewReading } from '../client';
import AppDAO from '../database/appDao.js';
import { DATABASE_LOCATION } from  '../util/secrets';
import { fahrenheitToCelsius } from '../util/readings';
import SensorRepository from '../database/sensorRepository.js';

class ReadingService {

	sensorRepository;

	constructor(){
		const appDao = new AppDAO(DATABASE_LOCATION);
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
		// Couldn't get Motion to work, For the sake of demoing what the graphs could look like,
		// vibration readings were labelled as motion since vibration readings were not going to be
		// stored anyway. And at least it is maybe somewhat linked to motion
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
