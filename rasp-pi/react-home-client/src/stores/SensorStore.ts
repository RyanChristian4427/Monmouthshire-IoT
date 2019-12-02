import {action, observable} from 'mobx';
import {createContext} from 'react';

import {HardwareType, Sensor, SensorType} from 'models/Sensor';
import socket from 'util/sockets';


class SensorStore {
    // Plz don't remove, I do need this if I want to test at all. Just swap the two
    @observable
    SensorList: Array<Sensor> = [
       { nodeId: 0, name: 'Sensor 1', type: SensorType.None, hardware: HardwareType.multiSensor},
       { nodeId: 1, name: 'Sensor 2', type: SensorType.None, hardware: HardwareType.smartSwitch},
       { nodeId: 2, name: 'Sensor 3', type: SensorType.None, hardware: HardwareType.multiSensor},
       { nodeId: 3, name: 'Sensor 4', type: SensorType.None, hardware: HardwareType.multiSensor},
       { nodeId: 4, name: 'Sensor 5', type: SensorType.None, hardware: HardwareType.multiSensor},
       { nodeId: 5, name: 'Sensor 6', type: SensorType.None, hardware: HardwareType.multiSensor},
       { nodeId: 6, name: 'Sensor 7', type: SensorType.None, hardware: HardwareType.multiSensor},
       { nodeId: 7, name: 'Sensor 8', type: SensorType.None, hardware: HardwareType.multiSensor},
    ];

    // @observable
    // SensorList: Array<Sensor> = [];


    @observable
    indexSelectedSensor = -1;

    @action
    setSensorName(newName: string): void {
        this.SensorList[this.indexSelectedSensor].name = newName;
    }

    @action
    setSensorType(newType: SensorType): void {
        this.SensorList[this.indexSelectedSensor].type = newType;
        socket.emit('sensor_update', {nodeId: this.indexSelectedSensor, type: newType, name: this.SensorList[this.indexSelectedSensor].name});
    }

    @action
    addSensor(sensor: Sensor): void {
        this.SensorList.push(sensor);
    }
    
    @action
    addSensors(sensors: Sensor[]): void {
		this.SensorList.push(...sensors);
    }
}

export const SensorStoreContext = createContext(new SensorStore());
