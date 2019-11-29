import React, {useContext} from 'react';
import {observer} from 'mobx-react-lite';

import {Sensor} from 'models/Sensor';
import {SensorStoreContext} from 'stores/SensorStore';

import './SensorCard.scss';


export const SensorCard: React.FC<Sensor> = observer((props: Sensor) => {
    const sensorStore = useContext(SensorStoreContext);

    return (
        <div className="sensor-card level is-clickable" onClick={(): number => sensorStore.indexSelectedSensor = props.id}>
            <div className="level-left">
                <h4 className="level-item is-size-4">
                    {props.name}
                </h4>
            </div>
            <div className="level-right"/>
        </div>
    );
});
