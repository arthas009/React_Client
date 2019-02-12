import React, {Component} from 'react';
import Chart from 'chart.js';
import renderFunct from './functions/render.js';

class RightUpperGraphRenderer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            myChart:null,
            currentTab : this.props.currentTab,
            parentTabs : this.props.parentTabs
        };
    }

    componentDidMount() {
        let objectstring = this.state.parentTabs.getNodeAt(this.state.currentTab).objects;
        let ids = this.state.parentTabs.getNodeAt(this.state.currentTab).ids;
        console.log(ids);

        let datasett = [];
            for(let i = 0;i<ids.length;i++)
            {
                let JSONobject = JSON.parse(objectstring[i]);
                let toadd= {
                    label:'Deneme '+(i+1),
                    data:JSONobject.Parameters.Parameter[ids[i]].timestamp,
                    borderColor:
                    [
                        this.random_rgba(),
                        this.random_rgba(),
                        this.random_rgba(),
                        this.random_rgba(),
                        this.random_rgba(),
                        this.random_rgba()
                    ],
                    borderWidth: 3
                };
                datasett.push(toadd);
                console.log(datasett);
            }
        /* FIND THE CHART FROM ITS REF */
        var ctx = this.refs.myGraphCanvas;
        Chart.defaults.global.elements.line.fill = false;
        this.state.myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["0", "1", "2", "3", "4", "5"],
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

                events: ['click'],
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

            }
        });

       // this.state.myChart.data.datasets[0].data[1] = dataset[1];
        this.state.myChart.update();
    }

    componentWillUnmount() {
        if(this.state.myChart)
      this.state.myChart.destroy();
    }
    random_rgba() {
        var o = Math.round, r = Math.random, s = 255;
        return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
    }
    /* CALL  RENDER FUNCTION */
    render() {
        return (
            renderFunct(this.state.currentTab)
        );
    }

}

export default RightUpperGraphRenderer;