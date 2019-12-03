import React, {useContext, useEffect} from 'react';
import {observer} from 'mobx-react-lite';

import {Sensor, SensorType} from 'models/Sensor';
import {SensorStoreContext} from 'stores/SensorStore';
import socket from 'util/sockets';

import './SensorConfiguration.scss';


export const SensorConfiguration: React.FC = observer(() => {
    const sensorStore = useContext(SensorStoreContext);

    const updateSensor = (): void => {
        const currentSensor = sensorStore.SensorList[sensorStore.indexSelectedSensor];
        socket.emit('sensor_update', currentSensor);
    };

    useEffect(() => {
		socket.emit('looking_for_sensors');
        socket.on('sensor_joined_z_wave', (sensor: Sensor) => {
            sensorStore.addSensor(sensor);
        });
        socket.on('all_connected_sensors', (sensors: Sensor[]) => {
            sensorStore.addSensors(sensors);
        });
    }, [sensorStore]);

    if (sensorStore.indexSelectedSensor >= 0) {
        const currentSensor = sensorStore.SensorList[sensorStore.indexSelectedSensor];
        return (
            <div className="sensor-configuration">
                <h3 className="is-size-3">Sensor Configuration</h3>
                <div className="field">
                    <label className="label">Sensor Label</label>
                    <div className="control">
                        <input className="input"
                               type="text"
                               placeholder="Master Bedroom"
                               value={currentSensor.name}
                               onChange={(e): void => sensorStore.setSensorName(e.target.value)}
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Please Choose a Sensor Type</label>
                    <div className="control has-text-centered">
                        <div className="select">
                            <select value={currentSensor.type} onChange={(e): void =>
                                sensorStore.setSensorType(Number(e.target.value))
                            }>
                                <option value={SensorType.None}>N/A</option>
                                <option value={SensorType.Kitchen}>Kitchen</option>
                                <option value={SensorType.Bedroom}>Bedroom</option>
                                <option value={SensorType.Bathroom}>Bathroom</option>
                                <option value={SensorType.LivingRoom}>Living Room</option>
                                <option value={SensorType.ExteriorDoor}>Front Door</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/* Ryun wants you to know that he doesn't like this button but I was sad 
					without it so like an absolute hero he let me keep it */} 
                <div className="level">
                    <div className="level-left"/>
                    <div className="level-right">
                        <button className={'button is-platinum-light level-item'} onClick={updateSensor}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <h3 className="is-size-3">Please Select a Sensor to Begin</h3>
        );
    }

});
