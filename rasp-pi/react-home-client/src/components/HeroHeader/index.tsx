import React from 'react';

import './HeroHeader.scss';


interface IProps {
    title: string;
    subtitle?: string;
    withSettingsMenu: boolean;
}

export const HeroHeader: React.FC<IProps> = (props: IProps) => {
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
