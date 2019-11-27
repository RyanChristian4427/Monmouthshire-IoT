import axios from 'axios';
import { API_URL } from './util/secrets';
import { fahrenheitToCelsius } from "./util/readings";

const url = `${API_URL}/sensorReadings/new`;

export const postNewReading = (sensorReading) => {
	sensorReading = formatReading(sensorReading);
	axios.post(url, {sensorReading: sensorReading})
		.then((res) => console.log(res))
		.catch((err) => console.log(err));
};

const formatReading = (sensorReading) => {
	const readingValue = sensorReading['value'];

	if (sensorReading['label'] === 'Temperature' && sensorReading['unit'] === 'F') {
		sensorReading['value'] = fahrenheitToCelsius(readingValue);
	}
	return sensorReading;
};
