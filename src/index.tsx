import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import { AppWithUseReducer } from './components/AppWithUseReducer';
import { AppWithRedux } from './components/AppWithRedux';
import { Provider } from 'react-redux';
import { store } from './redux/store';

ReactDOM.render( <Provider store={ store }><AppWithRedux/></Provider>, document.getElementById( 'root' ) );
