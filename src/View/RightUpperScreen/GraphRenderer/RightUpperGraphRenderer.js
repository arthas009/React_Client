import React, {Component} from 'react';
import Chart from 'chart.js';
import renderFunct from './functions/render.js';

class RightUpperGraphRenderer extends Component {
    constructor(props) {
        super(props);

        this.state = {myChart:null};
    }

    componentDidMount() {
        var dataset = [-1000, 200, 400, 1000, 1200, 2550,180];
        /* FIND THE CHART FROM ITS REF */
        var ctx = this.refs.myGraphCanvas;
        this.state.myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange","Black"],
                datasets: [{
                    label: 'Deneme',
                    data: dataset,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(0, 0, 0, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(0, 0, 0, 1)'
                    ],
                    borderWidth: 3
                }]
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
                    display: false,
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

        this.state.myChart.data.datasets[0].data[4] = ++dataset[4];
        this.state.myChart.update();
    }

    componentWillUnmount() {
        this.state.myChart.destroy();
    }

    /* CALL  RENDER FUNCTION */
    render() {
        return (
            renderFunct()
        );
    }

}

export default RightUpperGraphRenderer;