import SensorReading from 'src/database/models/sensorReading';

export const createSensorReading = (newReading: any): SensorReading => {
    return {
        userId: newReading.userId,
        nodeId: newReading.nodeId,
        roomType: newReading.roomType,
        value: newReading.value,
        sensorType: newReading.sensorType,
    };
};
