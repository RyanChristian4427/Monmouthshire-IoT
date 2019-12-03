import React from 'react';

import {LineGraph} from 'components/graphs/LineGraph';
import {HeroHeader} from 'components/HeroHeader';

import './Home.scss';


export const Home: React.FC = () => {
    return (
        <div className="home-page">
            <HeroHeader title="Home" withSettingsMenu={true}/>
            <section className="card">
                <div className="container" id="layered-background">
                    <LineGraph title="Temperature Over Time Per Room" xAxisTitle="Time"
                               yAxisTitle="Temperature" height={300} width={300}/>
                </div>
            </section>
        </div>
    );
};
