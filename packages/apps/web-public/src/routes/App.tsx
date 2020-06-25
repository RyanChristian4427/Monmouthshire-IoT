import { FunctionalComponent, h, VNode } from 'preact';
import { useContext, useEffect } from 'preact/hooks';
import { route, Route, Router } from 'preact-router';

import Auth from 'routes/auth';
import Home from 'routes/home';
import { AuthStoreContext } from 'stores';

const App: FunctionalComponent = () => {
    return (
        <div id="app">
            <Router>
                <AuthenticatedRoute path="/" component={Home} />
                <Route path="/auth/:subPage?" component={Auth} />
            </Router>
        </div>
    );
};

const AuthenticatedRoute = (props: { path: string; component: FunctionalComponent }): VNode => {
    const isLoggedIn = useContext(AuthStoreContext).isAuthenticated;

    useEffect(() => {
        if (!isLoggedIn) route('/auth/login', true);
    }, [isLoggedIn]);

    if (!isLoggedIn) return null;

    return <Route {...props} />;
};

export default App;
