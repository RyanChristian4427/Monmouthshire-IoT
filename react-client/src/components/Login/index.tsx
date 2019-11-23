import React, {useState} from 'react';
import {observer, useLocalStore} from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';
import {apiService} from 'ts-api-toolkit';

import {HeroHeader} from 'components/HeroHeader';
import {LoginUser, NewLoginUser} from 'models/User';
import './Login.scss';


export const Login: React.FC = observer(() => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const store = useLocalStore(() => ({
        credentials: NewLoginUser,
        inProgress: false,
        errors: '',

        setUser(email: string, password: string): void {
            this.credentials = { email, password };
            this.login(this.credentials)
                .then(() => history.push('/'));
        },

        async login(credentials: LoginUser): Promise<any> {
            return await new Promise((resolve, reject) => {
                this.inProgress = true;
                apiService.post('users/login', credentials)
                    .then(({ data }) => {
                        resolve(data.user);
                    })
                    .catch(({ response }) => {
                        if (response !== undefined) {
                            reject(response.data);
                        } else {
                            reject('Unknown Error');
                        }
                    });
            });
        }
    }));

    const submitButton = (store.inProgress)
        ? <button className="button is-platinum-light level-item is-loading">Submit</button>
        : <button className="button is-platinum-light level-item" onClick={(): void => store.setUser(email, password)}>Submit</button>;

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
                        {/*Removing the following line breaks the the layout*/}
                        <div className="level-left"/>
                        <div className="level-right">
                            {submitButton}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
});
