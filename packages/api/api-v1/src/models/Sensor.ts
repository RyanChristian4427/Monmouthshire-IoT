export interface SensorData {
    id: number;
    roomId: number;
    value: number;
    type: SensorType;
    time: Date;
}

export enum SensorType {
    temperature,
    luminance,
    motion,
    ultraviolet,
    humidity,
    electricFlow,
}

export interface SensorDataResponse {
    value: number;
    time: Date;
}
