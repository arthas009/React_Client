import React, { Component } from 'react';
import Resizer from '../JQuery/TableResizer';
import findIndexes from './functions/Searching/Searching_event_find_indexes';
import bringIndexValues from './functions/Searching/Searching_event_bring_index_values';
import bringValues from './functions/Bring_Values';
import renderFunc from "./functions/render";
import timedCount from '../../Controller/CheckData';
import WebWorker from '../../Controller/WebWorker';


class DownMenuContext extends Component {
    constructor(props) {
        super(props);
        this.state = {xmldocument: null, keytosearch: "",xmlfound:false,jsonstring:""};
    }

    componentDidMount() {
        Resizer(); // TABLE RESIZING JQUERY

        // ASYNC WORKER
        this.XmlFetcherWorker = new WebWorker(timedCount)

        //LISTEN MESSAGES FROM WORKER
        this.XmlFetcherWorker.addEventListener('message', function (event) {
            if(event.data == "" || event.data == null)
                this.setState({xmlfound:false});
            this.state.xmlfound = true;
            var jsontext = JSON.stringify(event.data);

            this.setState({jsonstring:jsontext});
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(this.state.xmldocumenttext,"text/xml");
            // SET OBJECT TO STATE
            console.log("xmlDoc "+ xmlDoc);
            this.setState({xmldocument:xmlDoc});
        }.bind(this));

        /*fetch("https://api.example.com/items")
          .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                       isLoaded: true,
                       items: result.items
                    });
                },
                // Note: it's important to handle errors here
               // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                 (error) => {
                this.setState({isLoaded: true,error});
                     }
                 );
                 */
    }
    componentWillUnmount() {
        this.XmlFetcherWorker.terminate();
    }

    search = (ev) => {
        this.setState({keytosearch: ev.target.value});
    }
    drag = (ev,id) => {
        // TRANSFER ID OF THE COLUMN THAT IS GOINT TO PLACED ON OTHER TABLE
        ev.dataTransfer.setData("id",id); 	/* SET ID DATA TRANSFERRING FOR DRAG DROP */
        // ALSO SEND THE XML DOCUMENT TO OTHER REACT COMPONENT
        ev.dataTransfer.setData("xmldoctext",this.state.xmldocumenttext); /* SET XML STRING TRANSFERRING FOR DRAG DROP */
    }
    /* READ XML FROM INPUT FILE*/
    readxmlfunc  = (event) => {
        var parser =  new DOMParser();
        var xmlDoc;
        var input = event.target;
        var reader = new FileReader();
        reader.onload = function()
        {
            var text = reader.result; 	/* XML STRING */
            this.state.xmldocument=text;
            xmlDoc = parser.parseFromString(text,"text/xml"); 	/* PARSE ELEMENTS */
            this.setState({xmldocument:xmlDoc}); 	/* SET XML DOCUMENT TO STATE VARIABLE*/
        }.bind(this); 	/* BIND THIS FUNCTION TU UPPER */
        reader.readAsText(input.files[0]);
    };

    createTable = () =>
    {
        /* GET XML DOCUMENT */
        if(!this.state.xmldocument)
            return null;
        let are_we_searching = true;
        if(this.state.keytosearch == "")
            are_we_searching = false;
        var xmlstring = this.state.xmldocument;
        let jsonobj = JSON.parse(this.state.jsonstring);
        console.log(jsonobj);
        var titles = xmlstring.getElementsByTagName("title");
        /* CREATE TABLE'S SUB CELLS READ FROM XML */
        /* IF WE ARE SEARCHING FOR A PATTERN THEN IF CLAUSE WILL WORK */
        if(are_we_searching)
        {
            return bringIndexValues(findIndexes(titles,this.state.keytosearch),titles,this.drag);
        }
        // IF WE ARE NOT SEARCHING ANY PATTERN, THIS SECTION WILL WORK
        else {
            return bringValues(titles,this.drag);
        }

    };
    render()
    {
        if(!this.state.xmlfound)
            return (<div><h2>Error: No xml data found</h2></div>);
        return(
            renderFunc(this.createTable,this.readxmlfunc,this.search)
        );
    }
}

export default DownMenuContext;