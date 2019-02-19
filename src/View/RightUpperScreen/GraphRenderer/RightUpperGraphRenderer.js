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
            intervals  : 6
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
        let intervals =[];


        /* CALCULATE INTERVAL STRING ARRAY FOR CHART.JS */
        for(let k = 0;k<=this.state.intervals;k++)
        {
            intervals.push(""+k);
        }
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
            console.log(datasett);
        }

        this.state.dataSet = datasett;
        this.state.borderColors = bordercolors;



        /* TO ARRANGE MIN AND MAX LIMITS */
        let maxlimit = [max, max, max, max, max];
        let minlimit = [min, min, min, min, min];

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

            let maxlimit = [max, max, max, max, max];
            let minlimit = [min, min, min, min, min];
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
            this.state.datasett = newdata;
            newdata.push(minlimits);
            newdata.push(maxlimits);

            this.state.datasett = newdata;
            this.state.myChart.data.datasets = newdata;
            this.state.myChart.update();

        }, 3000);
    }

    componentWillUnmount() {
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
    internalInputOnChange(e)
    {
       e.target.value = e.target.value.replace(/\D/,'');
    }
    setIntervals()
    {
        let value= document.getElementById('intervals').value;
        value = parseInt(value);
        this.setState({intervals:value});
    }
    /* CALL  RENDER FUNCTION */
    render() {

        return (
            renderFunct(this.state.currentTab,this.internalInputOnChange,this.setIntervals)
        );
    }

}

export default RightUpperGraphRenderer;