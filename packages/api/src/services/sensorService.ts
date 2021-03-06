import { SensorDataType, RoomResponse } from '@core/types';

import { getAllSensorData, QueryRow } from 'src/db/sensorRepository';

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
            case SensorDataType.temperature:
                if (processedData[currentRoomIndex].temperature == undefined)
                    processedData[currentRoomIndex].temperature = [];
                processedData[currentRoomIndex].temperature.push({
                    value: row.value,
                    time: row.time,
                });
                break;
            case SensorDataType.luminance:
                if (processedData[currentRoomIndex].luminance == undefined)
                    processedData[currentRoomIndex].luminance = [];
                processedData[currentRoomIndex].luminance.push({
                    value: row.value,
                    time: row.time,
                });
                break;
            case SensorDataType.motion:
                if (processedData[currentRoomIndex].motion == undefined) processedData[currentRoomIndex].motion = [];
                processedData[currentRoomIndex].motion.push({
                    value: row.value,
                    time: row.time,
                });
                break;
            case SensorDataType.ultraviolet:
                if (processedData[currentRoomIndex].ultraviolet == undefined)
                    processedData[currentRoomIndex].ultraviolet = [];
                processedData[currentRoomIndex].ultraviolet.push({
                    value: row.value,
                    time: row.time,
                });
                break;
            case SensorDataType.humidity:
                if (processedData[currentRoomIndex].humidity == undefined)
                    processedData[currentRoomIndex].humidity = [];
                processedData[currentRoomIndex].humidity.push({
                    value: row.value,
                    time: row.time,
                });
                break;
            case SensorDataType.electricFlow:
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

export const getSensors = async (userId: number): Promise<RoomResponse[]> => {
    const data = await getAllSensorData(userId).catch((error) => {
        if (error.received == 0) throw 'Unknown User';
        else throw error;
    });

    if (data) return dataProcessor(data);
};
