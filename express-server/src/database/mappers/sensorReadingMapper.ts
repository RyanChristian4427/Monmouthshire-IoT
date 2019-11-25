import SensorReadding from 'src/database/models/sensorReading';

export const createSensorReading = (newReading: any): SensorReadding => {
    return {
        id : newReading.value_id,
        userId: 1,
        nodeId: newReading.node_id,
        type: newReading.label,
        value: newReading.value,
        unit: newReading.units
    };
};
