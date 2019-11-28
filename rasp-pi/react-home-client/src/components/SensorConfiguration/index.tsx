import React, {useState} from 'react';

import './SensorConfiguration.scss';

enum SensorType {
    kitchen,
    bedroom,
    bathroom,
    livingRoom,
    frontDoor
}

export const SensorConfiguration: React.FC = () => {
    const [inProgress, setInProgress] = useState(false);
    const [sensorType, setSensorType] = useState();

    console.log(sensorType);

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
                            <option value={SensorType.frontDoor}>Front Door</option>
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
        </React.Fragment>
    );
};
