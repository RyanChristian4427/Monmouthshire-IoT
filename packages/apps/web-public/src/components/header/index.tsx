import preact, { h } from 'preact';
import { Settings } from 'react-feather';
import { jwtService } from 'ts-api-toolkit';

import * as style from './style.scss';

interface IProps {
    title: string;
    subtitle?: string;
    withSettingsMenu: boolean;
}

const Header: preact.FunctionalComponent<IProps> = (props: IProps) => {
    function handleClick(): void {
        jwtService.destroyToken();
        // history.push('/login');
    }

    const settingsMenu = props.withSettingsMenu ? (
        <div class="navbar-menu">
            <div class="navbar-end">
                <div class="navbar-item dropdown is-hoverable">
                    <div class="dropdown-trigger">
                        <div class="button is-whitesmoke-dark" aria-haspopup="true" aria-controls="dropdown-menu">
                            <p>Settings</p>
                            <p class="icon is-small">
                                <Settings />
                            </p>
                        </div>
                    </div>
                    <div class="dropdown-menu" role="menu">
                        <div class="dropdown-content">
                            <div class="dropdown-item">
                                {/* eslint-disable-next-line */}
                                <a class="dropdown-item" href="#" onClick={handleClick}>
                                    Logout
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : null;

    return (
        <section class={style.hero + ' hero is-coral-light is-bold'}>
            <div class="hero-head">
                <nav class="navbar">
                    <div class="container">
                        <div class="navbar-brand">
                            <a class="navbar-item" href="/">
                                {/* TODO Add a logo */}
                            </a>
                            <span class="navbar-burger burger" data-target="navbarMenuHeroB">
                                <span />
                                <span />
                                <span />
                            </span>
                        </div>
                        {settingsMenu}
                    </div>
                </nav>
            </div>
            {/* TODO fix issue where subtitle expands hero */}
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">{props.title}</h1>
                    <h2 class="subtitle">{props.subtitle}</h2>
                </div>
            </div>
        </section>
    );
};

export default Header;
