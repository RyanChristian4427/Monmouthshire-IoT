import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';
import { Provider } from 'mobx-react';
import {createStores} from 'stores';

import 'styles/index.scss';
const stores = createStores();

ReactDOM.render(
    <Provider {...stores}>
        <App />
    </Provider>,
    document.getElementById('root')
);
