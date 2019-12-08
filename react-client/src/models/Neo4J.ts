export interface RoomData {
    name: string;
    sensorData: SensorData[];
}

export interface SensorData {
    type: string;
    nodeData: NodeData[];
}

export interface NodeData {
    value: number;
    timestamp: { low: number ; high: number };
}

// For after the epoch timestamp (returned from Neo4j) is converted into a JS date object
export interface ProcessedData {
    kitchen: ProcessedSensorData;
    bedroom: ProcessedSensorData;
    bathroom: ProcessedSensorData;
    livingRoom: ProcessedSensorData;
    exteriorDoor: ProcessedSensorData;
}

export interface ProcessedSensorData {
    motion: ProcessedNodeData[];
    temperature: ProcessedNodeData[];
    humidity: ProcessedNodeData[];
    luminance: ProcessedNodeData[];
}

export interface ProcessedNodeData {
    value: number;
    timestamp: Date;
}
