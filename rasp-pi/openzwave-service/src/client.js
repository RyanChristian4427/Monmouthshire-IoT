import axios from 'axios';
import { API_URL } from './util/secrets';
import { fahrenheitToCelsius } from './util/readings';
import logger from './util/logger';

export const postNewReading = (sensorReading) => {
	const url = `${API_URL}/sensorReadings/new`;
	
	axios.post(url, {sensorReading: sensorReading})
		.then((res) => {})
		.catch((err) => logger.error(err));
};

export const postNewSensor = (sensor) => {
	const url = `${API_URL}/sensors/new`;
	
	axios.post(url, {sensor: sensor})
		.then((res) => {})
		.catch((err) => logger.error(err));
};
