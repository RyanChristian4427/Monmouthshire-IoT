import preact, { h } from 'preact';
import { useState } from 'preact/hooks';

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
        <div class="home-page">
            <nav class="navbar has-shadow">
                <div class="container">
                    <div class="navbar-brand">
                        <a class="navbar-item" href="../">
                            <img
                                src="http://bulma.io/images/bulma-logo.png"
                                alt="Bulma: a modern CSS framework based on Flexbox"
                            />
                        </a>

                        <div class="navbar-burger burger" data-target="navMenu">
                            <span />
                            <span />
                            <span />
                        </div>
                    </div>
                    <div class="navbar-end">
                        <div class="navbar-item has-dropdown is-hoverable">
                            <a class="navbar-link">Account</a>
                            <div class="navbar-dropdown">
                                <a class="navbar-item">Logout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div class="columns" id="mail-app">
                <div class="column is-5 sensors hero is-fullheight">
                    <div class="sensor-list">{sensors}</div>
                </div>
                <div class="column is-7 message hero is-fullheight is-hidden">
                    <div class="box message-preview">
                        <div class="top">
                            <div class="content" />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
