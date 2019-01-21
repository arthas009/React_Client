import React, { Component } from 'react';
import * as ReactDOM from "react-dom";
import RightUpperScreen from "../RightUpperScreen/RightUpperScreen";
import DownMenuContext from "../DownMenuContext/DownMenuContext";

class ScreenManager extends Component {
    constructor(props)
    {
        super(props);
        this.state = {which_one_selected:null};
    }
    selectGraphs = () =>
    {
        this.setState({which_one_selected:0});
    };
    selectTables= () =>
    {
        this.setState({which_one_selected:1});
    };
  /* RENDER HTML */
    render(){

        if(this.state.which_one_selected ==1)
        {
            ReactDOM.render(<DownMenuContext unmountMe={false}/>, document.getElementById('leftBottomFixedMenu'));
            ReactDOM.render(<RightUpperScreen unmountMe={false}/>, document.getElementById('main'));
        }
        else
        {
            ReactDOM.render(<DownMenuContext unmountMe={false}/>, document.getElementById('leftBottomFixedMenu'));
            ReactDOM.render(<div />, document.getElementById('main'));
        }
     return(

        <div>
            <p> Ekran Yönetimi </p>
            <a onClick={this.selectGraphs} className="screenA">Grafikler</a>
            <hr />
            <a onClick={this.selectTables} className="screenA">Tablolar</a>
        </div>
    );
  }
}

export default ScreenManager;
