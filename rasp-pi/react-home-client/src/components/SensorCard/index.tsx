import React, {useContext} from 'react';
import {observer} from 'mobx-react-lite';

import {Sensor, SensorType} from 'models/Sensor';
import {SensorStoreContext} from 'stores/SensorStore';

import './SensorCard.scss';

export const SensorCard: React.FC<Sensor> = observer((props: Sensor) => {
    const sensorStore = useContext(SensorStoreContext);

    return (
        <div className="sensor-card is-clickable" onClick={(): number => sensorStore.indexSelectedSensor = props.nodeId}>
            <div className="layer level">
                <div className="level-left">
                    <h5 className="level-item is-size-5">
                        Name: {props.name}
                    </h5>
                </div>
                <div className="level-right">
                    <h5 className="level-item is-size-5">
                        Room Type: {SensorType[props.type]}
                    </h5>
                </div>
            </div>
        </div>
    );
});
