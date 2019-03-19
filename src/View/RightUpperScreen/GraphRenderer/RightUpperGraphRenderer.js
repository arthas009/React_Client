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

        let objectstring = this.state.parentTabs.getNodeAt(this.state.currentTab).objects; // find current jsons
        let ids = this.state.parentTabs.getNodeAt(this.state.currentTab).ids; // find current ids
        console.log(ids);
        let max = 0;
        let min = 9999999;
        let bordercolors = [];
        let datasett = [];
        let intervals = [];
        let interval = 0;
        /*
        *
        * CALCULATE MIN AND MAX NUMBER
        * THEN ARRANGE A BORDER COLOR ARRAY
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
            let bordercolor = [this.random_rgba(), this.random_rgba(), this.random_rgba(), this.random_rgba(), this.random_rgba(), this.random_rgba()];
            bordercolors.push(bordercolor);
            datasett.push(JSONobject.Parameters.Parameter[ids[i]].timestamp);
        }

        this.state.borderColors = bordercolors;

        /* TO ARRANGE MIN AND MAX LIMITS */
        /*
        let maxlimit = [];
        for(let k =0;k<datasett[0].data.length;k++)
        {
            maxlimit.push(max);
        }

        let minlimit = [];
        for(let k =0;k<datasett[0].data.length;k++)
        {
            minlimit.push(min);
        }

        let maxlimits = {
            data:maxlimit,
            label:'MaxLimit',
            fill: false,
            radius: 0,
            borderColor: "rgba(0,0,0,1)",
        };
        let minlimits = {
            data:minlimit,
            label:'MinLimit',
            fill: false,
            radius: 0,
            borderColor: "rgba(0,0,0,1)",
        };
       */
       // datasett.push(maxlimits);
       // datasett.push(minlimits);


        /* FIND THE CHART FROM ITS REF */

        let layout = {
            title: 'Custom Range',
            xaxis: {
                range: [0, 7],
            }
        };
        let ctx = this.refs.myGraphCanvas;
        Plotly.plot( ctx, [{
            type:'line',
            x: [1,2,3,4,5,6,7,8,9,10],
            y: datasett[0] }],layout);




        this.state.currentDataset = datasett;
        /* DYNAMICALLY AND INTERVALLY UPDATE THE CHART IN EACH 1 SEC */
        /*this.intervalID = setInterval(() => {

          this.float();

        }, 3000);
        */
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
    random_rgba() {
        var o = Math.round, r = Math.random, s = 255;
        return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
    }

    /*Internal input area text change event */
    internalInputOnChange(e)
    {
       e.target.value = e.target.value.replace(/\D/,'');

       if(e.target.value.length <=0 || e.target.value === '0')
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

    /* Internal button click event */
    setIntervals = () =>
    {
        let value= document.getElementById('intervals').value;
        value = parseInt(value);
        let intervals =[];

        /* CALCULATE INTERVAL STRING ARRAY FOR CHART.JS */
        for(let k = 0;k<=value;k++)
        {
            intervals.push(""+k);
        }

        if(this.state.myChart.data.labels)
        {
            this.state.myChart.data.labels = intervals;
            this.state.myChart.update();
            this.resetGraph();
        }
    };

    /* reset zoom click event */
    resetGraph = () =>
    {
        this.state.myChart.resetZoom();
    };

    /* start button click event */

    startFloating = () =>
    {
        this.intervalID = setInterval(() => {
            this.float();
        }, 3000);

        document.getElementById("stopFloating").disabled = false;
        document.getElementById("startFloating").disabled = true;
    };

    /* stop button click event */
    stopFloating = () =>
    {
        document.getElementById("stopFloating").disabled = true;
        document.getElementById("startFloating").disabled = false;
        clearInterval(this.intervalID);
    };


    /* change colors click event */
    changeColors = () =>
    {

        for(let k = 0;k<this.state.myChart.data.datasets.length-2;k++)
        {
            let bordercolor = [this.random_rgba(), this.random_rgba(), this.random_rgba(), this.random_rgba(), this.random_rgba(), this.random_rgba()];
            this.state.myChart.data.datasets[k].borderColor =bordercolor;
        }
        this.state.myChart.update();
    };


    /* floating graph */
    float = () =>
    {
        let currentds = this.state.currentDataset;
        console.log(currentds);
        for (let i = 0; i <  currentds.length - 2; i++) {
            let newValue = Math.floor(Math.random() * 225) + 10;
            if(newValue > this.state.max)
            {
                this.state.max = newValue;
                for(let k = 0;k<currentds[currentds.length-2].data.length;k++)
                {
                    currentds[currentds.length-2].data[k] = newValue;
                }
                currentds[currentds.length-2].data.push(newValue);
            }
            else
                currentds[currentds.length-2].data.push(this.state.max);
            if(newValue <this.state.min)
            {
                this.state.min = newValue;
                for(let k = 0;k<currentds[currentds.length-1].data.length;k++)
                {
                    currentds[currentds.length-1].data[k] = newValue;
                }
                currentds[currentds.length-1].data.push(newValue);
            }
            else
                currentds[currentds.length-1].data.push(this.state.min);

            // PUSH NEW VALUE
            currentds[i].data.push(newValue);
        }
        // UPDATE CURRENT DATASET
        this.state.currentDataset=currentds;
        console.log(currentds);
        // SLICE UNTIL BEGIN INDEX AND UPDATE CHART
        this.state.myChart.data.dataset = currentds;
        this.state.myChart.update();
    };

    /* CALL  RENDER FUNCTION */
    render() {

        return (
            renderFunct(this.state.currentTab,this.internalInputOnChange,this.setIntervals,this.resetGraph,this.startFloating,this.stopFloating,this.changeColors)

        );
    }

}

export default RightUpperGraphRenderer;