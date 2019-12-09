import {action, observable} from 'mobx';
import {createContext} from 'react';

import {lightDataProcessor} from 'components/graphs/utility/DataProcessor';
import {ProcessedData, ProcessedNodeData, ProcessedSensorData} from 'models/Neo4J';
import {getHumidityData, getLuminanceData, getTemperatureData} from 'services/requests';


export interface SensorDatax {
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

    @observable startDate = '2019-12-06';
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

        if (dataType === 'Temperature') {
            const temperatureData = await getTemperatureData(currentUser, this.getStartDateTime(), this.getEndDateTime());
            lightDataProcessor(temperatureData, this, dataType);
        } else if (dataType === 'Humidity') {
            const humidityData = await getHumidityData(currentUser, this.getStartDateTime(), this.getEndDateTime());
            lightDataProcessor(humidityData, this, dataType);
        } else if (dataType === 'Luminance') {
            const luminanceData = await getLuminanceData(currentUser, this.getStartDateTime(), this.getEndDateTime());
            lightDataProcessor(luminanceData, this, dataType);
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
    getAllTemperatureData(): SensorDatax[] {
        return [
            { roomName: 'Kitchen', data: this.getData().kitchen.temperature },
            { roomName: 'Bedroom', data: this.getData().bedroom.temperature },
            { roomName: 'Bathroom', data: this.getData().bathroom.temperature },
            { roomName: 'Living Room', data: this.getData().livingRoom.temperature },
            { roomName: 'Exterior Door', data: this.getData().exteriorDoor.temperature },
       ];
    }

    @action
    setAllTemperatureData(sensorData: SensorDatax[]): void {
        sensorData.forEach((data) => {
            if (data.roomName === 'Kitchen') {
                this.dataList.kitchen.temperature = data.data;
            } else if (data.roomName === 'Living Room') {
                this.dataList.livingRoom.temperature = data.data;
            } else if (data.roomName === 'Bedroom') {
                this.dataList.bedroom.temperature = data.data;
            }
        });
    }

    @action
    getAllHumidityData(): SensorDatax[] {
        return [
            { roomName: 'Kitchen', data: this.getData().kitchen.humidity },
            { roomName: 'Bedroom', data: this.getData().bedroom.humidity },
            { roomName: 'Bathroom', data: this.getData().bathroom.humidity },
            { roomName: 'Living Room', data: this.getData().livingRoom.humidity },
            { roomName: 'Exterior Door', data: this.getData().exteriorDoor.humidity },
        ];
    }

    @action
    setAllHumidityData(sensorData: SensorDatax[]): void {
        sensorData.forEach((data) => {
            if (data.roomName === 'Kitchen') {
                this.dataList.kitchen.humidity = data.data;
            } else if (data.roomName === 'Living Room') {
                this.dataList.livingRoom.humidity = data.data;
            } else if (data.roomName === 'Bedroom') {
                this.dataList.bedroom.humidity = data.data;
            }
        });
    }

    @action
    getAllLuminanceData(): SensorDatax[] {
        return [
            { roomName: 'Kitchen', data: this.getData().kitchen.luminance },
            { roomName: 'Bedroom', data: this.getData().bedroom.luminance },
            { roomName: 'Bathroom', data: this.getData().bathroom.luminance },
            { roomName: 'Living Room', data: this.getData().livingRoom.luminance },
            { roomName: 'Exterior Door', data: this.getData().exteriorDoor.luminance },
        ];
    }

    @action
    setAllLuminanceData(sensorData: SensorDatax[]): void {
        sensorData.forEach((data) => {
            if (data.roomName === 'Kitchen') {
                this.dataList.kitchen.luminance = data.data;
            } else if (data.roomName === 'Living Room') {
                this.dataList.livingRoom.luminance = data.data;
            } else if (data.roomName === 'Bedroom') {
                this.dataList.bedroom.luminance = data.data;
            }
        });
    }

    @action
    getAllMotionData(): SensorDatax[] {
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
