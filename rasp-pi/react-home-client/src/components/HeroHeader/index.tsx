import React from 'react';
import { Settings } from 'react-feather';

import './HeroHeader.scss';


interface IProps {
    title: string;
    subtitle?: string;
    withSettingsMenu: boolean;
}

export const HeroHeader: React.FC<IProps> = (props: IProps) => {

    const settingsMenu = (props.withSettingsMenu)
        ? <div className="navbar-menu">
            <div className="navbar-end">
                <div className="navbar-item dropdown is-hoverable">
                    <div className="dropdown-trigger">
                        <div className="button is-coral-light" aria-haspopup="true" aria-controls="dropdown-menu">
                            <span>Settings</span>
                            <span className="icon is-small">
                                <Settings/>
                            </span>
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
