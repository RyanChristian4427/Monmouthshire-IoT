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

export const getTemperatureData = (currentUser: string, startDateTime: string, endDateTime: string): Promise<RoomData[]> => {
    return new Promise((resolve, reject) => {
        apiService.get(`/sensorReadings/temperature/${encodeURIComponent(currentUser)}/${startDateTime}/${endDateTime}`)
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

export const getHumidityData = (currentUser: string, startDateTime: string, endDateTime: string): Promise<RoomData[]> => {
    return new Promise((resolve, reject) => {
        apiService.get(`/sensorReadings/humidity/${encodeURIComponent(currentUser)}/${startDateTime}/${endDateTime}`)
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

export const getLuminanceData = (currentUser: string, startDateTime: string, endDateTime: string): Promise<RoomData[]> => {
    return new Promise((resolve, reject) => {
        apiService.get(`/sensorReadings/luminance/${encodeURIComponent(currentUser)}/${startDateTime}/${endDateTime}`)
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
