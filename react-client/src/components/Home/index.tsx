import React from 'react';

import HeroHeader from 'components/HeroHeader';
import './Home.scss';


const Home: React.FC = () => {
    return (
        <div className="home-page">
            <HeroHeader title="Home" subtitle=" " withSettingsMenu={true}/>
            <section className="card">
                <div className="level" id="layered-background">

                </div>
            </section>
        </div>
    );
};

export default Home;
