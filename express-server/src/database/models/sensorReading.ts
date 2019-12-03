import Integer from 'neo4j-driver/types/integer';

export default interface SensorReading {
    id: string;
    nodeId: number;
    userId: number;
    type: string;
    unit: string;
    value: Integer;
}
