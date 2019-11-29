import {action, observable} from 'mobx';
import {createContext} from 'react';

import {Sensor, SensorType} from 'models/Sensor';
import socket from 'sockets';


class SensorStore {
    @observable
    tempSensorList: Array<Sensor> = [];

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

    @action
    addSensor(sensor: Sensor): void {
        this.tempSensorList.push(sensor);
    }
}

export const SensorStoreContext = createContext(new SensorStore());
