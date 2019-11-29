export interface Sensor {
    nodeId: number;
    name: string;
    type: SensorType;
}

export enum SensorType {
    kitchen,
    bedroom,
    bathroom,
    livingRoom,
    exteriorDoor,
    none
}
