import React, {Component} from 'react';
import Resizer from '../../../JQuery/TableResizer';
import putValuesToTable from "./functions/putValuesToTable";
import renderFunc from "./functions/render";
import SavedData from "../../../Model/SavedData";

class RightUpperTableRenderer extends Component {
    constructor(props) {
        super(props);
        //WHENEVER A REFRESH TRIGGERED, CURRENT_OBJECT_STRINGS WILL KEEP VALEUS OF CURRENT JSON XML

            //Keep data storage in object variable
            var object = this.props.parentTabs;
            //Find JSONs and ids of current ta
            let count = 1;
            while(count < this.props.currentTab )
            {
                object = object.next;
            }
            this.state = {
                xmldocument: null,
                ids: object.ids,
                current_object_strings: object.objects
            }
    }

    componentDidMount() {
        //RESIZING FROM JQUERY
        Resizer();
    }

    /* ALLOW DROPPING */
    allowDrop = (ev) => {
        ev.preventDefault();
    };
    /*ON DROP FUNCTION */
    drop = (ev) => {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("xmldoctext"); /* FETCH THE XML FROM LEFT DOWN MENU */
        var tosearch = ev.dataTransfer.getData("id"); /* FETCH THE ID IT SENT */
        var parser = new DOMParser();
        this.state.xmldocument = data; /* SET XML TO STATE */
        /* PUSH NEW ID ONTO OTHERS TO FETCH LATER */
        let currentids = this.state.ids;
        currentids.push(parseInt(tosearch));

        let current_objects = this.state.current_object_strings;
        current_objects.push(data);
        this.state.current_object_strings = current_objects;

        //CHANGE PARENT DATA

        this.props.setParentObject(current_objects,currentids,this.props.currentTab);

        //TRIGGER A REFRESH
        this.setState({ids: currentids});
    };
    /* REMOVING FUNCTION TO REMOVE A SPESIFIC TABLE ELEMENT */
    remove = (i) => {
        let currentObjects = this.state.current_object_strings;
        let currentids = this.state.ids;
        currentids.splice(i, 1);
        currentObjects.splice(i,1);

        this.props.setParentObject(currentObjects,currentids,this.props.currentTab);

        this.state.current_object_strings = currentObjects;
        this.setState({ids: currentids});
    };
    /* CREATE THE TABLE OVERLOADS WITH DROPPING */
    createInfoComps = () => {
        var JSONstrings = this.state.current_object_strings;
        if (JSONstrings == null)
            return null;
        var currentids = this.state.ids;
        return putValuesToTable(currentids, JSONstrings, this.remove)
    };

    /* CALL  RENDER FUNCTION */
    render() {
        return renderFunc(this.createInfoComps, this.drop, this.allowDrop);
    }
}

export default RightUpperTableRenderer;