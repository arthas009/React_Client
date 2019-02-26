import React, {Component} from 'react';
import Chart from 'chart.js';
import renderFunct from './functions/render.js';
import 'chartjs-plugin-zoom';


class RightUpperGraphRenderer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myChart: null,
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
                    max = JSONobject.Parameters.Parameter[ids[i]].timestamp[k];
                }
                if (min > JSONobject.Parameters.Parameter[ids[i]].timestamp[k]) {
                    min = JSONobject.Parameters.Parameter[ids[i]].timestamp[k];
                }
            }
            let bordercolor = [this.random_rgba(), this.random_rgba(), this.random_rgba(), this.random_rgba(), this.random_rgba(), this.random_rgba()];
            bordercolors.push(bordercolor);
            let toadd = {
                label: 'Deneme ' + (i + 1),
                data: JSONobject.Parameters.Parameter[ids[i]].timestamp,
                borderColor: bordercolor,
                borderWidth: 3
            };
            datasett.push(toadd);
            interval = JSONobject.Parameters.Parameter[ids[i]].timestamp.length;
        }

        this.state.dataSet = datasett;
        this.state.borderColors = bordercolors;

        for(let k = 0;k<=interval;k++)
        {
            intervals.push(""+k);
        }

        /* TO ARRANGE MIN AND MAX LIMITS */
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

        datasett.push(maxlimits);
        datasett.push(minlimits);


        /* FIND THE CHART FROM ITS REF */
        var ctx = this.refs.myGraphCanvas;
        Chart.defaults.global.elements.line.fill = false;
        this.state.myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: intervals,
                datasets: datasett
            },
            options: {
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }
                },
                pan: {
                    enabled: true,
                    mode: "y",
                    speed: 10,
                    threshold: 10
                },
                zoom: {
                    enabled: true,
                    drag: false,
                    mode: "xy",
                    limits: {
                        max: 10,
                        min: 0.5
                    }
                },
                responsive: true,
                animation: false,
                legend: {
                    display: true,
                    labels: {
                        fontColor: 'rgb(255, 99, 132)'
                    }
                },
                title: {
                    display: true,
                    text: 'Denemeler'
                },

                scales: {
                    yAxes: [{
                        ticks: {
                            // Include a dollar sign in the ticks
                            callback: function (value, index, values) {
                                if(value>0)
                                    return '+' + value;
                                else
                                    return value;
                            }
                        }
                    }]
                }

            },

        });

        /* DYNAMICALLY AND INTERVALLY UPDATE THE CHART IN EACH 1 SEC */
        this.intervalID = setInterval(() => {

          this.float();

        }, 3000);

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
        let max = 0;
        let min = 99999999;
        let copydatasetfirst = this.state.dataSet; // we always use dataset from state

        let newdata = [];

        /* loop ends 2 number before because last 2 index includes min and max limit information */
        for (let i = 0; i < copydatasetfirst.length - 2; i++) {

            let datatochange = copydatasetfirst;
            for (let k = 0; k < datatochange[i].data.length; k++) {
                datatochange[i].data[k] = datatochange[i].data[k + 1];
            }
            datatochange[i].data[datatochange[i].data.length - 1] = Math.floor(Math.random() * 550) + 1;
            ;

            let toadd = {
                label: 'Deneme ' + (i + 1),
                data: datatochange[i].data,
                borderColor:
                    [
                        this.state.borderColors[i]
                    ],
                borderWidth: 3
            };
            for (let k = 0; k < datatochange[i].data.length; k++) {
                if (datatochange[i].data[k] > max) {
                    max = datatochange[i].data[k];
                }
                if (min > datatochange[i].data[k]) {
                    min = datatochange[i].data[k];
                }
            }
            newdata.push(toadd);
        }

        /* TO ARRANGE MIN AND MAX LIMITS */
        let maxlimit = [];
        for(let k =0;k<newdata[0].data.length;k++)
        {
            maxlimit.push(max);
        }

        let minlimit = [];
        for(let k =0;k<newdata[0].data.length;k++)
        {
            minlimit.push(min);
        }
        let maxlimits = {
            data: maxlimit,
            label: 'MaxLimit',
            fill: false,
            radius: 0,
            borderColor: "rgba(0,0,0,1)",
        };
        let minlimits = {
            data: minlimit,
            label: 'MinLimit',
            fill: false,
            radius: 0,
            borderColor: "rgba(0,0,0,1)",
        };
        newdata.push(minlimits);
        newdata.push(maxlimits);

        this.state.datasett = newdata;
        this.state.myChart.data.datasets = newdata;
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