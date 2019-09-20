import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/css/custom.css';

ReactDOM.render(<App {...window.__APP_INITIAL_STATE__} />, document.getElementById('root'));
