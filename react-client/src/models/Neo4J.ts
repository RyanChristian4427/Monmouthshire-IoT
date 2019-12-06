export interface NodeData {
    value: number;
    timestamp: { high: number; low: number };
}

export interface ProcessedNodeData {
    value: number;
    timestamp: Date;
}

export interface RoomData {
    data: NodeData[];
    name: string;
}
