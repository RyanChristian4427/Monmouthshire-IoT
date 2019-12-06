import {apiService} from 'ts-api-toolkit';

export const getTemperatures = (currentUser: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        apiService.get('/sensorReadings/temperature', encodeURIComponent(currentUser))
            .then(({ data }) => {
                resolve(data);
            })
            .catch(({ response }) => {
                console.log(response);
                if (response !== undefined) {
                    reject(response.data.message);
                } else {
                    reject('Unknown Error');
                }
            });
    });
};
