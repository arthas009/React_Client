import React, {Component} from 'react';
import Chart from 'chart.js';
import renderFunct from './functions/render.js';
import 'chartjs-plugin-zoom';


class RightUpperGraphRenderer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {

        let date = new Date();
        let currentHour = date.getHours();
        let currentMinute = date.getMinutes();
        let currentSecond = date.getSeconds();

        this.max = 0;
        this.min = 9999999;
        this.startIndex=0;
        this.endIndex = 0;
        this.currentTab = this.props.currentTab;
        this.parentTabs = this.props.parentTabs;
        this.myChart = null;

        let objectstring = this.parentTabs.getNodeAt(this.currentTab).objects; // find current jsons
        let ids = this.parentTabs.getNodeAt(this.currentTab).ids; // find current ids of jsons so that we can find which parameters belongs to whick json object
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
                if (JSONobject.Parameters.Parameter[ids[i]].timestamp[k] > this.max) {
                    this.max = JSONobject.Parameters.Parameter[ids[i]].timestamp[k];
                }
                if (this.min > JSONobject.Parameters.Parameter[ids[i]].timestamp[k]) {
                    this.min = JSONobject.Parameters.Parameter[ids[i]].timestamp[k];
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

        this.borderColors = bordercolors;

        for(let k = 0;k<=interval;k++)
        {
            intervals.push(currentHour+":"+currentMinute+":"+(currentSecond++));
            if(currentSecond == 60)
            {
                currentMinute++;
                currentSecond=0;
            }
            if(currentMinute==60)
            {
                currentHour++;
                currentMinute=0;
            }
            if(currentHour==24)
            {
                currentHour=0;
            }
        }

        /* TO ARRANGE MIN AND MAX LIMITS */
        let maxlimit = [];
        for(let k =0;k<datasett[0].data.length;k++)
        {
            maxlimit.push(this.max);
        }

        let minlimit = [];
        for(let k =0;k<datasett[0].data.length;k++)
        {
            minlimit.push(this.min);
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
        this.myChart = new Chart(ctx, {
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
        this.currentDataset = datasett.slice(0);
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
        if(this.myChart)
            this.myChart.destroy();

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
        //Regex for only numbers
        e.target.value = e.target.value.replace(/\D/,'');

        //Intervals can not be less than 0 and max can not be less then min
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

        // If its length is greater then five, then cut after five.
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

        this.startIndex = valueMin;
        this.endIndex = valueMax;
        let intervals = [];
        /* CALCULATE INTERVAL STRING ARRAY FOR CHART.JS */
        for (let k = valueMin; k <= valueMax; k++) {
            intervals.push("" + k);
        }
        //find current data.
        let currentds = this.currentDataset;
        for(let i = 0; i<currentds.length -2 ;i++ )
        {

            let startIndexChangedData = [];
            // Calculate new data to show from start index.
            for(let k = this.startIndex;k<currentds[i].data.length;k++)
            {
                startIndexChangedData.push(currentds[i].data[k]);
            }
            //Change chart's data.
            this.myChart.data.datasets[i].data=startIndexChangedData;
        }
        this.myChart.data.labels = intervals;
        this.myChart.update();
        this.resetGraph();
    };

    /* reset zoom click event */
    resetGraph = () =>
    {
        this.myChart.resetZoom();
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

        for(let k = 0;k<this.myChart.data.datasets.length-2;k++)
        {
            let bordercolor = [this.random_rgba(), this.random_rgba(), this.random_rgba(), this.random_rgba(), this.random_rgba(), this.random_rgba()];
            this.borderColors[k]=bordercolor;
            this.myChart.data.datasets[k].borderColor =bordercolor;
        }
        this.myChart.update();
    };

    /* floating graph */
    float = () =>
    {
        /*
        * GENERATE A RANDOM NUMBER AND PUSH IT TO EACH DATA ARRAY. BEFORE IT, MAKE A CALCULATION ABOUT MIN AND MAX VALUES
        */
        let currentds = this.currentDataset;
        for (let i = 0; i <  currentds.length - 2; i++) {
            let newValue = Math.floor(Math.random() * 225) + 10;
            if(newValue > this.max)
            {
                //If new value is greater than maximum, then place new maximum to chart.
                this.max = newValue;
                for(let k = 0;k<currentds[currentds.length-2].data.length;k++)
                {
                    currentds[currentds.length-2].data[k] = newValue;
                }
                currentds[currentds.length-2].data.push(newValue);
            }
            else
                currentds[currentds.length-2].data.push(this.max);
            if(newValue <this.min)
            {
                //If new value is less than minimum, then place new minimum to chart.
                this.min = newValue;
                for(let k = 0;k<currentds[currentds.length-1].data.length;k++)
                {
                    currentds[currentds.length-1].data[k] = newValue;
                }
                currentds[currentds.length-1].data.push(newValue);
            }
            else
                currentds[currentds.length-1].data.push(this.min);

            // PUSH NEW VALUE TO DATA
            currentds[i].data.push(newValue);
        }
        // UPDATE CURRENT DATASET
        this.currentDataset=currentds.slice(0);
        // SLICE UNTIL BEGIN INDEX AND UPDATE CHART
        let dataToReplace = [];
        for(let i = 0; i<currentds.length-2 ;i++ )
        {
            let startIndexChangedData = [];
            for(let k = this.startIndex;k<currentds[i].data.length;k++)
                startIndexChangedData.push(currentds[i].data[k]);

            dataToReplace.push({
                label: 'Deneme ' + (i + 1),
                data:startIndexChangedData,
                borderColor: this.borderColors[i],
                borderWidth: 3
            })
        }
        /*
        * Push a new MAX and MIN data to chart
        */
        let maxlimit = [];
        for(let k =0;k<currentds[0].data.length;k++)
        {
            maxlimit.push(this.max);
        }

        let minlimit = [];
        for(let k =0;k<currentds[0].data.length;k++)
        {
            minlimit.push(this.min);
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

        this.myChart.data.datasets = dataToReplace;
        this.myChart.update();
    };

    /* CALL  RENDER FUNCTION */
    render() {

        return (
            renderFunct(this.currentTab,this.internalInputOnChange,this.setIntervals,this.resetGraph,this.startFloating,this.stopFloating,this.changeColors)

        );
    }

}

export default RightUpperGraphRenderer;
