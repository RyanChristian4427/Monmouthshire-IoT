interface CompleteData {
    rooms: RoomData[];
}

export interface RoomData {
    name: string;
    sensorData: SensorData;
}

interface SensorData {
    humidity: NodeData[];
    temperature: NodeData[];
    luminance: NodeData[];
    motion: NodeData[];
}

export interface NodeData {
    value: number;
    timestamp: { low: number ; high: number };
}

// For after the epoch timestamp (returned from Neo4j) is converted into a JS date object
export interface ProcessedNodeData {
    value: number;
    timestamp: Date;
}
