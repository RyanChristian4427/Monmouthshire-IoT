import preact, { h } from 'preact';
import { Route, Router, RouterOnChangeArgs } from 'preact-router';

import Home from 'routes/home';
import Login from 'routes/login';
import Profile from 'routes/profile';

if ((module as any).hot) {
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
        <div id='app'>
            <Router onChange={handleRoute}>
                <Route path='/' component={Home} />
                <Route path='/login' component={Login} />
                <Route path='/profile/' component={Profile} user='me' />
                <Route path='/profile/:user' component={Profile} />
            </Router>
        </div>
    );
};
