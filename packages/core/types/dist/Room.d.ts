import { SensorDataResponse } from './Sensor';
export interface Room {
    id: number;
    userId: number;
    roomName: string;
    roomType: RoomType;
}
export declare enum RoomType {
    kitchen = 0,
    bedroom = 1,
    bathroom = 2,
    livingRoom = 3,
    exteriorDoor = 4,
    none = 5,
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
