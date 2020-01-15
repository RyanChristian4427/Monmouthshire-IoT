import preact, { h } from 'preact';
import { useState } from 'preact/hooks';
import { route } from 'preact-router';

import * as style from './style.scss';

import { login } from 'services/api';

const Login: preact.FunctionalComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [inProgress, setInProgress] = useState(false);
    const [errors, setErrors] = useState('');

    const submitDetails = (): void => {
        const credentials = { user: { email, password } };
        setInProgress(true);
        login(credentials).then((result) => {
            setInProgress(false);
            if (result) setErrors(result);
            else route('/');
        });
    };

    return (
        <div class={style.loginPage}>
            <section class={style.card}>
                <div class="container" id={style.layeredBackground}>
                    <form>
                        <div class="field">
                            <label class="label">Email</label>
                            <div class="control">
                                <input
                                    class="input"
                                    type="text"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e): void => setEmail((e.target as HTMLInputElement).value)}
                                />
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Password</label>
                            <div class="control">
                                <input
                                    class="input"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e): void => setPassword((e.target as HTMLInputElement).value)}
                                />
                            </div>
                        </div>
                        <div class="level">
                            <div class="level-left" />
                            <div class="level-right">
                                <button
                                    class={'button is-whitesmoke-light level-item ' + (inProgress ? 'is-loading' : '')}
                                    type="button"
                                    onClick={(): void => submitDetails()}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                        <h2 class={style.error + ' is-size-5' + (errors ? '' : 'is-hidden')}>{errors}</h2>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Login;
