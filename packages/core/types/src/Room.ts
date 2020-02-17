import { SensorDataResponse } from './Sensor';

export interface Room {
    id: number;
    userId: number;
    roomName: string;
    roomType: RoomType;
}

export enum RoomType {
    kitchen,
    bedroom,
    bathroom,
    livingRoom,
    exteriorDoor,
    none,
}

export interface RoomResponse {
    roomName: string;
    roomType: RoomType;
    temperature?: SensorDataResponse[];
    luminance?: SensorDataResponse[];
    motion?: SensorDataResponse[];
    ultraviolet?: SensorDataResponse[];
    humidity?: SensorDataResponse[];
    electricFlow?: SensorDataResponse[];
}
