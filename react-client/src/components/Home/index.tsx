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
                    <LineGraph title="Example Title" xAxisTitle="Time" yAxisTitle="Temperature" height={500} width={500}/>
                </div>
            </section>
        </div>
    );
};
