import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {routerMiddleware} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { loadLocalStorageState, saveLocalStorageState } from './localStorage';
import appReducer from './reducers/App';
import throttle from 'lodash/throttle';

export const history = createHistory({basename: '/'});

const initialState = loadLocalStorageState();
const enhancers    = [];
const middleware   = [
    thunk,
    routerMiddleware(history)
];

if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.devToolsExtension;

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension());
    }
}

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
);

const combinedReducers = combineReducers({
    app: appReducer
});

const store = createStore(
    combinedReducers,
    initialState,
    composedEnhancers
);

store.subscribe(throttle(() => {
    saveLocalStorageState(store.getState());
}, 1000));

export default store;