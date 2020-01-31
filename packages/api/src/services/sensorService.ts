import { SensorType } from '@core/types';
import { RoomResponse } from '@core/types';

import { getAllSensorData, QueryRow } from 'src/db/sensorRepository';

export const getSensors = (email: string): Promise<RoomResponse[]> => {
    return new Promise((resolve, reject): void => {
        getAllSensorData(email)
            .then((data) => {
                resolve(dataProcessor(data));
            })
            .catch((error) => {
                if (error.received == 0) reject('Unknown User');
                else reject(error);
            });
    });
};

// TODO: Check out scalability of this. Might be slow.
const dataProcessor = (data: QueryRow[]): RoomResponse[] => {
    const processedData: RoomResponse[] = [];
    const processedRooms: string[] = [];

    data.forEach((row: QueryRow) => {
        if (!processedRooms.includes(row.roomName)) {
            processedRooms.push(row.roomName);
            processedData.push({
                roomName: row.roomName,
                roomType: row.roomType,
            });
        }
        const currentRoomIndex = processedData.findIndex((room) => room.roomName === row.roomName);
        switch (row.sensorType) {
            case SensorType.temperature:
                if (processedData[currentRoomIndex].temperature == undefined)
                    processedData[currentRoomIndex].temperature = [];
                processedData[currentRoomIndex].temperature.push({
                    value: row.value,
                    time: row.time,
                });
                break;
            case SensorType.luminance:
                if (processedData[currentRoomIndex].luminance == undefined)
                    processedData[currentRoomIndex].luminance = [];
                processedData[currentRoomIndex].luminance.push({
                    value: row.value,
                    time: row.time,
                });
                break;
            case SensorType.motion:
                if (processedData[currentRoomIndex].motion == undefined) processedData[currentRoomIndex].motion = [];
                processedData[currentRoomIndex].motion.push({
                    value: row.value,
                    time: row.time,
                });
                break;
            case SensorType.ultraviolet:
                if (processedData[currentRoomIndex].ultraviolet == undefined)
                    processedData[currentRoomIndex].ultraviolet = [];
                processedData[currentRoomIndex].ultraviolet.push({
                    value: row.value,
                    time: row.time,
                });
                break;
            case SensorType.humidity:
                if (processedData[currentRoomIndex].humidity == undefined)
                    processedData[currentRoomIndex].humidity = [];
                processedData[currentRoomIndex].humidity.push({
                    value: row.value,
                    time: row.time,
                });
                break;
            case SensorType.electricFlow:
                if (processedData[currentRoomIndex].electricFlow == undefined)
                    processedData[currentRoomIndex].electricFlow = [];
                processedData[currentRoomIndex].electricFlow.push({
                    value: row.value,
                    time: row.time,
                });
        }
    });
    return processedData;
};
