import neo4j from 'neo4j-driver';

import SensorReading from 'src/database/models/sensorReading';

export const createSensorReading = (newReading: any): SensorReading => {
    return {
        id : newReading.value_id,
        userId: 1,
        nodeId: newReading.node_id,
        type: newReading.label,
        value: neo4j.int(newReading.value),
        unit: newReading.units
    };
};
