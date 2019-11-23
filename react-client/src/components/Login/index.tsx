import React, {useState} from 'react';
import {observer, useLocalStore} from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';
import {apiService, jwtService} from 'ts-api-toolkit';

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
            this.credentials = { user: { email, password }};
            this.login(this.credentials)
                .then(() => history.push('/'));
        },

        async login(credentials: LoginUser): Promise<LoginUser | string> {
            return await new Promise((resolve, reject) => {
                this.inProgress = true;
                apiService.post('users/login', credentials)
                    .then(({ data }) => {
                        this.inProgress = false;
                        jwtService.saveToken(data.token);
                        resolve(data);
                    })
                    .catch(({ response }) => {
                        this.inProgress = false;
                        if (response !== undefined) {
                            this.errors = response.data.message;
                            reject(response.data.message);
                        } else {
                            this.errors = 'Unknown Error';
                            reject('Unknown Error');
                        }
                    });
            });
        }
    }));

    const submitButton = (store.inProgress)
        ? <button className="button is-platinum-light level-item is-loading">Submit</button>
        : <button className="button is-platinum-light level-item" onClick={(): void => store.setUser(email, password)}>Submit</button>;

    const errorMessage = (store.errors != '')
        ? <h2 className="error is-size-5">{store.errors}</h2>
        : null;

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
                    {errorMessage}
                </div>
            </section>
        </div>
    );
});
