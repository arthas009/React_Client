import React from 'react';
import ReactDOM from 'react-dom';
import './View/main.css';
import ScreenManager from './View/ScreenManager/ScreenManager';
import TabSection from './View/RightUpperScreen/TabSection/TabSection';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<ScreenManager />, document.getElementById('leftFixedMenu'));
ReactDOM.render(<TabSection />,document.getElementById('tabSection'));
//ReactDOM.render(<DownMenuContext />, document.getElementById('leftBottomFixedMenu'));
//ReactDOM.render(<RightUpperTableRenderer />, document.getElementById('main'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
