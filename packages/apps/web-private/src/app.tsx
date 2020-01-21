import preact, { h } from 'preact';

import Home from 'routes/home';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
if ((module as any).hot) {
    // tslint:disable-next-line:no-var-requires
    require('preact/debug');
}

export const App: preact.FunctionalComponent = () => (
    <div id="app">
        <Home />
    </div>
);
