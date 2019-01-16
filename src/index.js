import React from 'react';
import ReactDOM from 'react-dom';
import './View/main.css';
import ScreenManager from './View/ScreenManager/ScreenManager';
import DownMenuContext from './View/DownMenuContext/DownMenuContext';
import RightUpperScreen from './View/RightUpperScreen/RightUpperScreen';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<ScreenManager />, document.getElementById('leftFixedMenu'));
ReactDOM.render(<DownMenuContext />, document.getElementById('leftBottomFixedMenu'));
ReactDOM.render(<RightUpperScreen />, document.getElementById('main'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
