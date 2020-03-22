import { apiService } from 'ts-api-toolkit';
import { RoomResponse } from '@core/types';

export const getAllSensors = async (): Promise<RoomResponse[] | string> => {
    return await apiService
        .get('sensors')
        .then(({ data }) => {
            return data.data;
        })
        .catch(({ response }) => {
            return response.data?.message || 'Unknown error while retrieving sensors';
        });
};
