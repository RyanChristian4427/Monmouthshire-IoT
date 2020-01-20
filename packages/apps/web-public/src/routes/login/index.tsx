import preact, { h } from 'preact';
import { useState } from 'preact/hooks';
import { Link, route } from 'preact-router';
import { LogIn } from 'react-feather';

import placeholder from 'assets/placeholder.jpg';
import { login } from 'services/api';

import './style.scss';

const Login: preact.FunctionalComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [inProgress, setInProgress] = useState(false);
    const [errors, setErrors] = useState('');

    const submitDetails = (): void => {
        const credentials = { user: { email, password } };
        setErrors('');
        setInProgress(true);
        login(credentials).then((result) => {
            setInProgress(false);
            if (result) setErrors(result);
            else route('/');
        });
    };

    return (
        <div class="login-page">
            <section class="hero is-fullheight">
                <div class="hero-body">
                    <div class="container has-text-centered">
                        <div class="column is-4 is-offset-4">
                            <h3 class="title">Login</h3>
                            <hr class="login-hr" />
                            <h5 class="subtitle">Please login to proceed.</h5>
                            <div class="box">
                                <figure class="avatar">
                                    <img src={placeholder} alt="he-man" />
                                </figure>
                                <form>
                                    <div class="field">
                                        <div class="control">
                                            <input
                                                class="input is-large"
                                                type="email"
                                                placeholder="Your Email"
                                                value={email}
                                                onChange={(e): void => setEmail((e.target as HTMLInputElement).value)}
                                            />
                                        </div>
                                    </div>
                                    <div class="field">
                                        <div class="control">
                                            <input
                                                class="input is-large"
                                                type="password"
                                                placeholder="Your Password"
                                                value={password}
                                                onChange={(e): void =>
                                                    setPassword((e.target as HTMLInputElement).value)
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div class="field">
                                        <div class="control">
                                            <h2 class={'error is-size-5' + (errors ? '' : 'is-hidden')}>{errors}</h2>
                                        </div>
                                    </div>
                                    <button
                                        class={
                                            'button is-block is-coral-light is-large is-fullwidth' +
                                            (inProgress ? ' is-loading' : '')
                                        }
                                        type="button"
                                        onClick={(): void => submitDetails()}
                                    >
                                        <div class="level">
                                            <div class="level-item">
                                                <span>Submit</span>
                                                <span class="icon is-small">
                                                    <LogIn />
                                                </span>
                                            </div>
                                        </div>
                                    </button>
                                </form>
                            </div>
                            <p class="has-text-grey">
                                <Link href="/register">Sign Up</Link> &nbsp;·&nbsp;
                                <Link href="/forgotten-password">Forgot Password</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;
