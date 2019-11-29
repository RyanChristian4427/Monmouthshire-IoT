import {action, observable} from 'mobx';
import {createContext} from 'react';

import {Sensor, SensorType} from 'models/Sensor';
import socket from 'models/Socket';


class SensorStore {
    @observable
    tempSensorList: Array<Sensor> = [
        { id: 0, name: 'Sensor 1', type: SensorType.none },
        { id: 1, name: 'Sensor 2', type: SensorType.none },
        { id: 2, name: 'Sensor 3', type: SensorType.none },
        { id: 3, name: 'Sensor 4', type: SensorType.none },
        { id: 4, name: 'Sensor 5', type: SensorType.none },
        { id: 5, name: 'Sensor 6', type: SensorType.none },
        { id: 6, name: 'Sensor 7', type: SensorType.none },
        { id: 7, name: 'Sensor 8', type: SensorType.none },
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
        socket.emit('sensor_update', {nodeId: this.indexSelectedSensor, sensorType: newType});
    }
}

export const SensorStoreContext = createContext(new SensorStore());
