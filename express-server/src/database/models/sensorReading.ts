export default interface SensorReading {
    nodeId: number;
    userId: string;
    sensorType: string;
    roomType: string;
    value: any;
}
