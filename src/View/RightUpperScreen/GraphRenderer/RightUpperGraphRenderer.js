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
            max:0,
            min:9999999,
            startIndex:0,
            endIndex:0
        };
    }
    componentDidMount() {

        let objectstring = this.state.parentTabs.getNodeAt(this.state.currentTab).objects; // find current jsons
        let ids = this.state.parentTabs.getNodeAt(this.state.currentTab).ids; // find current ids
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
                if (JSONobject.Parameters.Parameter[ids[i]].timestamp[k] > this.state.max) {
                    this.state.max = JSONobject.Parameters.Parameter[ids[i]].timestamp[k];
                }
                if (this.state.min > JSONobject.Parameters.Parameter[ids[i]].timestamp[k]) {
                    this.state.min = JSONobject.Parameters.Parameter[ids[i]].timestamp[k];
                }
            }
            let bordercolor = [this.random_rgba(), this.random_rgba(), this.random_rgba(), this.random_rgba(), this.random_rgba(), this.random_rgba()];
            bordercolors.push(bordercolor);
            let toadd;
            toadd = {
                label: 'Deneme ' + (i + 1),
                data: JSONobject.Parameters.Parameter[ids[i]].timestamp,
                borderColor: bordercolor,
                borderWidth: 3
            };
            datasett.push(toadd);
            interval = JSONobject.Parameters.Parameter[ids[i]].timestamp.length;
        }

        this.state.borderColors = bordercolors;

        for(let k = 0;k<=interval;k++)
        {
            intervals.push(""+k);
        }

        /* TO ARRANGE MIN AND MAX LIMITS */
        let maxlimit = [];
        for(let k =0;k<datasett[0].data.length;k++)
        {
            maxlimit.push(this.state.max);
        }

        let minlimit = [];
        for(let k =0;k<datasett[0].data.length;k++)
        {
            minlimit.push(this.state.min);
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
        let datasetcopy = datasett.slice(0);

        /* FIND THE CHART FROM ITS REF */
        var ctx = this.refs.myGraphCanvas;
        Chart.defaults.global.elements.line.fill = false;
        this.state.myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: intervals,
                datasets: datasetcopy
            },
            options: {
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
                plugins: {
                    filler: {
                        propagate: false
                    }
                },
                scaleStartValue: 3,
                scales: {
                    yAxes: [{
                        ticks: {
                            // Include a dollar sign in the ticks
                            callback: function (value, index, values) {
                                if(value>0)
                                    return '+' + value;
                                else
                                    return value;
                            },

                        }
                    }],
                    xAxes: [{
                        ticks: {
                            min: 2,
                            max: 3

                        }

                    }]
                }
            },

        });
        Chart.plugins.register({
            afterDatasetsDraw: function(c) {
                let ctx = c.ctx;
                let prevY;
                c.data.datasets.forEach(function(e, i) {
                    let meta = c.getDatasetMeta(i);
                    if (meta.hidden) return;
                    meta.data.forEach(function(e) {
                        let x = e.tooltipPosition().x;
                        let y = e.tooltipPosition().y;
                        let radius = e._model.radius;
                        let moveY = prevY && (y < prevY ? y - (radius * 3) : y + (radius * 3));
                        let lineY = prevY && (y < prevY ? y - (radius * 2) : y + (radius * 2));
                        let color = prevY && (y < prevY ? 'green' : 'red');

                        // draw arrow
                        ctx.save();
                        ctx.fillStyle = color;
                        ctx.beginPath();
                        ctx.moveTo(x, moveY);
                        ctx.lineTo(x + radius, lineY);
                        ctx.lineTo(x - radius, lineY);
                        ctx.closePath();
                        ctx.fill()
                        ctx.restore();
                        prevY = y;
                    })
                });
            }
        });
        this.state.currentDataset = datasett.slice(0);
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
        let o = Math.round, r = Math.random, s = 255;
        return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
    }

    /*Internal input area text change event */
    internalInputOnChange(e)
    {
        e.target.value = e.target.value.replace(/\D/,'');

        if(document.getElementById("intervalsMax").value.length <= 0 ||
            document.getElementById("intervalsMax").value.length ==='0'||
            document.getElementById("intervalsMin").value.length <= 0 ||
            document.getElementById("intervalsMin").value.length ==='0'||
            parseInt(document.getElementById("intervalsMax").value) <= parseInt(document.getElementById("intervalsMin").value))
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
        let valueMin= document.getElementById('intervalsMin').value;
        let valueMax= document.getElementById('intervalsMax').value;
        valueMin = parseInt(valueMin);
        valueMax = parseInt(valueMax);

        this.state.startIndex = valueMin;
        this.state.endIndex = valueMax;
        let intervals = [];
        /* CALCULATE INTERVAL STRING ARRAY FOR CHART.JS */
        for (let k = valueMin; k <= valueMax; k++) {
            intervals.push("" + k);
        }
        let currentds = this.state.currentDataset;
        for(let i = 0; i<currentds.length -2 ;i++ )
        {

            let startIndexChangedData = [];
            for(let k = this.state.startIndex;k<currentds[i].data.length;k++)
            {
                startIndexChangedData.push(currentds[i].data[k]);
            }

            this.state.myChart.data.datasets[i].data=startIndexChangedData;
        }
        this.state.myChart.data.labels = intervals;
        this.state.myChart.update();

        this.resetGraph();


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

        /* GENERATE A RANDOM NUMBER AND PUSH IT TO EACH DATA ARRAY. BEFORE IT, MAKE A CALCULATION ABOUT MIN AND MAX VALUES
         */
        let currentds = this.state.currentDataset;
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
        this.state.currentDataset=currentds.slice(0);
        // SLICE UNTIL BEGIN INDEX AND UPDATE CHART
        let dataToReplace = [];
        for(let i = 0; i<currentds.length-2 ;i++ )
        {
            let startIndexChangedData = [];
            for(let k = this.state.startIndex;k<currentds[i].data.length;k++)
                startIndexChangedData.push(currentds[i].data[k]);

            dataToReplace.push({
                label: 'Deneme ' + (i + 1),
                data:startIndexChangedData,
                borderColor: this.state.borderColors[i],
                borderWidth: 3
            })
        }
        let maxlimit = [];
        for(let k =0;k<currentds[0].data.length;k++)
        {
            maxlimit.push(this.state.max);
        }

        let minlimit = [];
        for(let k =0;k<currentds[0].data.length;k++)
        {
            minlimit.push(this.state.min);
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
        dataToReplace.push(maxlimits);
        dataToReplace.push(minlimits);

        this.state.myChart.data.datasets = dataToReplace;
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
