import {apiService} from 'ts-api-toolkit';
import {RoomData} from 'models/Neo4J';

export const getTemperatures = (currentUser: string): Promise<RoomData[]> => {
    return new Promise((resolve, reject) => {
        apiService.get('/sensorReadings/temperature', encodeURIComponent(currentUser))
            .then(({ data }) => {
                resolve(data);
            })
            .catch(({ response }) => {
                if (response !== undefined) {
                    reject(response.data.message);
                } else {
                    reject('Unknown Error');
                }
            });
    });
};
