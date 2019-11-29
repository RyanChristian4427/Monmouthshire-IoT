import React, {useContext, useState} from 'react';
import {observer} from 'mobx-react-lite';

import {SensorType} from 'models/Sensor';
import {SensorStoreContext} from 'stores/SensorStore';

import './SensorConfiguration.scss';


export const SensorConfiguration: React.FC = observer(() => {
    const sensorStore = useContext(SensorStoreContext);

    const [inProgress, setInProgress] = useState(false);
    const [sensorType, setSensorType] = useState();

    // TODO integrate in
    // const [sensors, setSensors] = useState();
    // const updateSensorLocation = (): void => {
    //     const nodeId = 3;
    //     const location = 'Living Room';
    //     console.log('about to update sensor');
    //     socket.emit('sensor_update', {nodeId, location});
    // };
    //
    // useEffect(() => {
    //     socket.on('sensor_joined_z_wave', (sensor: Sensor) => {
    //         // Increase count for frog sighting
    //         console.log('sensor received');
    //         //setSensors(sensors.push(sensor));
    //         console.log(sensor);
    //     });
    // }, []);

    if (sensorStore.indexSelectedSensor > -1) {
        return (
            <React.Fragment>
                <div className="field">
                    <label className="label">Please Choose a Sensor Type</label>
                    <div className="control has-text-centered">
                        <div className="select">
                            <select value={sensorType} onChange={(e): void => setSensorType(e.target.value)}>
                                <option value={SensorType.kitchen}>Kitchen</option>
                                <option value={SensorType.bedroom}>Bedroom</option>
                                <option value={SensorType.bathroom}>Bathroom</option>
                                <option value={SensorType.livingRoom}>Living Room</option>
                                <option value={SensorType.exteriorDoor}>Front Door</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Sensor Label</label>
                    <div className="control">
                        <input className="input"
                               type="text"
                               placeholder="Master Bedroom"
                               value={sensorStore.tempSensorList[sensorStore.indexSelectedSensor].name}
                               onChange={(e): void => sensorStore.setSensorName(e.target.value)}
                        />
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
                <h4 className="is-size-4">
                    Temp and just for testing purposes:
                    <h5 className="is-size-5">Index: {sensorStore.indexSelectedSensor + ' Sensor Name:' + sensorStore.tempSensorList[sensorStore.indexSelectedSensor].name}</h5>
                </h4>
            </React.Fragment>
        );
    } else {
        return (<h1>Select a Sensor to begin</h1>)
    }

});
