import React from 'react';

import HeroHeader from 'components/HeroHeader';
import './Login.scss';

const Login: React.FC = () => {
    return (
        <div className="login-page">
            <HeroHeader title="Login" withSettingsMenu={false}/>
            <section className="card">
                <div className="container" id="layered-background">
                    <div className="field">
                        <label className="label">Email Address</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="Email Address"/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input className="input" type="password" placeholder="Password"/>
                        </div>
                    </div>
                    <div className="level">
                        {/*Removing the following line breaks the the layout*/}
                        <div className="level-left"/>
                        <div className="level-right">
                            <button className="button is-platinum-light level-item">Submit</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;
