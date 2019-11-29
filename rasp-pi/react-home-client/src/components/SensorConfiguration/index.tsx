import React, {useContext} from 'react';
import {observer} from 'mobx-react-lite';

import {SensorType} from 'models/Sensor';
import {SensorStoreContext} from 'stores/SensorStore';

import './SensorConfiguration.scss';


export const SensorConfiguration: React.FC = observer(() => {
    const sensorStore = useContext(SensorStoreContext);

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
                            <select value={currentSensor.type} onChange={(e): void => sensorStore.setSensorType(Number(e.target.value))}>
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
            </React.Fragment>
        );
    } else {
        return (<h1>Select a Sensor to begin</h1>);
    }

});
