import React, {Component} from 'react';
import * as ReactDOM from "react-dom";
import ScreenManager from "../ScreenManager/ScreenManager"
import RightUpperTableRenderer from "../RightUpperScreen/TableRenderer/RightUpperTableRenderer";
import DownMenuContext from "../DownMenuContext/DownMenuContext";
import RightUpperGraphRenderer from "../RightUpperScreen/GraphRenderer/RightUpperGraphRenderer";
import WorldWindRenderer from '../RightUpperScreen/WorldWindRenderer/WorldWindRenderer'
import GanttRenderer from '../RightUpperScreen/GanttRendered/GanttRenderer'
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
            Graphs: new SavedData([],[]),
            currentTab:1,
            totalTabs:1,
            toWhat:"table",
            plotlyJSDrawedValues:[]};


    }
    componentDidMount() {

    }

    /*
    * Set the page according to current tab.
    */
    setCurrentTab = (newValue) =>
    {
        ReactDOM.unmountComponentAtNode(document.getElementById('insideMain'));
        this.setState({currentTab:newValue});
    };

    /*
    * Set new page button event handler.
    */

    newTabButtonOnClick= () =>
    {
        let changer = this.state.Tabs; // To open a new empty room in table DATA STORAGE.
        changer.add([],[]);

        let changer2 = this.state.Graphs; // // To open a new empty room in graph DATA STORAGE.
        changer2.add([],[]);

        let changer3 =this.state.plotlyJSDrawedValues;
        changer3.push([]);


        this.state.plotlyJSDrawedValues = changer3;

        this.state.totalTabs = this.state.totalTabs+1; // increment of the total tab number
        this.state.currentTab=this.state.totalTabs;
        /* Last added  tab is the last current tab */

        ReactDOM.unmountComponentAtNode(document.getElementById('insideMain'));
        this.setState( {Tabs:changer});
        ReactDOM.render(<RightUpperTableRenderer  parentTabs={this.state.Tabs} setParentObject = {this.setParentObject} currentTab = {this.state.totalTabs} >
        </RightUpperTableRenderer>,document.getElementById('insideMain'));


    };

    setParentObject =(newJSONs,newIds,currentTab) => {
        let parentObject = this.state.Tabs;
        parentObject.change(currentTab,newIds,newJSONs);
        this.state.Tabs = parentObject;
    };

    setParentGraphObject =(newJSONs,newIds,currentTab) => {
        let parentObject = this.state.Graphs;
        parentObject.change(currentTab,newIds,newJSONs);
        ReactDOM.unmountComponentAtNode(document.getElementById('insideMain'));
        this.setState({Graphs:parentObject});
    };
    changeSelectedSection = (toWhat) =>
    {
        this.setState({toWhat:toWhat});
        /*
        * Screen Manager Click events. To decide page's flow. Whether tables or graphs or worldwind are selected.
        */

    };
    updatePlotlyData = (Values) =>
    {
        this.state.plotlyJSDrawedValues[this.state.currentTab-1] = Values;
    };
    /* place all section buttons according to a count number in parent */
    bringButtons = () =>
    {
        let buttons = [];
        for(let i = 0;i<this.state.totalTabs;i++)
        {
          if(i+1 == this.state.currentTab)
          buttons.push(<button ref={"button"+(i+1)} className="sections active" onClick={() => this.setCurrentTab(i+1)}>Sekme {i+1}</button>)
          else
          buttons.push(<button ref={"button"+(i+1)} className="sections" onClick={() => this.setCurrentTab(i+1)}>Sekme {i+1}</button>)
        }
        return buttons;
    };
    render()
    {
        ReactDOM.unmountComponentAtNode(document.getElementById('insideMain'));
        if(this.state.toWhat === "table")
        {
            ReactDOM.render(<RightUpperTableRenderer  parentTabs={this.state.Tabs} setParentObject = {this.setParentObject} currentTab = {this.state.currentTab} >
            </RightUpperTableRenderer>,document.getElementById('insideMain'));
        }

        else if(this.state.toWhat === "graph")
        {
            /*
            * IF there is no data dragged yet, throw an error to screen.
            */
            /*  if(this.state.Tabs.getNodeAt(this.state.currentTab).objects == "")
              {
                  ReactDOM.unmountComponentAtNode(document.getElementById('insideMain'));
                  ReactDOM.render(<div id="graphDivision">
                      <h2>Tabloya henüz bir öğe atanmamış</h2>
                  </div>, document.getElementById('insideMain'));
                  return;
              }
              */
            ReactDOM.render(<RightUpperGraphRenderer parentGraphs={this.state.Graphs} setParentGraphObject={this.setParentGraphObject} currentTab={this.state.currentTab}
            updatePlotlyData = {this.updatePlotlyData} plotlyJSDrawedValues ={this.state.plotlyJSDrawedValues}>
            </RightUpperGraphRenderer>, document.getElementById('insideMain'));
        }
        else if(this.state.toWhat === "world")
        {
            ReactDOM.render(<WorldWindRenderer parentTabs={this.state.Tabs}
                                               setParentObject={this.setParentObject}
                                               currentTab={this.state.currentTab}>
            </WorldWindRenderer>, document.getElementById('insideMain'));
        }
        else if(this.state.toWhat === "gantt")
        {
            ReactDOM.render(<GanttRenderer parentTabs={this.state.Tabs}
                                           setParentObject={this.setParentObject}
                                           currentTab={this.state.currentTab}>
            </GanttRenderer>, document.getElementById('insideMain'));
        }

        ReactDOM.render(<DownMenuContext/>, document.getElementById('leftBottomFixedMenu'));
        ReactDOM.render(<ScreenManager
        changeScreen={this.changeSelectedSection}> </ScreenManager>, document.getElementById('leftFixedMenu'));

        /* PRINT REACT BUTTONS */
       return(<div>
            {this.bringButtons()}
           <button id="newSection" onClick = {this.newTabButtonOnClick}> Yeni Sekme Aç </button>
       </div>);
    }
}

export default TabSection;