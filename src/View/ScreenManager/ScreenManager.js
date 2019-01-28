import React, { Component } from 'react';
import * as ReactDOM from "react-dom";
import RightUpperTableRenderer from "../RightUpperScreen/TableRenderer/RightUpperTableRenderer";
import DownMenuContext from "../DownMenuContext/DownMenuContext";
import RightUpperGraphRenderer from "../RightUpperScreen/GraphRenderer/RightUpperGraphRenderer";

class ScreenManager extends Component {
    constructor(props)
    {
        super(props);
        // Data is backbone of this system. To communicate and move forward on tabs, we should share this data across all of them.
        this.state = {which_one_selected:null,
                Tabs: {
                        objects:[],
                        ids:[],
                        next:null
                    },
        currentTab:1}
    }
    getData = () =>
    {
        let obj = this.state.Tabs;
        return obj;
    }
    setCurrentTab = (newValue) =>
    {
        this.state.currentTab = newValue;
    }
    setParentObject =(newJSONs,newIds,currentTab) =>
    {
        let count = 1;
        var parentObject = this.state.Tabs;
        var follower = parentObject;
        while(count<currentTab)
        {
            follower = follower.next;
        }
        follower.objects = newJSONs;
        follower.ids = newIds;

        this.state.Tabs = parentObject;
        console.log(parentObject);
    };
    /* to trigger a refresh when clicked management buttons */
    selectGraphs = () =>
    {
        this.setState({which_one_selected:0});
    };
    /* to trigger a refresh when clicked management buttons */
    selectTables= () =>
    {
        this.setState({which_one_selected:1});
    };

  /* RENDER HTML */

    render(){

        if(this.state.which_one_selected ==1)
        {

            ReactDOM.render(<DownMenuContext/>, document.getElementById('leftBottomFixedMenu'));
            ReactDOM.render(<RightUpperTableRenderer currentTab = {this.state.currentTab}
            parentTabs = {this.state.Tabs} setParentObject={this.setParentObject}/>, document.getElementById('insideMain'));
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
