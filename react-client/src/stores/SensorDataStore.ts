import {action, observable} from 'mobx';
import {createContext} from 'react';

import {ProcessedData, ProcessedNodeData, ProcessedSensorData} from 'models/Neo4J';


export interface SensorData {
    roomName: string;
    data: ProcessedNodeData[];
}

const sensorDataStructure: ProcessedSensorData = {
    motion: [],
    temperature: [],
    humidity: [],
    luminance: [],
};

const dataStructure: ProcessedData = {
    kitchen: sensorDataStructure,
    bedroom: sensorDataStructure,
    bathroom: sensorDataStructure,
    livingRoom: sensorDataStructure,
    exteriorDoor: sensorDataStructure,
};

export class SensorDataStore {
    @observable dataList: ProcessedData = dataStructure;

    @observable startDateTime = '2019-12-06T00:00:00';
    @observable endDateTime = '2019-12-06T23:59:59';

    @action
    setData(dataList: ProcessedData): void {
        this.dataList = dataList;
    }

    @action
    getAllTemperatureData(): SensorData[] {
        return [
            { roomName: 'Kitchen', data: this.dataList.kitchen.temperature },
            { roomName: 'Bedroom', data: this.dataList.bedroom.temperature },
            { roomName: 'Bathroom', data: this.dataList.bathroom.temperature },
            { roomName: 'Living Room', data: this.dataList.livingRoom.temperature },
            { roomName: 'Exterior Door', data: this.dataList.exteriorDoor.temperature },
       ];
    }

    @action
    getAllHumidityData(): SensorData[] {
        return [
            { roomName: 'Kitchen', data: this.dataList.kitchen.humidity },
            { roomName: 'Bedroom', data: this.dataList.bedroom.humidity },
            { roomName: 'Bathroom', data: this.dataList.bathroom.humidity },
            { roomName: 'Living Room', data: this.dataList.livingRoom.humidity },
            { roomName: 'Exterior Door', data: this.dataList.exteriorDoor.humidity },
        ];
    }
}

export const SensorDataStoreContext = createContext(new SensorDataStore());
