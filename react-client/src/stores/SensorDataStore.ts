import {observable} from 'mobx';
import {createContext} from 'react';

import {Node} from 'models/Neo4J';

class SensorDataStore {
    @observable kitchenDataList: Node[] = [];
    @observable bedroomDataList: Node[] = [];
    @observable bathroomDataList: Node[] = [];
    @observable livingRoomDataList: Node[] = [];
    @observable exteriorDoorDataList: Node[] = [];
}

export const SensorDataStoreContext = createContext(new SensorDataStore());
