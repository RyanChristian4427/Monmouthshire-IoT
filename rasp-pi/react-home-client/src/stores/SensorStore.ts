import {action, observable} from 'mobx';
import {createContext} from 'react';

import {Sensor, SensorType} from 'models/Sensor';

class SensorStore {
    @observable
    tempSensorList: Array<Sensor> = [
        { id: 0, name: 'Sensor 1'},
        { id: 1, name: 'Sensor 2'},
        { id: 2, name: 'Sensor 3'},
        { id: 3, name: 'Sensor 4'},
        { id: 4, name: 'Sensor 5'},
        { id: 5, name: 'Sensor 6'},
        { id: 6, name: 'Sensor 7'},
        { id: 7, name: 'Sensor 8'},
    ];

    @observable
    indexSelectedSensor = -1;

    @action
    setSensorName(newName: string): void {
        this.tempSensorList[this.indexSelectedSensor].name = newName;
    }

    @action
    setSensorType(newType: number): void {
        this.tempSensorList[this.indexSelectedSensor].type = newType;
    }
}

export const SensorStoreContext = createContext(new SensorStore());
