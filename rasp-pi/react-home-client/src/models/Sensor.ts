export interface Sensor {
    id: number;
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
