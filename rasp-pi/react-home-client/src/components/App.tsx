import React from 'react';

import {HeroHeader} from 'components/HeroHeader';
import {SensorConfiguration} from 'components/SensorConfiguration';
import {SensorList} from 'components/SensorList';

import './App.scss';


const App: React.FC = () => {
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
