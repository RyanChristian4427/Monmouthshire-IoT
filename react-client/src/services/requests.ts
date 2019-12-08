import {apiService} from 'ts-api-toolkit';
import {RoomData} from 'models/Neo4J';

export const getAllData = (currentUser: string, startDateTime: string, endDateTime: string): Promise<RoomData[]> => {
    return new Promise((resolve, reject) => {
        apiService.get(`/sensorReadings/all/${encodeURIComponent(currentUser)}/${startDateTime}/${endDateTime}`)
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
