import {action, observable} from 'mobx';
import {createContext} from 'react';

import {ProcessedNodeData} from 'models/Neo4J';

export class SensorDataStore {
    @observable kitchenDataList: ProcessedNodeData[] = [];
    @observable bedroomDataList: ProcessedNodeData[] = [];
    @observable bathroomDataList: ProcessedNodeData[] = [];
    @observable livingRoomDataList: ProcessedNodeData[] = [];
    @observable exteriorDoorDataList: ProcessedNodeData[] = [];

    @action
    setKitchenData(dataList: ProcessedNodeData[]): void {
        this.kitchenDataList = dataList;
    }

    @action
    setBedroomData(dataList: ProcessedNodeData[]): void {
        this.bedroomDataList = dataList;
    }

    @action
    setBathroomData(dataList: ProcessedNodeData[]): void {
        this.bathroomDataList = dataList;
    }

    @action
    setLivingRoomData(dataList: ProcessedNodeData[]): void {
        this.livingRoomDataList = dataList;
    }

    @action
    setExteriorDoorData(dataList: ProcessedNodeData[]): void {
        this.exteriorDoorDataList = dataList;
    }
}

export const SensorDataStoreContext = createContext(new SensorDataStore());
