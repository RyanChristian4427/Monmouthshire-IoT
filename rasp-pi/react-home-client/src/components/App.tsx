import React, {useState} from 'react';

import {HeroHeader} from 'components/HeroHeader';
import './App.scss';
import socket from 'models/Socket';

const App: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);

    socket.on('initial_loading_finished', () => {
        setIsLoading(false);
    });

    const display = (isLoading)
        ? <h3>Loading, please wait...</h3>
        : <h3>Please connect a sensor to begin</h3>;

    return (
        <div className="home-page">
            <HeroHeader title="Home"/>
            <section className="card">
                <div className={'container has-text-centered ' + (isLoading ? 'is-loading' : '')} id="layered-background">
                    {display}
                </div>
            </section>
        </div>
    );
};

export default App;
