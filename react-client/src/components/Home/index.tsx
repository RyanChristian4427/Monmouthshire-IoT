import React from 'react';
import { ChartLabel, RadialChart } from 'react-vis';

import HeroHeader from 'components/HeroHeader';
import './Home.scss';

const myData = [{angle: 2, label: 'Hello World'}, {angle: 2, label: 'Bathroom'}, {angle: 2, label: 'Living Room'},
    {angle: 2, label: 'Bedroom'}, {angle: 2, label: 'Front Door'}];

const Home: React.FC = () => {
    return (
        <div className="home-page">
            <HeroHeader title="Home" withSettingsMenu={true}/>
            <section className="card">
                <div className="container" id="layered-background">
                    <h3>Percent of Day Spent in Room</h3>
                    <RadialChart
                        data={myData}
                        width={300}
                        height={300}
                        showLabels={true}
                        labelsAboveChildren={true}>
                        <ChartLabel text="Hello World!" style={{textAlign: 'center'}} />
                    </RadialChart>
                </div>
            </section>
        </div>
    );
};

export default Home;
