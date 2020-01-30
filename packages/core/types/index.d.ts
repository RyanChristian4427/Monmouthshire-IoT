export declare interface Room {
    id: number;
    userId: number;
    roomName: string;
    roomType: RoomType;
}

export declare enum RoomType {
    kitchen,
    bedroom,
    bathroom,
    livingRoom,
    exteriorDoor,
}

export declare interface RoomResponse {
    roomName: string;
    roomType: RoomType;
    temperature?: SensorDataResponse[];
    luminance?: SensorDataResponse[];
    motion?: SensorDataResponse[];
    ultraviolet?: SensorDataResponse[];
    humidity?: SensorDataResponse[];
    electricFlow?: SensorDataResponse[];
}

export declare interface SensorData {
    id: number;
    roomId: number;
    value: number;
    type: SensorType;
    time: Date;
}

export declare enum SensorType {
    temperature,
    luminance,
    motion,
    ultraviolet,
    humidity,
    electricFlow,
}

export declare interface SensorDataResponse {
    value: number;
    time: Date;
}
