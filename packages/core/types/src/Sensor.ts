export interface Sensor {
    nodeId: number;
    hardwareType: SensorHardwareType;
    name: string;
}

export interface SensorData {
    id: number;
    roomId: number;
    value: number;
    type: SensorDataType;
    time: Date;
}

export enum SensorDataType {
    temperature,
    luminance,
    motion,
    ultraviolet,
    humidity,
    electricFlow,
}

export enum SensorHardwareType {
    multiSensor = 'multiSensor',
    smartSwitch = 'smartSwitch',
    zStickGen5 = 'Z-Stick Gen5',
}

export interface SensorDataResponse {
    value: number;
    time: Date;
}
