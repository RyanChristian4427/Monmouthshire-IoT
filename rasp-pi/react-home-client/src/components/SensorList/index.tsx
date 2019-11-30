import React, {useContext, useState} from 'react';
import {observer} from 'mobx-react-lite';

import {SensorCard} from 'components/SensorCard';
import {Sensor} from 'models/Sensor';
import {SensorStoreContext} from 'stores/SensorStore';
import socket from 'util/sockets';

import './SensorList.scss';


export const SensorList: React.FC = observer(() => {
    const sensorStore = useContext(SensorStoreContext);
    const [isLoading, setIsLoading] = useState(false);

    // Probably will remove if I can't figure out a good way of implementing
    socket.on('initial_loading_finished', () => {
        setIsLoading(false);
    });

	const sensors = sensorStore.SensorList.map((sensor, index) => {
			return (
				<SensorCard	key={index}	sensor={sensor} sensorKey={index}/>
			);
	});

    if (isLoading) {
        return (
            <div className='has-text-centered is-loading' id="layered-background">
                <section className="sensor-list">
                    <h3 className="is-size-3">Please connect a sensor to begin</h3>
                </section>
            </div>
        );
    } else {
        return (
            <div className='has-text-centered' id="layered-background">
                <section className="sensor-list">
                    <h3 className="is-size-3">Currently Connected Sensors</h3>
                    <div className="container">
                        {sensors}
                    </div>
                </section>
            </div>
        );
    }
});
