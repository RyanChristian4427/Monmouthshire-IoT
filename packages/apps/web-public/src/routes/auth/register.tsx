import { FunctionalComponent, h } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import { route } from 'preact-router';
import { LogIn } from 'preact-feather';

import { RegistrationUser } from 'models/User';
import { observer } from 'services/mobx';
import { AuthStoreContext } from 'stores';

const Register: FunctionalComponent = observer(() => {
    const authStore = useContext(AuthStoreContext);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState('');
    const [inProgress, setInProgress] = useState(false);

    useEffect(() => {
        authStore.logout().then();
    }, [authStore]);

    const submitDetails = (): void => {
        setInProgress(true);
        const credentials: RegistrationUser = { user: { firstName, lastName, email, password } };
        authStore.register(credentials).then((errors) => {
            setInProgress(false);
            if (errors) setErrors(errors);
            else if (authStore.isAuthenticated) route('/');
        });
    };

    return (
        <form>
            <div class="field">
                <div class="control">
                    <input
                        class="input is-large"
                        type="text"
                        placeholder="Your First Name"
                        value={firstName}
                        onInput={(e): void => setFirstName((e.target as HTMLInputElement).value)}
                    />
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <input
                        class="input is-large"
                        type="text"
                        placeholder="Your Last Name"
                        value={lastName}
                        onInput={(e): void => setLastName((e.target as HTMLInputElement).value)}
                    />
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <input
                        class="input is-large"
                        type="email"
                        placeholder="Your Email"
                        value={email}
                        onInput={(e): void => {
                            setErrors('');
                            setEmail((e.target as HTMLInputElement).value);
                        }}
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
                        onInput={(e): void => {
                            setErrors('');
                            setPassword((e.target as HTMLInputElement).value);
                        }}
                    />
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <h2 class="error is-size-5">{errors}</h2>
                </div>
            </div>
            <button
                class={`button is-block is-monmouthshire-green is-large is-fullwidth${inProgress ? ' is-loading' : ''}`}
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
    );
});

export default Register;
