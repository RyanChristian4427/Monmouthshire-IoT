import {MeasureType, RoomType} from 'models/Sensor';

export interface Node {
    userId: number;
    value: number | string;
    unit: string;
    measures: MeasureType;
    roomType: RoomType;
    timestamp: string;
}
