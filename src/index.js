import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import 'bootstrap/dist/css/bootstrap.css'

import { createStore, applyMiddleware } from 'redux';
import rootReducer from './store/moudules';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// const devTools =
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
