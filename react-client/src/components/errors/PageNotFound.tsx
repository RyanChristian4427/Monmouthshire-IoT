import React from 'react';
import {Link} from 'react-router-dom';

import './Errors.scss';

const App: React.FC = () => {
    return (
        <div className="error-page">
            <section className="hero is-coral-light is-bold">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">
                            Sorry
                        </h1>
                        <h2 className="subtitle">
                            This page does not yet exist
                        </h2>
                    </div>
                </div>
            </section>
            <section className="card">
                <div className="level" id="layered-background">
                    <Link className="button is-platinum level-item" to="/">Back to Safety</Link>
                </div>
            </section>
        </div>
    );
};

export default App;
