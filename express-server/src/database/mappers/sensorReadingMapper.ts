export const createSensorReading = (newReading: any): object => {
    return {
        id : newReading.value_id,
        userId: 1,
        nodeId: newReading.node_id,
        type: newReading.label,
        value: newReading.value,
        unit: newReading.units
    };
};
