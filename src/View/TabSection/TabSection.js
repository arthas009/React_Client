import React, {Component} from 'react';
import * as ReactDOM from "react-dom";
import ScreenManager from "../ScreenManager/ScreenManager"
import RightUpperTableRenderer from "../RightUpperScreen/TableRenderer/RightUpperTableRenderer";
import DownMenuContext from "../DownMenuContext/DownMenuContext";
import RightUpperGraphRenderer from "../RightUpperScreen/GraphRenderer/RightUpperGraphRenderer";
import SavedData from "../../Model/SavedData";


class TabSection extends Component {
    constructor(props)
    {
        super(props);
        // Data is backbone of this system. To communicate and move forward on tabs, we should share this data across all of them.

        /*
        *
        * 'isTableSelected' to control wheter tables or graphs clicked. We set page according to it.
        * 'Tabs' contains the values of objects and dragged IDs of selected current tab.
        * 'currentTab' holds the number of current tab.
        * 'totalTabs' holds the number of total tabs.
        *
        */
        this.state = {
            isTableSelected:true,
            Tabs: new SavedData([],[]) ,
            currentTab:1,
            totalTabs:1}
    }
    componentDidMount() {

    }

    /*
    * Set the page according to current tab.
    */
    setCurrentTab = (newValue) =>
    {
        this.state.currentTab = newValue;
        ReactDOM.unmountComponentAtNode(document.getElementById('insideMain'));
        ReactDOM.render(<RightUpperTableRenderer  parentTabs={this.state.Tabs} setParentObject = {this.setParentObject} currentTab = {newValue} >
        </RightUpperTableRenderer>,document.getElementById('insideMain'));
    };

    /*
    * Set new page button event handler.
    */

    newTabButtonOnClick= () =>
    {
        var changer = this.state.Tabs; // To open a new empty room in DATA STORAGE.
        changer.add([],[]);
        this.state.totalTabs = this.state.totalTabs+1; // increment of the total tab number
        this.state.currentTab=this.state.totalTabs;
        /* Last added  tab is the last current tab */
        ReactDOM.unmountComponentAtNode(document.getElementById('insideMain'));
        this.setState( {Tabs:changer});
        ReactDOM.render(<RightUpperTableRenderer  parentTabs={this.state.Tabs} setParentObject = {this.setParentObject} currentTab = {this.state.totalTabs} >
        </RightUpperTableRenderer>,document.getElementById('insideMain'));


    };

    setParentObject =(newJSONs,newIds,currentTab) => {
        var parentObject = this.state.Tabs;
        parentObject.change(currentTab,newIds,newJSONs);
        this.setState({Tabs: parentObject})
    };

    changeSelectedSection = (toWhat) =>
    {
        /*
        * Screen Manager Click events. To decide page's flow. Whether tables or graphs are selected.
        */
        if(toWhat == "table")
        {
            ReactDOM.unmountComponentAtNode(document.getElementById('insideMain'));
            ReactDOM.render(<RightUpperTableRenderer  parentTabs={this.state.Tabs} setParentObject = {this.setParentObject} currentTab = {this.state.currentTab} >
            </RightUpperTableRenderer>,document.getElementById('insideMain'));
        }
        /*
        * IF there is no data dragged yet, throw an error to screen.
        */
        else
        {
            if(this.state.Tabs.getNodeAt(this.state.currentTab).objects == "")
            {
                ReactDOM.unmountComponentAtNode(document.getElementById('insideMain'));
                ReactDOM.render(<div id="graphDivision"><h1> Sekme {this.state.currentTab}</h1>
                    <h2>No graph to show</h2>
                </div>, document.getElementById('insideMain'));
                return;
            }
            else
            {
                ReactDOM.unmountComponentAtNode(document.getElementById('insideMain'));
                ReactDOM.render(<RightUpperGraphRenderer parentTabs={this.state.Tabs}
                                                         setParentObject={this.setParentObject}
                                                         currentTab={this.state.currentTab}>
                </RightUpperGraphRenderer>, document.getElementById('insideMain'));
            }
        }
    };

    /* place all buttons according to a count number in parent */
    bringButtons = () =>
    {
        let buttons = [];
        for(let i = 0;i<this.state.totalTabs;i++)
        {
          buttons.push(<button ref={"button"+(i+1)} className="sections" onClick={() => this.setCurrentTab(i+1)}>Sekme {i+1}</button>)
        }
        return buttons;
    };
    render()
    {
        /* In first render, render tables and other components */
        ReactDOM.unmountComponentAtNode(document.getElementById('insideMain'));
        ReactDOM.render(<RightUpperTableRenderer  parentTabs={this.state.Tabs} setParentObject = {this.setParentObject} currentTab = {this.state.currentTab} >
        </RightUpperTableRenderer>,document.getElementById('insideMain'));

        ReactDOM.render(<DownMenuContext />,document.getElementById('leftBottomFixedMenu'));
        ReactDOM.render(<ScreenManager changeScreen={this.changeSelectedSection}> </ScreenManager>, document.getElementById('leftFixedMenu'));


        /* PRINT REACT BUTTONS */
       return(<div>
            {this.bringButtons()}
           <button id="newSection" onClick = {this.newTabButtonOnClick}> Yeni Sekme Aç</button>
       </div>);
    }
}

export default TabSection;