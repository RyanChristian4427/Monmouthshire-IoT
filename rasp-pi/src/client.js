import axios from 'axios';
const serverIp = '192.168.1.42';
const url = `http://${serverIp}:5000/sensorReadings/new`;

export const postNewReading = (sensorReading) => {
    axios.post(url, { sensorReading: sensorReading })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

};