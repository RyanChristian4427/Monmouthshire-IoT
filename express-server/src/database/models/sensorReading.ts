export default interface SensorReading {
    id: string;
    nodeId: number;
    userId: number;
    type: string;
    unit: string;
    value: number;
    sensorId: number;
}
