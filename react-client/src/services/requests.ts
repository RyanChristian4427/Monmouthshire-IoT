import {apiService} from 'ts-api-toolkit';

export const getTemperatures = (currentUser: number) => {
    return new Promise((resolve, reject) => {
        apiService.get('/sensorReadings/temperature/', String(currentUser))
            .then(({ data }) => {
                resolve(data);
            })
            .catch(({ response }) => {
                if (response !== undefined) {
                    reject(response.data.message);
                } else {
                    reject('Unknown Error');
                }
            })
    });
};
