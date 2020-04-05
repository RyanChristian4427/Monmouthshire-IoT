import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';
import { Link } from 'preact-router';

import logo from 'assets/logo.png';

export const Navbar: FunctionalComponent = () => {
    const [burgerClicked, setBurgerClicked] = useState(false);

    return (
        <div class="hero-head is-monmouthshire-green">
            <nav class="navbar navbar-component">
                <div class="container">
                    <div class="navbar-brand">
                        <a class="navbar-item" href="/">
                            <img src={logo} alt="Monmouthshire County Council" />
                        </a>
                        <span
                            class={`navbar-burger burger${burgerClicked ? ' is-active' : ''}`}
                            onClick={(): void => setBurgerClicked(!burgerClicked)}
                        >
                            <span />
                            <span />
                            <span />
                        </span>
                    </div>
                    <div class={`navbar-menu${burgerClicked ? ' is-active' : ''}`}>
                        <div class="navbar-end">
                            <div class="tabs is-right">
                                <ul>
                                    <li class="is-active has-text-white">
                                        <Link href="/">Home</Link>
                                    </li>
                                    <li class="has-text-white">
                                        <Link href="/auth/login">Log Out</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};
