import { RoomType, SensorHardwareType } from '@core/types';

export interface Node {
    nodeId?: number;
    name: string;
    roomType: RoomType;
    sensorHardwareType: SensorHardwareType;
}
