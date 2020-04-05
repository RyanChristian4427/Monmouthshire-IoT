import { FunctionalComponent, h } from 'preact';

import { Sensor } from 'models/Sensor';

import './style.scss';

interface IProps {
    sensorKey: number;
    sensor: Sensor;
    active: boolean;
    onClick: (index: number) => void;
}

const SensorCard: FunctionalComponent<IProps> = (props: IProps) => {
    const handleOnClick = (): void => {
        props.onClick(props.sensorKey);
    };

    return (
        <div class={`card is-clickable ${props.active ? 'active' : ''}`} onClick={handleOnClick}>
            <div class="card-content">
                <div class="card-details">
                    <span class="sensor-type">
                        <small>Sensor Type: {props.sensor.hardwareType}</small>
                    </span>
                    <span class="room-type">
                        <small>Room Type: {props.sensor.roomType}</small>
                    </span>
                </div>
                <div class="sensor-name">
                    <span class="sensor-name">
                        <strong>{props.sensor.name}</strong>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SensorCard;
