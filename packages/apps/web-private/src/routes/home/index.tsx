import preact, { h } from 'preact';
import { useState } from 'preact/hooks';
import { Link } from 'preact-router';

import placeholder from 'assets/placeholder.jpg';
import Footer from 'components/Footer';
import SensorCard from 'components/SensorCard';
import { HardwareType, Sensor, RoomType } from 'models/Sensor';

import './style.scss';

const SensorList: Array<Sensor> = [
    { nodeId: 0, name: 'Sensor 1', roomType: RoomType.None, hardwareType: HardwareType.multiSensor },
    { nodeId: 1, name: 'Sensor 2', roomType: RoomType.None, hardwareType: HardwareType.smartSwitch },
    { nodeId: 2, name: 'Sensor 3', roomType: RoomType.None, hardwareType: HardwareType.multiSensor },
    { nodeId: 3, name: 'Sensor 4', roomType: RoomType.None, hardwareType: HardwareType.multiSensor },
    { nodeId: 4, name: 'Sensor 5', roomType: RoomType.None, hardwareType: HardwareType.multiSensor },
    { nodeId: 5, name: 'Sensor 6', roomType: RoomType.None, hardwareType: HardwareType.multiSensor },
    { nodeId: 6, name: 'Sensor 7', roomType: RoomType.None, hardwareType: HardwareType.smartSwitch },
    { nodeId: 7, name: 'Sensor 8', roomType: RoomType.None, hardwareType: HardwareType.smartSwitch },
];

const Home: preact.FunctionalComponent = () => {
    const [activeSensor, setActiveSensor] = useState(-1);
    const [burgerClicked, setBurgerClicked] = useState(false);

    const sensorOnClick = (index: number): void => {
        setActiveSensor(index);
    };

    const sensors = SensorList.map((sensor, index) => {
        return (
            <SensorCard
                key={index}
                sensor={sensor}
                sensorKey={index}
                active={activeSensor == index}
                onClick={sensorOnClick}
            />
        );
    });

    return (
        <section class="home-page hero is-fullheight is-default is-bold">
            <div class="hero-head">
                <nav class="navbar">
                    <div class="container">
                        <div class="navbar-brand">
                            <a class="navbar-item" href="/">
                                <img src={placeholder} alt="He-Man" />
                            </a>
                            <span
                                class={'navbar-burger burger ' + (burgerClicked ? 'is-active' : '')}
                                onClick={(): void => setBurgerClicked(!burgerClicked)}
                            >
                                <span />
                                <span />
                                <span />
                            </span>
                        </div>
                        <div class={'navbar-menu ' + (burgerClicked ? 'is-active' : '')}>
                            <div class="navbar-end">
                                <div class="tabs is-right">
                                    <ul>
                                        <li class="is-active">
                                            <a>Home</a>
                                        </li>
                                        <li>
                                            <Link href="/login">Log Out</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <div class="hero-body">
                <div class="columns">
                    <div class="column is-5 sensors">{sensors}</div>
                    <div class="column is-7 sensor-config">Config Goes Here</div>
                </div>
            </div>
            <Footer />
        </section>
    );
};

export default Home;
