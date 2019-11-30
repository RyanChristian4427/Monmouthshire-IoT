import React, {useContext, useEffect} from 'react';
import {observer} from 'mobx-react-lite';

import {Sensor, SensorType} from 'models/Sensor';
import {SensorStoreContext} from 'stores/SensorStore';
import socket from 'util/sockets';

import './SensorConfiguration.scss';

export const SensorConfiguration: React.FC = observer(() => {
    const sensorStore = useContext(SensorStoreContext);

    const updateSensor = (sensor: Sensor): void => {
        socket.emit('sensor_update', sensor);
    };

    useEffect(() => {
        socket.on('sensor_joined_z_wave', (sensor: Sensor) => {
            console.log('sensor received');
            sensorStore.addSensor(sensor);
            console.log(sensor);
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
                               onChange={(e): void => {
                                   sensorStore.setSensorName(e.target.value);
                                   updateSensor(currentSensor);
                               }}
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Please Choose a Sensor Type</label>
                    <div className="control has-text-centered">
                        <div className="select">
                            <select value={currentSensor.type} onChange={(e): void => {
                                sensorStore.setSensorType(Number(e.target.value));
                                updateSensor(currentSensor);
                            }}>
                                <option value={SensorType.none}>N/A</option>
                                <option value={SensorType.kitchen}>Kitchen</option>
                                <option value={SensorType.bedroom}>Bedroom</option>
                                <option value={SensorType.bathroom}>Bathroom</option>
                                <option value={SensorType.livingRoom}>Living Room</option>
                                <option value={SensorType.exteriorDoor}>Front Door</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="level">
                    <div className="level-left"/>
                    <div className="level-right">
                        <button
                            className={'button is-platinum-light level-item ' + (inProgress ? 'is-loading' : '')}
                            onClick={updateSensor}
                        >
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
