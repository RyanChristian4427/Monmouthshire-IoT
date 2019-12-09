import {action, observable, toJS} from 'mobx';
import {createContext} from 'react';

import {dataProcessor} from 'components/graphs/utility/DataProcessor';
import {ProcessedData, ProcessedNodeData, ProcessedSensorData} from 'models/Neo4J';
import {getHumidityData, getLuminanceData, getTemperatureData} from 'services/requests';



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

    @observable startDate = '2019-12-07';
    @observable endDate = '2019-12-07';

    @action
    getStartDateTime(): string {
        return this.startDate + 'T00:00:00';
    }

    @action
    getEndDateTime(): string {
        return this.endDate + 'T23:59:59';
    }

    @action
    async updateData(dataType: string): Promise<void> {
        // Hard-coding the user like this is absolutely terrible practice but I'm running low on time and creativity
        const currentUser = 'b8:27:eb:25:bf:f5';
        console.log(dataType);

        if (dataType === 'Temperature') {
            const temperatureData = await getTemperatureData(currentUser, this.getStartDateTime(), this.getEndDateTime());
            dataProcessor(temperatureData, this);
        } else if (dataType === 'Humidity') {
            const humidityData = await getHumidityData(currentUser, this.getStartDateTime(), this.getEndDateTime());
            console.log(humidityData);
            dataProcessor(humidityData, this);
        } else if (dataType === 'Luminance') {
            const luminanceData = await getLuminanceData(currentUser, this.getStartDateTime(), this.getEndDateTime());
            dataProcessor(luminanceData, this);
        }
    }

    @action
    getData(): ProcessedData {
        return this.dataList;
    }

    @action
    setData(dataList: ProcessedData): void {
        this.dataList = dataList;
    }

    @action
    getAllTemperatureData(): SensorData[] {
        return [
            { roomName: 'Kitchen', data: this.getData().kitchen.temperature },
            { roomName: 'Bedroom', data: this.getData().bedroom.temperature },
            { roomName: 'Bathroom', data: this.getData().bathroom.temperature },
            { roomName: 'Living Room', data: this.getData().livingRoom.temperature },
            { roomName: 'Exterior Door', data: this.getData().exteriorDoor.temperature },
       ];
    }

    @action
    getAllHumidityData(): SensorData[] {
        return [
            { roomName: 'Kitchen', data: this.getData().kitchen.humidity },
            { roomName: 'Bedroom', data: this.getData().bedroom.humidity },
            { roomName: 'Bathroom', data: this.getData().bathroom.humidity },
            { roomName: 'Living Room', data: this.getData().livingRoom.humidity },
            { roomName: 'Exterior Door', data: this.getData().exteriorDoor.humidity },
        ];
    }

    @action
    getAllLuminanceData(): SensorData[] {
        return [
            { roomName: 'Kitchen', data: this.getData().kitchen.luminance },
            { roomName: 'Bedroom', data: this.getData().bedroom.luminance },
            { roomName: 'Bathroom', data: this.getData().bathroom.luminance },
            { roomName: 'Living Room', data: this.getData().livingRoom.luminance },
            { roomName: 'Exterior Door', data: this.getData().exteriorDoor.luminance },
        ];
    }

    @action
    getAllMotionData(): SensorData[] {
        return [
            { roomName: 'Kitchen', data: this.getData().kitchen.motion },
            { roomName: 'Bedroom', data: this.getData().bedroom.motion },
            { roomName: 'Bathroom', data: this.getData().bathroom.motion },
            { roomName: 'Living Room', data: this.getData().livingRoom.motion },
            { roomName: 'Exterior Door', data: this.getData().exteriorDoor.motion },
        ];
    }
}

export const SensorDataStoreContext = createContext(new SensorDataStore());
