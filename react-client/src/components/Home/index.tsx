import React from 'react';

import {LineGraph} from 'components/graphs/LineGraph';
import {HeroHeader} from 'components/HeroHeader';

import './Home.scss';
import {PieChart} from 'components/graphs/PieChart';


export const Home: React.FC = () => {
    return (
        <div className="home-page">
            <HeroHeader title="Home" withSettingsMenu={true}/>
            <section className="section card">
                <div className="container" id="layered-background">
                    <section className="section chart-card">
                        <LineGraph title="Temperature Over Time Per Room" xAxisTitle="Time"
                                   yAxisTitle="Temperature" height={600} width={600}/>
                    </section>
                    <section className="section chart-card">
                        <PieChart title="Percent of Time Spent in Room" height={600} width={600}/>
                    </section>
                </div>
            </section>
        </div>
    );
};
