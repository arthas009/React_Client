import React, { Component } from 'react';
import * as ReactDOM from "react-dom";
import RightUpperTableRenderer from "../RightUpperScreen/TableRenderer/RightUpperTableRenderer";
import DownMenuContext from "../DownMenuContext/DownMenuContext";
import RightUpperGraphRenderer from "../RightUpperScreen/GraphRenderer/RightUpperGraphRenderer";

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
            ReactDOM.render(<DownMenuContext/>, document.getElementById('leftBottomFixedMenu'));
            ReactDOM.render(<RightUpperTableRenderer/>, document.getElementById('insideMain'));
        }
        else
        {
            ReactDOM.render(<DownMenuContext/>, document.getElementById('leftBottomFixedMenu'));
            ReactDOM.render(<RightUpperGraphRenderer>
            </RightUpperGraphRenderer>, document.getElementById('insideMain'));
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
