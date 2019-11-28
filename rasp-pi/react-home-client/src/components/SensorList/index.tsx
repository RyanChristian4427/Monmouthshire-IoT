import React, {useContext, useState} from 'react';

import {Sensor, SensorType} from 'models/Sensor';
import socket from 'models/Socket';
import {SensorCard} from 'components/SensorCard';

import './SensorList.scss';
import {observer} from 'mobx-react-lite';
import {SensorStoreContext} from 'stores/SensorStore';


export const SensorList: React.FC = observer(() => {
    const sensorStore = useContext(SensorStoreContext);
    const [isLoading, setIsLoading] = useState(false);

    socket.on('initial_loading_finished', () => {
        setIsLoading(false);
    });

    const sensors = sensorStore.tempSensorList.map((sensor, index) => {
        return (
            <SensorCard key={`Sensor ${index}`} id={sensor.id} name={sensor.name} type={sensor.type}/>
        );
    });

    if (isLoading) {
        return (
            <div className='container has-text-centered is-loading' id="layered-background">
                <section className="sensor-list">
                    <h3 className="is-size-4">Please connect a sensor to begin</h3>
                </section>
            </div>
        );
    } else {
        return (
            <div className='container has-text-centered' id="layered-background">
                <section className="sensor-list">
                    <h3 className="is-size-4">Currently Connected Sensors</h3>
                    <div className="container">
                        {sensors}
                    </div>
                </section>
            </div>
        );
    }
});
