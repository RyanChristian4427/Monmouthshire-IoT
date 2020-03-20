import { FunctionalComponent, h } from 'preact';
import { useContext } from 'preact/hooks';
import { route, Route, Router, RouterOnChangeArgs } from 'preact-router';

import Auth from 'routes/auth';
import Home from 'routes/home';
import { AuthStoreContext } from 'stores';

const App: FunctionalComponent = () => {
    const authStore = useContext(AuthStoreContext);

    const publicRoutes = ['/auth/register', '/auth/login'];

    const authGuard = (e: RouterOnChangeArgs): void => {
        if (!publicRoutes.includes(e.url) && !authStore.isAuthenticated) route('/auth/login');
    };

    return (
        <div id="app">
            <Router onChange={authGuard}>
                <Route path="/" component={Home} />
                <Route path="/auth/:subPage?" component={Auth} />
            </Router>
        </div>
    );
};

export default App;
