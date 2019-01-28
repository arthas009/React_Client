import React, {Component} from 'react';
import Resizer from '../../../JQuery/TableResizer';
import putValuesToTable from "./functions/putValuesToTable";
import renderFunc from "./functions/render";

class RightUpperTableRenderer extends Component {
    constructor(props) {
        super(props);
        //WHENEVER A REFRESH TRIGGERED, CURRENT_OBJECT_STRINGS WILL KEEP VALEUS OF CURRENT JSON XML
        this.state = {xmldocument: null, ids: [], current_object_strings: []};
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
        this.setState({ids: currentids});
    };
    /* REMOVING FUNCTION TO REMOVE A SPESIFIC TABLE ELEMENT */
    remove = (i) => {
        let currentids = this.state.ids;
        currentids.splice(i, 1);
        this.setState({ids: currentids});
    };
    /* CREATE THE TABLE OVERLOADS WITH DROPPING */
    createInfoComps = () => {
        var documenttobring = this.state.xmldocument;
        if (documenttobring == null)
            return null;
        let incomingJson = JSON.parse(documenttobring);
        var currentids = this.state.ids;
        var parameters = incomingJson.Parameters.Parameter;
        return putValuesToTable(currentids, parameters, this.remove)
    };

    /* CALL  RENDER FUNCTION */
    render() {
        return renderFunc(this.createInfoComps, this.drop, this.allowDrop);
    }
}

export default RightUpperTableRenderer;