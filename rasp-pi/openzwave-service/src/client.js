import axios from 'axios';
import { API_URL } from './util/secrets';
import { fahrenheitToCelsius } from './util/readings';
import logger from './util/logger';

const url = `${API_URL}/sensorReadings/new`;

export const postNewReading = (sensorReading) => {
	sensorReading = formatReading(sensorReading);
	axios.post(url, {sensorReading: sensorReading})
		.then((res) => {})
		.catch((err) => logger.error(err));
};

const formatReading = (sensorReading) => {
	const readingValue = sensorReading['value'];

	if (sensorReading['label'] === 'Temperature' && sensorReading['units'] === 'F') {
		sensorReading['units'] = 'C';
		logger.debug(`New reading is ${sensorReading['value']} ${sensorReading['units']}`);
		sensorReading['value'] = fahrenheitToCelsius(readingValue);
	} 
	return sensorReading;
};
