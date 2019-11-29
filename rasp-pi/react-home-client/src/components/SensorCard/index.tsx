import React, {useContext} from 'react';
import {observer} from 'mobx-react-lite';

import {Sensor, SensorType} from 'models/Sensor';
import SensorCardModel from 'models/SensorCardModel';
import {SensorStoreContext} from 'stores/SensorStore';

import './SensorCard.scss';

export const SensorCard: React.FC<SensorCardModel> = observer((props: any) => {
    const sensorStore = useContext(SensorStoreContext);

     return (
        <div className="sensor-card is-clickable" onClick={(): number=> sensorStore.indexSelectedSensor = props.sensorKey}>
            <div className="layer level">
                <div className="level-left">
                    <h5 className="level-item is-size-5">
                        Name: {props.sensor.name}
                    </h5>
                </div>
                <div className="level-right">
                    <h5 className="level-item is-size-5">
                        Room Type: {SensorType[props.sensor.type]}
                    </h5>
                </div>
            </div>
        </div>
    );
});
