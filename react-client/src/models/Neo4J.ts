import {MeasureType, RoomType} from 'models/Sensor';

export interface Node {
    userId: number;
    value: number | string;
    measures: MeasureType;
    roomType: RoomType;
    timestamp: string;
}
