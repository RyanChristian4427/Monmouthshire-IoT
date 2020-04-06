import { apiService } from 'ts-api-toolkit';
import { route } from 'preact-router';
import { RoomResponse } from '@core/types';

export const getAllSensors = async (): Promise<RoomResponse[] | string> => {
    return await apiService
        .get('sensors')
        .then(({ data }) => {
            return data.data;
        })
        .catch(({ response }) => {
            if (response.data?.message === 'Access token has expired') route('/auth/login');
            return response.data?.message || 'Unknown error while retrieving sensors';
        });
};
