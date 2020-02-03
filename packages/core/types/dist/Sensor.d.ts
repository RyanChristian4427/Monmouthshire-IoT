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
export declare enum SensorDataType {
    temperature = 0,
    luminance = 1,
    motion = 2,
    ultraviolet = 3,
    humidity = 4,
    electricFlow = 5
}
export declare enum SensorHardwareType {
    multiSensor = "multiSensor",
    smartSwitch = "smartSwitch",
    zStickGen5 = "Z-Stick Gen5"
}
export interface SensorDataResponse {
    value: number;
    time: Date;
}
