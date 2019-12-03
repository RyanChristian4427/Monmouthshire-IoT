export interface Sensor {
    nodeId: number;
    name: string;
    type: SensorType;
    hardware: HardwareType;
}

export enum SensorType {
    Kitchen,
    Bedroom,
    Bathroom,
    LivingRoom,
    ExteriorDoor,
    None
}

export enum HardwareType {
    multiSensor,
    smartSwitch,
}
