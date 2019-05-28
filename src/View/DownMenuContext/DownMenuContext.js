import React, { Component } from 'react';
import Resizer from '../../JQuery/TableResizer';
import findIndexes from './functions/Searching/Searching_event_find_indexes';
import bringIndexValues from './functions/Searching/Searching_event_bring_index_values';
import bringValues from './functions/Bring_Values';
import renderFunc from "./functions/render";
import timedCount from '../../Controller/CheckData';
import WebWorker from '../../Controller/WebWorker';

class DownMenuContext extends Component {
    constructor(props) {
        super(props);
        this.state = {jsonstring:null, keytosearch: "",xmlfound:false};
    }
    componentDidMount() {

        Resizer(); // TABLE RESIZING JQUERY
        // ASYNC WORKER
        this.XmlFetcherWorker = new WebWorker(timedCount);
        window.onmouseup = () =>
        {
          this.isMouseDown = false;
        };

        //LISTEN MESSAGES FROM WORKER
        this.XmlFetcherWorker.addEventListener('message', function (event) {
            if(event.data == "" || event.data == null)
            {
                this.setState({xmlfound:false});
                return;
            }

            this.state.xmlfound = true;

            var jsontext = JSON.stringify(event.data);
            // SET OBJECT STRING TO STATE. THIS WILL TRIGGER A COMPONENT REFRESH
            this.setState({jsonstring:jsontext});
        }.bind(this));

    }
    componentWillUnmount() {
        this.XmlFetcherWorker.terminate();
    }

    search = (ev) => {
        this.setState({keytosearch: ev.target.value});
    };
    drag = (ev,id) => {
        // TRANSFER ID OF THE COLUMN THAT IS GOINT TO PLACED ON OTHER TABLE
        ev.dataTransfer.setData("id",id); 	/* SET ID DATA TRANSFERRING FOR DRAG DROP */
        // ALSO SEND THE XML DOCUMENT TO OTHER REACT COMPONENT
        ev.dataTransfer.setData("xmldoctext",this.state.jsonstring); /* SET XML STRING TRANSFERRING FOR DRAG DROP */
    };
    tdMouseDown = (e,fromWhere) =>
    {
        /* if event is triggered from an inner <div> */
        if(fromWhere == "InnerDiv")
            e.target.className = "SelectedID"; /* make inner divs class as SelectedID
        /* if event is triggered from an outer <td> */
        else if(fromWhere == "OuterTD")
            e.target.childNodes[0].className = "SelectedID"; // make inner divs class as SelectedID

        this.isMouseDown = true; //mousedown flag is true

    };
    onDoubleClick = (e) =>
    {
        const table = document.getElementById("t_draggable1");

        const divs = table.getElementsByTagName("td");
        for(let k = 0;k<divs.length;k++)
        {
            divs[k].className = ""; // RESET CLASSES
        }

        const divs2 = table.getElementsByTagName("div");
        for(let k = 0;k<divs2.length;k++)
        {
            divs2[k].className = "";  // RESET CLASSES
        }
    };
    tdMouseHover= (e) =>
    {
        /* IF MOUSE IS DOWN AND HOVERING, THEN ADD TD ELEMENT TO selectedID CLASS */
        if(this.isMouseDown)
        {
            //e.target.className = "SelectedID";
            e.target.childNodes[0].className = "SelectedID";
        }
    };

    createTable = () =>
    {
        /* GET XML DOCUMENT */
        if(!this.state.jsonstring)
            return null;

        let are_we_searching = true;
        if(this.state.keytosearch == "")
            are_we_searching = false;

        let jsonobj = JSON.parse(this.state.jsonstring);
        var parameters = jsonobj.Parameters.Parameter;

        /* CREATE TABLE'S SUB CELLS READ FROM XML */
        /* IF WE ARE SEARCHING FOR A PATTERN THEN IF CLAUSE WILL WORK */
        if(are_we_searching)
        {
            return bringIndexValues(findIndexes(parameters,this.state.keytosearch),parameters,this.drag,this.tdMouseDown,this.tdMouseHover,this.onDoubleClick);
        }
        // IF WE ARE NOT SEARCHING ANY PATTERN, THIS SECTION WILL WORK
        else {
            return bringValues(parameters,this.drag,this.tdMouseDown,this.tdMouseHover,this.onDoubleClick);
        }

    };
    render()
    {
        /* IF no answer from server .. */
        if(!this.state.xmlfound)
            return (<div><h2>Error: No XML/JSON data found</h2></div>);
        return(
            renderFunc(this.createTable,this.readxmlfunc,this.search)
        );
    }
}

export default DownMenuContext;