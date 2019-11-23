import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import {apiService, jwtService} from 'ts-api-toolkit';

import {HeroHeader} from 'components/HeroHeader';
import {LoginUser} from 'models/User';
import './Login.scss';


export const Login: React.FC = (() => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [inProgress, setInProgress] = useState(false);
    const [errors, setErrors] = useState('');
    const history = useHistory();

    const login = (credentials: LoginUser): Promise<string> => {
        return new Promise((resolve, reject) => {
            setInProgress(true);
            apiService.post('users/login', credentials)
                .then(({ data }) => {
                    setInProgress(false);
                    jwtService.saveToken(data.token);
                    resolve(data);
                })
                .catch(({ response }) => {
                    setInProgress(false);
                    if (response !== undefined) {
                        setErrors(response.data.message);
                        reject(response.data.message);
                    } else {
                        setErrors('Unknown Error');
                        reject('Unknown Error');
                    }
                });
        });
    };

    const setUser = (): void => {
        const credentials = { user: { email, password }};
        login(credentials)
            .then(() => history.push('/'));
    };

    return (
        <div className="login-page">
            <HeroHeader title="Login" withSettingsMenu={false}/>
            <section className="card">
                <div className="container" id="layered-background">
                    <div className="field">
                        <label className="label">Email Address</label>
                        <div className="control">
                            <input className="input"
                                   type="text"
                                   placeholder="Email Address"
                                   value={email}
                                   onChange={(e): void => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input className="input"
                                   type="password"
                                   placeholder="Password"
                                   value={password}
                                   onChange={(e): void => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="level">
                        <div className="level-left"/>
                        <div className="level-right">
                            <button className={'button is-platinum-light level-item ' + (inProgress ? 'is-loading' : '') }
                                    onClick={(): void => setUser()}>Submit</button>
                        </div>
                    </div>
                    <h2 className={'error is-size-5' + (errors ? '' : 'is-hidden')}>{errors}</h2>
                </div>
            </section>
        </div>
    );
});
