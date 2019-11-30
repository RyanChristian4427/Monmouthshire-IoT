export interface Sensor {
    nodeId: number;
    name: string;
    type: SensorType;
    hardware: HardwareType;
}

export enum SensorType {
    kitchen,
    bedroom,
    bathroom,
    livingRoom,
    exteriorDoor,
    none
}

export enum HardwareType {
    multiSensor = 'multiSensor',
    smartSwitch = 'smartSwitch',
}
