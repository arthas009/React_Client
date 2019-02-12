import React from 'react';
import ReactDOM from 'react-dom';
import './View/main.css';
import * as serviceWorker from './serviceWorker';
import TabSection from "./View/TabSection/TabSection";

ReactDOM.render(<TabSection />, document.getElementById('tabSection'));

//ReactDOM.render(<DownMenuContext />, document.getElementById('leftBottomFixedMenu'));
//ReactDOM.render(<RightUpperTableRenderer />, document.getElementById('main'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
