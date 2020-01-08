import React from 'react';
import { useHistory } from 'react-router-dom';
import { Settings } from 'react-feather';
import {jwtService} from 'ts-api-toolkit';

import './HeroHeader.scss';


interface IProps {
    title: string;
    subtitle?: string;
    withSettingsMenu: boolean;
}

export const HeroHeader: React.FC<IProps> = (props: IProps) => {
    const history = useHistory();

    function handleClick(): void {
        jwtService.destroyToken();
        history.push('/login');
    }

    const settingsMenu = (props.withSettingsMenu)
        ? <div className="navbar-menu">
            <div className="navbar-end">
                <div className="navbar-item dropdown is-hoverable">
                    <div className="dropdown-trigger">
                        <div className="button is-whitesmoke-dark" aria-haspopup="true" aria-controls="dropdown-menu">
                            <p>Settings</p>
                            <p className="icon is-small">
                                <Settings/>
                            </p>
                        </div>
                    </div>
                    <div className="dropdown-menu" role="menu">
                        <div className="dropdown-content">
                            <div className="dropdown-item">
                                {/* eslint-disable-next-line */}
                                <a className="dropdown-item" href="#" onClick={handleClick}>
                                    Logout
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        : null;

    return (
        <section className="hero is-coral-light is-bold">
            <div className="hero-head">
                <nav className="navbar">
                    <div className="container">
                        <div className="navbar-brand">
                            <a className="navbar-item" href="/">
                                {/* TODO Add a logo */}
                            </a>
                            <span className="navbar-burger burger" data-target="navbarMenuHeroB">
                                <span/>
                                <span/>
                                <span/>
                            </span>
                        </div>
                        {settingsMenu}
                    </div>
                </nav>
            </div>
            {/* TODO fix issue where subtitle expands hero */}
            <div className="hero-body">
                <div className="container">
                    <h1 className="title">
                        {props.title}
                    </h1>
                    <h2 className="subtitle">{props.subtitle}</h2>
                </div>
            </div>
        </section>
    );
};
