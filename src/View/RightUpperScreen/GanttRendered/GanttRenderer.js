import React, {Component} from 'react';
import * as Plotly from "plotly.js";

class GanttRenderer extends Component {
    constructor(props) {
        super(props);


    }
    componentDidMount()
    {
        let trace1 = {
            x: ['2017-05-09 09:30:00', '2017-05-09 16:35:00'],
            y: [0, 0],
            marker: {color: 'white'},
            name: '',
            type: 'scatter'
        };
        let trace2 = {
            x: ['2017-05-09 10:00:00', '2017-05-09 11:22:00'],
            y: [1, 1],
            marker: {color: 'white'},
            name: '',
            type: 'scatter'
        };
        let trace3 = {
            x: ['2017-05-09 10:00:00', '2017-05-09 12:15:00'],
            y: [2, 2],
            marker: {color: 'white'},
            name: '',
            type: 'scatter'
        };
        let trace4 = {
            x: ['2017-05-09 11:15:00', '2017-05-09 12:49:00'],
            y: [3, 3],
            marker: {color: 'white'},
            name: '',
            type: 'scatter'
        };
        let trace5 = {
            x: ['2017-05-09 10:30:00', '2017-05-09 13:56:00'],
            y: [4, 4],
            marker: {color: 'white'},
            name: '',
            type: 'scatter'
        };
        let trace6 = {
            x: ['2017-05-09 11:45:00', '2017-05-09 15:11:00'],
            y: [5, 5],
            marker: {color: 'white'},
            name: '',
            type: 'scatter'
        };
        let trace7 = {
            x: ['2017-05-09 11:45:00', '2017-05-09 13:04:00'],
            y: [6, 6],
            marker: {color: 'white'},
            name: '',
            type: 'scatter'
        };
        let trace8 = {
            x: ['2017-05-09 12:15:00', '2017-05-09 13:30:00'],
            y: [7, 7],
            marker: {color: 'white'},
            name: '',
            type: 'scatter'
        };
        let trace9 = {
            x: ['2017-05-09 12:30:00', '2017-05-09 12:54:00'],
            y: [8, 8],
            marker: {color: 'white'},
            name: '',
            type: 'scatter'
        };
        let trace10 = {
            x: ['2017-05-09 12:45:00', '2017-05-09 17:55:00'],
            y: [9, 9],
            marker: {color: 'white'},
            name: '',
            type: 'scatter'
        };
        let trace11 = {
            x: ['2017-05-09 15:15:00', '2017-05-09 18:25:00'],
            y: [10, 10],
            marker: {color: 'white'},
            name: '',
            type: 'scatter'
        };
        let trace12 = {
            x: ['2017-05-09 15:15:00', '2017-05-09 15:15:00'],
            y: [0, 0],
            hoverinfo: 'none',
            marker: {
                color: 'rgb(0, 0, 0)',
                size: 1
            },
            name: 'Boat_1',
            showlegend: true,
            type: 'scatter'
        };
        let trace13 = {
            x: ['2017-05-09 15:15:00', '2017-05-09 15:15:00'],
            y: [1, 1],
            hoverinfo: 'none',
            marker: {
                color: 'rgb(139, 0, 0)',
                size: 1
            },
            name: 'Boat_2',
            showlegend: true,
            type: 'scatter'
        };
        let  data = [trace1, trace2, trace3, trace4, trace5, trace6, trace7, trace8, trace9, trace10, trace11, trace12, trace13];
        let layout = {
            height: 600,
            hovermode: 'closest',
            shapes: [
                {
                    fillcolor: 'rgb(0, 0, 0)',
                    line: {width: 0},
                    opacity: 1,
                    type: 'rect',
                    x0: '2017-05-09 09:30:00',
                    x1: '2017-05-09 16:35:00',
                    xref: 'x',
                    y0: -0.4,
                    y1: 0.4,
                    yref: 'y'
                },
                {
                    fillcolor: 'rgb(139, 0, 0)',
                    line: {width: 0},
                    opacity: 1,
                    type: 'rect',
                    x0: '2017-05-09 10:00:00',
                    x1: '2017-05-09 11:22:00',
                    xref: 'x',
                    y0: 0.6,
                    y1: 1.4,
                    yref: 'y'
                },
                {
                    fillcolor: 'rgb(0, 0, 0)',
                    line: {width: 0},
                    opacity: 1,
                    type: 'rect',
                    x0: '2017-05-09 10:00:00',
                    x1: '2017-05-09 12:15:00',
                    xref: 'x',
                    y0: 1.6,
                    y1: 2.4,
                    yref: 'y'
                },
                {
                    fillcolor: 'rgb(0, 0, 0)',
                    line: {width: 0},
                    opacity: 1,
                    type: 'rect',
                    x0: '2017-05-09 11:15:00',
                    x1: '2017-05-09 12:49:00',
                    xref: 'x',
                    y0: 2.6,
                    y1: 3.4,
                    yref: 'y'
                },
                {
                    fillcolor: 'rgb(139, 0, 0)',
                    line: {width: 0},
                    opacity: 1,
                    type: 'rect',
                    x0: '2017-05-09 10:30:00',
                    x1: '2017-05-09 13:56:00',
                    xref: 'x',
                    y0: 3.6,
                    y1: 4.4,
                    yref: 'y'
                },
                {
                    fillcolor: 'rgb(139, 0, 0)',
                    line: {width: 0},
                    opacity: 1,
                    type: 'rect',
                    x0: '2017-05-09 11:45:00',
                    x1: '2017-05-09 15:11:00',
                    xref: 'x',
                    y0: 4.6,
                    y1: 5.4,
                    yref: 'y'
                },
                {
                    fillcolor: 'rgb(0, 0, 0)',
                    line: {width: 0},
                    opacity: 1,
                    type: 'rect',
                    x0: '2017-05-09 11:45:00',
                    x1: '2017-05-09 13:04:00',
                    xref: 'x',
                    y0: 5.6,
                    y1: 6.4,
                    yref: 'y'
                },
                {
                    fillcolor: 'rgb(0, 0, 0)',
                    line: {width: 0},
                    opacity: 1,
                    type: 'rect',
                    x0: '2017-05-09 12:15:00',
                    x1: '2017-05-09 13:30:00',
                    xref: 'x',
                    y0: 6.6,
                    y1: 7.4,
                    yref: 'y'
                },
                {
                    fillcolor: 'rgb(139, 0, 0)',
                    line: {width: 0},
                    opacity: 1,
                    type: 'rect',
                    x0: '2017-05-09 12:30:00',
                    x1: '2017-05-09 12:54:00',
                    xref: 'x',
                    y0: 7.6,
                    y1: 8.4,
                    yref: 'y'
                },
                {
                    fillcolor: 'rgb(0, 0, 0)',
                    line: {width: 0},
                    opacity: 1,
                    type: 'rect',
                    x0: '2017-05-09 12:45:00',
                    x1: '2017-05-09 17:55:00',
                    xref: 'x',
                    y0: 8.6,
                    y1: 9.4,
                    yref: 'y'
                },
                {
                    fillcolor: 'rgb(0, 0, 0)',
                    line: {width: 0},
                    opacity: 1,
                    type: 'rect',
                    x0: '2017-05-09 15:15:00',
                    x1: '2017-05-09 18:25:00',
                    xref: 'x',
                    y0: 9.6,
                    y1: 10.4,
                    yref: 'y'
                }
            ],
            showlegend: true,
            title: 'Gantt Chart',
            width: 900,
            xaxis: {
                rangeselector: {buttons: [
                        {
                            count: 7,
                            label: '1w',
                            step: 'day',
                            stepmode: 'backward'
                        },
                        {
                            count: 1,
                            label: '1m',
                            step: 'month',
                            stepmode: 'backward'
                        },
                        {
                            count: 6,
                            label: '6m',
                            step: 'month',
                            stepmode: 'backward'
                        },
                        {
                            count: 1,
                            label: 'YTD',
                            step: 'year',
                            stepmode: 'todate'
                        },
                        {
                            count: 1,
                            label: '1y',
                            step: 'year',
                            stepmode: 'backward'
                        },
                        {step: 'all'}
                    ]},
                showgrid: true,
                type: 'date',
                zeroline: false
            },
            yaxis: {
                autorange: false,
                range: [-1, 12],
                showgrid: true,
                ticktext: ['Turbine 2', 'Turbine 4', 'Turbine 10', 'Turbine 11', 'Turbine 20', 'Turbine 27', 'Turbine 16', 'Turbine 23', 'Turbine 15', 'Turbine 6', 'Turbine 12'],
                tickvals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                zeroline: false
            }
        };
        let ctx = this.refs.myGraphCanvas;
        Plotly.plot(ctx, {
            data: data,
            layout: layout
        });
    }

    render()
    {
     return (<div>
         <div ref="myGraphCanvas" id="myGraphCanvas"> </div>
     </div>);
    }
}

export default GanttRenderer;