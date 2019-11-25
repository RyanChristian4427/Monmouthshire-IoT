import React from 'react';

import {HeroHeader} from 'components/HeroHeader';
import './Home.scss';

export const Home: React.FC = () => {
    return (
        <div className="home-page">
            <HeroHeader title="Home" withSettingsMenu={true}/>
            <section className="card">
                <div className="container" id="layered-background">
                    <h3>Percent of Day Spent in Room</h3>
                </div>
            </section>
        </div>
    );
};
