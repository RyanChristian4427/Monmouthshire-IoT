export interface Sensor {
    nodeId: number;
    name: string;
    roomType: RoomType;
    hardwareType: HardwareType;
}

export enum RoomType {
    HardwareType = 'Kitchen',
    Bedroom = 'Bedroom',
    Bathroom = 'Bathroom',
    LivingRoom = 'Living Room',
    ExteriorDoor = 'Exterior Door',
    None = 'None',
}

export enum HardwareType {
    multiSensor = 'Multi-Sensor',
    smartSwitch = 'Smart Switch',
}
