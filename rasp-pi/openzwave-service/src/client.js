import axios from 'axios';
//import { API_URL, USER_ID} from './util/secrets';
import { fahrenheitToCelsius } from './util/readings';
import logger from './util/logger';

const API_URL = 'http://192.168.43.177:8000/api/v1';
const USER_ID = 'b8:27:eb:25:bf:f5';

export const postNewReading = (sensorReading) => {
	const url = `${API_URL}/sensorReadings/new`;
	delete sensorReading.units;

	axios.post(url, {sensorReading: sensorReading})
		.then((res) => {})
		.catch((err) => logger.error(err));
}

export const postNewMultiSensor = (sensor) => {
	const url = `${API_URL}/sensors/multi/new`;
	sensor['userId'] = USER_ID;
	
	axios.post(url, {sensor: sensor})
		.then((res) => {})
		.catch((err) => logger.error(err));
};
