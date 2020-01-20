import preact, { h } from 'preact';
import { useState } from 'preact/hooks';
import { getCurrentUrl, Route, Router, RouterOnChangeArgs } from 'preact-router';

import Header from 'components/header';
import Home from 'routes/home';
import Login from 'routes/login';
import Register from 'routes/register';
import Profile from 'routes/profile';

interface RouteInfo {
    title: string;
    subtitle?: string;
    settings: boolean;
}

interface Routes {
    [key: string]: RouteInfo;
}

export const App: preact.FunctionalComponent = () => {
    const [currentUrl, setCurrentUrl] = useState<string>(getCurrentUrl());

    const routes: Routes = {
        '/login': {
            title: 'Login',
            subtitle: '',
            settings: false,
        },
        '/': {
            title: 'Home',
            subtitle: 'Sweet Home',
            settings: true,
        },
    };

    const renderHeader = (): preact.ComponentChild => {
        const routeInfo = routes[currentUrl];
        return <Header title={routeInfo.title} subtitle={routeInfo.subtitle} withSettingsMenu={routeInfo.settings} />;
    };

    return (
        <div id="app">
            {/*{renderHeader()}*/}
            <Router onChange={(e: RouterOnChangeArgs): void => setCurrentUrl(e.url)}>
                <Route path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/profile/" component={Profile} user="me" />
                <Route path="/profile/:user" component={Profile} />
            </Router>
        </div>
    );
};
