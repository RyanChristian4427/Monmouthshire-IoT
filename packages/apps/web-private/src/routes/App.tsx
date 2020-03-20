import { FunctionalComponent, h } from 'preact';
import Router, { Route, route, RouterOnChangeArgs } from 'preact-router';
import { authStorageService } from 'ts-api-toolkit';

import Home from 'routes/home';
import Login from 'routes/login';
import Register from 'routes/register';

const App: FunctionalComponent = () => {
    const publicRoutes = ['/register', '/login'];

    const authGuard = (e: RouterOnChangeArgs): void => {
        if (!publicRoutes.includes(e.url) && !authStorageService.getToken()) route('/auth/login');
    };

    return (
        <div id="app">
            <Router onChange={authGuard}>
                <Route path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
            </Router>
        </div>
    );
};

export default App;
