import { ComponentChild, Fragment, FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Link } from 'preact-router';

import avatar from 'assets/placeholder.jpg';
import Footer from 'components/Footer';
import Login from 'routes/auth/login';
import Register from 'routes/auth/register';
import { observer } from 'services/mobx';

import './style.scss';

interface IProps {
    subPage?: SubPage;
}

enum SubPage {
    login = 'login',
    register = 'register',
}

const Auth: FunctionalComponent<IProps> = observer((props: IProps) => {
    const [title, setTitle] = useState<string>('');
    const [subtitle, setSubtitle] = useState<string>('');
    const [form, setForm] = useState<ComponentChild>(null);
    const [links, setLinks] = useState<ComponentChild>(null);

    useEffect(() => {
        switch (props.subPage) {
            case SubPage.login:
                setTitle('Login');
                setSubtitle('Please provide your credentials to proceed.');
                setForm(<Login />);
                setLinks(
                    <Fragment>
                        <Link href="/auth/register">Sign Up</Link>&nbsp;·&nbsp;<Link href="/">Forgot Password</Link>
                    </Fragment>,
                );
                break;
            case SubPage.register:
                setTitle('Register');
                setSubtitle('Please provide your details to proceed.');
                setForm(<Register />);
                setLinks(
                    <Fragment>
                        <Link href="/auth/login">Login</Link>&nbsp;·&nbsp;<Link href="/">Forgot Password</Link>
                    </Fragment>,
                );
                break;
        }
    });

    return (
        <div class="auth-page">
            <section class="hero is-fullheight">
                <div class="hero-body">
                    <div class="container has-text-centered">
                        <div class="column is-4 is-offset-4">
                            <h3 class="title">{title}</h3>
                            <hr class="auth-hr" />
                            <h5 class="subtitle">{subtitle}</h5>
                            <div class="box">
                                <figure class="avatar">
                                    <img src={avatar} alt="he-man" />
                                </figure>
                                {form}
                            </div>
                            <p class="has-text-grey">{links}</p>
                        </div>
                    </div>
                </div>
                <Footer />
            </section>
        </div>
    );
});

export default Auth;
