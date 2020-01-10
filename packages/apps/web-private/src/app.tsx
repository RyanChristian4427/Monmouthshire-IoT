import preact, { h } from 'preact';
import { Route, Router, RouterOnChangeArgs } from 'preact-router';

import Home from 'routes/home';
import Profile from 'routes/profile';
import Header from 'components/header';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
if ((module as any).hot) {
    // tslint:disable-next-line:no-var-requires
    require('preact/debug');
}

export const App: preact.FunctionalComponent = () => {
    let currentUrl = '';
    const handleRoute = (e: RouterOnChangeArgs): void => {
        currentUrl = e.url;
    };

    // This is just here to stop the linter from yelling about this variable
    // being unused
    console.log(currentUrl);

    return (
        <div id="app">
            <Header />
            <Router onChange={handleRoute}>
                <Route path="/" component={Home} />
                <Route path="/profile/" component={Profile} user="me" />
                <Route path="/profile/:user" component={Profile} />
            </Router>
        </div>
    );
};
