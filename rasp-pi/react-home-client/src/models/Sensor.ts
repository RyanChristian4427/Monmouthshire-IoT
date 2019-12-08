export interface Sensor {
	id: number;
    nodeId: number;
    name: string;
    type: string;
    hardware: string;
}

export enum SensorType {
    Kitchen = 'Kitchen',
    Bedroom = 'Bedroom',
    Bathroom = 'Bathroom',
    LivingRoom = 'Living Room',
    ExteriorDoor = 'Front Door',
    None = 'None'
}

export enum HardwareType {
    multiSensor,
    smartSwitch
}
