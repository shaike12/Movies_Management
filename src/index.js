import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import MoviesMenuComp from './components/movies/MoviesMenu';
import SubscripsionsComp from './components/Subscripsions';
import UsersManagementComp from './components/UsersManagement';
import AppMenuComp from './components/AppMenu';

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import moviesReducer from './components/movies/moviesReducer'

let moviesStore = createStore(moviesReducer, /* preloadedState, */
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <React.StrictMode>
    <Provider store={moviesStore}>
      <Router>
        <App/>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

