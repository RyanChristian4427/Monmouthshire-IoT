import React, {useContext, useState, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import socket from '../../Socket';
import Sensor from '../../types/sensor';
import {SensorType} from 'models/Sensor';
import {SensorStoreContext} from 'stores/SensorStore';


import './SensorConfiguration.scss';


export const SensorConfiguration: React.FC = observer(() => {
    const sensorStore = useContext(SensorStoreContext);

    const [inProgress, setInProgress] = useState(false);

    const [sensors, setSensors] = useState();
    const updateSensorLocation = (): void => {
         const nodeId = 3;
         const location = 'Living Room';
         console.log('about to update sensor');
         socket.emit('sensor_update', {nodeId, location});
     };
    
     useEffect(() => {
         socket.on('sensor_joined_z_wave', (sensor: Sensor) => {
             console.log('sensor received');
             //setSensors(sensors.push(sensor));
             console.log(sensor);
         });
     }, []);

    if (sensorStore.indexSelectedSensor > -1) {
        const currentSensor = sensorStore.tempSensorList[sensorStore.indexSelectedSensor];
        return (
            <React.Fragment>
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
                            <select onChange={(e): void => sensorStore.setSensorType(Number(e.target.value))}>
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
                        <button className={'button is-platinum-light level-item ' + (inProgress ? 'is-loading' : '') }>
                            Submit
                        </button>
                    </div>
                </div>
                <h5 className="is-size-5">Temp and just for testing purposes:</h5>
                <h5 className="is-size-5">
                    Index: {sensorStore.indexSelectedSensor +
                    ' Sensor Name:' + currentSensor.name +
                    ' Sensor Type:' + currentSensor.type}
                </h5>
            </React.Fragment>
        );
    } else {
        return (<h1>Select a Sensor to begin</h1>);
    }

});
