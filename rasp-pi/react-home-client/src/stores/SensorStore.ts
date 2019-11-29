import {action, observable} from 'mobx';
import {createContext} from 'react';

import {Sensor, SensorType} from 'models/Sensor';
import socket from 'sockets';


class SensorStore {
    @observable
    tempSensorList: Array<Sensor> = [
        { nodeId: 0, name: 'Sensor 1', type: SensorType.none, hardware: 'Multi'},
        { nodeId: 1, name: 'Sensor 2', type: SensorType.kitchen, hardware: 'Smart Switch'},
        { nodeId: 2, name: 'Sensor 3', type: SensorType.none, hardware: 'Multi'},
        { nodeId: 3, name: 'Sensor 4', type: SensorType.none, hardware: 'Multi'},
        { nodeId: 4, name: 'Sensor 5', type: SensorType.none, hardware: 'Multi'},
        { nodeId: 5, name: 'Sensor 6', type: SensorType.none, hardware: 'Multi'},
        { nodeId: 6, name: 'Sensor 7', type: SensorType.none, hardware: 'Multi'},
        { nodeId: 7, name: 'Sensor 8', type: SensorType.none, hardware: 'Multi'},
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

    @action
    addSensor(sensor: Sensor): void {
        this.tempSensorList.push(sensor);
    }
}

export const SensorStoreContext = createContext(new SensorStore());
