import axios from 'axios';
import { API_URL, USER_ID} from './util/secrets';
import { fahrenheitToCelsius } from './util/readings';
import logger from './util/logger';

export const postNewReading = (sensorReading) => {
	const url = `${API_URL}/sensorReadings/new`;
	delete sensorReading.units;
	
	logger.debug(`Sending a new sensor reading to ${url}`);

	axios.post(url, {sensorReading: sensorReading})
		.then((res) => {})
		.catch((err) => logger.error(err));
}

export const postNewMultiSensor = (sensor) => {
	const url = `${API_URL}/sensors/multi/new`;
	sensor['userId'] = USER_ID;
	
	logger.debug(`Sending a new sensor to ${url}`);
	axios.post(url, {sensor: sensor})
		.then((res) => {})
		.catch((err) => logger.error(err));
};
