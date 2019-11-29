import React, {useEffect} from 'react';
import toaster from 'toasted-notes';
import 'toasted-notes/src/styles.css';

import {HeroHeader} from 'components/HeroHeader';
import {SensorConfiguration} from 'components/SensorConfiguration';
import {SensorList} from 'components/SensorList';
import socket from '../sockets';

import './App.scss';
import {Sensor} from '../models/Sensor';


const App: React.FC = () => {
    useEffect(() => {
        socket.on('sensor_shake', (sensor: Sensor) => {
            const notification = `Sensor ${sensor.nodeId} has been shaken (${sensor.hardware}) `;
            toaster.notify(notification, {
                duration: 5000
            });
        });
    }, []);

    return (
        <div className="home-page">
            <HeroHeader title="Home"/>
            <section className="section">
                <div className="columns is-variable is-2">
                    <section className="card column">
                        <SensorList/>
                    </section>
                    <section className="card column">
                        <div className='container has-text-centered' id="layered-background">
                            <h3 className="is-size-4">Please Select a Sensor to Begin</h3>
                            <SensorConfiguration/>
                        </div>
                    </section>
                </div>
            </section>
        </div>
    );
};

export default App;
