import React, {Component} from 'react';

import renderFunct from './functions/render.js';

import * as Plotly from "plotly.js";


class RightUpperGraphRenderer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab : this.props.currentTab,
            parentTabs : this.props.parentTabs,
        };
    }
    componentDidMount() {
        let date = new Date();
        let currentHour = date.getHours();
        let currentMinute = date.getMinutes();
        let currentSecond = date.getSeconds();
        this.startHour = currentHour;
        this.startMinute = currentMinute;
        this.startSecond = currentSecond;


        let objectstring = this.state.parentTabs.getNodeAt(this.state.currentTab).objects; // find current jsons
        let ids = this.state.parentTabs.getNodeAt(this.state.currentTab).ids; // find current ids
        let max = 0;
        let min = 9999999;
        let datasett = [];
        this.timeStamp = [];


        /*
        *
        * CALCULATE MIN AND MAX NUMBER
        * THEN START ARRANGING DATASET ACCORDING TO DRAGGED PARAMETERS
        *
         */
        for (let i = 0; i < ids.length; i++) {
            let JSONobject = JSON.parse(objectstring[i]);
            for (let k = 0; k < JSONobject.Parameters.Parameter[ids[i]].timestamp.length; k++) {
                if (JSONobject.Parameters.Parameter[ids[i]].timestamp[k] > max) {
                    this.state.max = JSONobject.Parameters.Parameter[ids[i]].timestamp[k];
                    max = JSONobject.Parameters.Parameter[ids[i]].timestamp[k];
                }
                if (min > JSONobject.Parameters.Parameter[ids[i]].timestamp[k]) {
                    min = JSONobject.Parameters.Parameter[ids[i]].timestamp[k];
                    this.state.min = JSONobject.Parameters.Parameter[ids[i]].timestamp[k];
                }
            }
            datasett.push(JSONobject.Parameters.Parameter[ids[i]].timestamp);
        }

        /* push first values of x axis to 'intervals' variable */
        for(let k = 0;k<datasett[0].length;k++)
        this.timeStamp.push(currentHour+":"+currentMinute+":"+(currentSecond++));
        let layout = {
            title: 'Parameters',
            xaxis: {
                range: [0,15],
            }
        };
        let ctx = this.refs.myGraphCanvas;
        let data = [];

        for(let i = 0; i< datasett.length;i++)
        {
            data.push({
                name:"Parameter"+(i+1),
                x: this.timeStamp,
                y: datasett[i],
                mode: 'lines',
                line: {color: this.randomRgb()}
            });
        }
        Plotly.plot(ctx, data,layout);

        this.currentDataset = datasett;
        /* DYNAMICALLY AND INTERVALLY UPDATE THE CHART IN EACH 1 SEC */
        this.intervalID = setInterval(() => {

          this.float();

        }, 1000);

        /* start button deactive at first */
        document.getElementById("startFloating").disabled = true;
        /* interval set button deactive at first */
        document.getElementById("setIntervals").disabled = true;
    }

    componentWillUnmount()
    {
      if(this.state.myChart)
         this.state.myChart.destroy();

        /* close the interval function so that we can use another one later */
      clearInterval(this.intervalID);
    }

    /* generate random colors */

    /*Internal input area text change event */
    internalInputOnChange(e)
    {
       e.target.value = e.target.value.replace(/\D/,'');

       if(e.target.value.length <0)
       {
           document.getElementById("setIntervals").disabled = true;
       }
       else
       {
           document.getElementById("setIntervals").disabled = false;
       }

        if(e.target.value.length >=5)
        {
            e.target.value = e.target.value.substring(0,5);
        }
    }
    randomRgb = () => {
        var num = Math.round(0xffffff * Math.random());
        var r = num >> 16;
        var g = num >> 8 & 255;
        var b = num & 255;
        return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    };
    /* Internal button click event */
    setIntervals = () =>
    {
        /* Min limits */
        let selectedMinHour = document.getElementById("intervalsHourMin").value;
        let selectedMinMinute = document.getElementById("intervalsMinuteMin").value;
        let selectedMinSecond = document.getElementById("intervalsSecondMin").value;

        /* Max limits */
        let selectedMaxHour = document.getElementById("intervalsHourMax").value;
        let selectedMaxMinute = document.getElementById("intervalsMinuteMax").value;
        let selectedMaxSecond = document.getElementById("intervalsSecondMax").value;

        /* Calculation of start and end indexes */
        let startIndex = 0;
        let endIndex = 0;

        /* Find graph div */
        let ctx = this.refs.myGraphCanvas;


        /* Decide where to start */
        for(let k =0;k<this.timeStamp.length;k++)
       {
           if(this.timeStamp[k] === selectedMinHour+":"+selectedMinMinute+":"+selectedMinSecond)
           {
               break;
           }
           startIndex++;
       }
        /* If specified, decide where to end */
        if(!(selectedMaxHour==null||selectedMaxMinute==null||selectedMaxSecond==null)) {
            for (let k = startIndex; k < this.timeStamp.length; k++) {
                if (this.timeStamp[k] === selectedMaxHour + ":" + selectedMaxMinute + ":" + selectedMaxSecond) {
                    break;
                }
                endIndex++;
            }
            /* I'm using relayout() shows only an area with an interval */
            Plotly.relayout(ctx, 'xaxis.range', [startIndex,endIndex+startIndex]);
        }
        /* If not specified, go until end */
        else
            Plotly.relayout(ctx, 'xaxis.range', [startIndex,this.currentDataset[0].length]);



    };

    /* Start button click event */
    startFloating = () =>
    {
        this.intervalID = setInterval(() => {
            this.float();
        }, 1000);

        document.getElementById("stopFloating").disabled = false;
        document.getElementById("startFloating").disabled = true;
    };

    /* Stop button click event */
    stopFloating = () =>
    {
        document.getElementById("stopFloating").disabled = true;
        document.getElementById("startFloating").disabled = false;
        clearInterval(this.intervalID);
    };
    /* Floating graph */
    float = () => {
        let date = new Date();
        let currentHour = date.getHours();
        let currentMinute = date.getMinutes();
        let currentSecond = date.getSeconds();

        /* Find Graph Div */
        let ctx = this.refs.myGraphCanvas;

        /* Go for each element and push a new value */
        for (let i = 0; i < this.currentDataset.length; i++) {
            let newValue = Math.floor(Math.random() * 225) + 10;
            // PUSH NEW VALUE
            this.currentDataset[i].push(newValue);
        }

        /* push first values of x axis to 'intervals' variable */
        this.timeStamp.push(currentHour+":"+currentMinute+":"+(currentSecond++));

        /* New object to update */
        var update = {
            x: [this.timeStamp],
            y: [this.currentDataset],
        };
        /* Redraw chart */
        Plotly.redraw(ctx, update, [0]);
    };
    /* CALL  RENDER FUNCTION */
    render() {

        return (
            renderFunct(this.state.currentTab,this.internalInputOnChange,this.setIntervals,this.resetGraph,this.startFloating,this.stopFloating,this.changeColors)

        );
    }

}

export default RightUpperGraphRenderer;