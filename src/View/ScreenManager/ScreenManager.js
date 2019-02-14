import React, { Component } from 'react';

class ScreenManager extends Component {
    constructor(props)
    {
        super(props);
    }
    render()
    {
        /*
        *
        * IN THIS SECTION, THESE 2 EVENTS ARE MADE FOR UPDATE PARENT'S STATE TO DECIDE WHETHER GRAPHICS OR TABLES WILL BE ACTIVATED
        *
        */
        return (
            <div className="sidenav">
                <div className="sidenav-cont">
            <p>Ekran Yönetimi </p>
                <a onClick={()=>this.props.changeScreen("table")}> Tablolar </a>
                <a onClick={()=>this.props.changeScreen("graph")}> Grafikler </a>
        </div>
            </div>);
    }
}

export default ScreenManager;
