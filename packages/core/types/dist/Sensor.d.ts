export interface SensorData {
    id: number;
    roomId: number;
    value: number;
    type: SensorType;
    time: Date;
}
export declare enum SensorType {
    temperature = 0,
    luminance = 1,
    motion = 2,
    ultraviolet = 3,
    humidity = 4,
    electricFlow = 5
}
export interface SensorDataResponse {
    value: number;
    time: Date;
}
