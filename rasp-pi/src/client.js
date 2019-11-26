import axios from 'axios';
import { API_URL } from './util/secrets';

const url = `${API_URL}/sensorReadings/new`;

export const postNewReading = (sensorReading) => {
	axios.post(url, {sensorReading: sensorReading})
		.then((res) => console.log(res))
		.catch((err) => console.log(err));

};
