export interface Sensor {
    nodeId: number;
    name: string;
    type: SensorType;
    hardware: string;
}

export enum SensorType {
    kitchen,
    bedroom,
    bathroom,
    livingRoom,
    exteriorDoor,
    none
}
