import React, { Component } from 'react';
import Resizer from '../JQuery/TableResizer';
import bringsArraysOfTags from './functions/createTableComps'
import putValuesToTable from "./functions/putValuesToTable";
import renderFunc from "./functions/render";

class RightUpperScreen extends Component{
    constructor(props)
    {
        super(props);
        this.state = {xmldocument:null,ids:[]};
    }
    componentDidMount()
    {
        //RESIZING FROM JQUERY
         Resizer();
    }
    /* ALLOW DROPPING */
    allowDrop = (ev) =>
    {
        ev.preventDefault();
    };
    /*ON DROP FUNCTION */
    drop = (ev) =>
    {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("xmldoctext"); /* FETCH THE XML FROM LEFT DOWN MENU */
        var tosearch = ev.dataTransfer.getData("id"); /* FETCH THE ID IT SENT */
        var parser =  new DOMParser();
        var xml=parser.parseFromString(data,"text/xml"); /* PARSE XML TO STRING */
        this.state.xmldocument = xml; /* SET XML TO STATE */
          /* PUSH NEW ID ONTO OTHERS TO FETCH LATER */
        let currentids = this.state.ids;
        currentids.push(parseInt(tosearch));
        this.setState({ids:currentids});
    };
    /* REMOVING FUNCTION TO REMOVE A SPESIFIC TABLE ELEMENT */
    remove = (i) =>
    {
        let currentids = this.state.ids;
        currentids.splice(i,1);
        this.setState({ids:currentids});
    };
    /* CREATE THE TABLE OVERLOADS WITH DROPPING */
    createInfoComps = () =>
    {
         var documenttobring = this.state.xmldocument;
         if(documenttobring==null)
            return null;
         var currentids = this.state.ids;
         var books = documenttobring.getElementsByTagName("book");

    return putValuesToTable(bringsArraysOfTags(books),currentids,books,this.remove)
};
/* CALL  RENDER FUNCTION */
render()
{
    return  renderFunc(this.createInfoComps,this.drop,this.allowDrop);
}
}

export default RightUpperScreen;