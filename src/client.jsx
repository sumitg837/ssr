import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import { BrowserRouter } from 'react-router-dom'

// import { createStore, applyMiddleware } from 'redux';
// import { Provider } from 'react-redux';
// import thunk from 'redux-thunk';

import App from './_components/app';

// import reducers from './components/reducer'

import { createMemoryHistory } from 'history';

// const store = createStore(
//     reducers, window.__INITIAL_STATE__, applyMiddleware(thunk)
// );
const history = createMemoryHistory();

window.onload = () => {
    Loadable.preloadReady().then(() => {
        ReactDOM.hydrate(
            <BrowserRouter history={history}>
                <App />
            </BrowserRouter>,
        document.getElementById('app'));
    });
};