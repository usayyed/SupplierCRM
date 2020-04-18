import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'element-theme-default';
import './index.css';
import { i18n } from 'element-react'
import locale from 'element-react/src/locale/lang/en'
import { createBrowserHistory } from 'history';

i18n.use(locale);

export const history = createBrowserHistory();
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
