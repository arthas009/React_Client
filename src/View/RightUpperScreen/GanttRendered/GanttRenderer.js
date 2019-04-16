import React, {Component} from 'react';
import * as Plotly from "plotly.js";

class GanttRenderer extends Component {
    constructor(props) {
        super(props);
        this.isFirstZoomed = false;

    }
    componentDidMount() {
        let trace1 = {
            x: ['09:30:00', '16:35:00'],
            y: [0, 0],
            marker: {color: 'white'},
            name: '',
            type: 'scatter'
        };
        let trace2 = {
            x: ['10:00:00', '11:22:00'],
            y: [1, 1],
            marker: {color: 'white'},
            name: '',
            type: 'scatter'
        };
        let trace3 = {
            x: ['10:00:00', '12:15:00'],
            y: [2, 2],
            marker: {color: 'white'},
            name: '',
            type: 'scatter'
        };
        let trace4 = {
            x: ['11:15:00', '12:49:00'],
            y: [3, 3],
            marker: {color: 'white'},
            name: '',
            type: 'scatter'
        };
        let trace5 = {
            x: ['10:30:00', '13:56:00'],
            y: [4, 4],
            marker: {color: 'white'},
            name: '',
            type: 'scatter'
        };
        let trace6 = {
            x: ['11:45:00', '15:11:00'],
            y: [5, 5],
            marker: {color: 'white'},
            name: '',
            type: 'scatter'
        };
        let trace7 = {
            x: ['11:45:00', '13:04:00'],
            y: [6, 6],
            marker: {color: 'white'},
            name: '',
            type: 'scatter'
        };
        let trace8 = {
            x: ['12:15:00', '13:30:00'],
            y: [7, 7],
            marker: {color: 'white'},
            name: '',
            type: 'scatter'
        };

        let data = [trace1, trace2, trace3, trace4, trace5, trace6, trace7, trace8];
        let layout = {
            margin: {
                l: 80,
                r: 20,
                b: 50,
                t: 20,
                pad: 3
            },
            height: 400,
            shapes: [
                {
                    fillcolor: 'rgb(0, 0, 0)',
                    line: {width: 0},
                    opacity: 1,
                    type: 'rect',
                    x0: '09:30:00',
                    x1: '16:35:00',
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
                    x0: '10:00:00',
                    x1: '11:22:00',
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
                    x0: '10:00:00',
                    x1: '12:15:00',
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
                    x0: '11:15:00',
                    x1: '12:49:00',
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
                    x0: '10:30:00',
                    x1: '13:56:00',
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
                    x0: '11:45:00',
                    x1: '15:11:00',
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
                    x0: '11:45:00',
                    x1: '13:04:00',
                    xref: 'x',
                    y0: 5.6,
                    y1: 6.4,
                    yref: 'y'
                }
            ],
            title: '',
            width: 1300,
            yaxis: {
                range: [-1, 7],
                showgrid: true,
                ticktext: ['Turbine 2', 'Turbine 4', 'Turbine 10', 'Turbine 11', 'Turbine 20', 'Turbine 27', 'Turbine 16'],
                tickvals: [0, 1, 2, 3, 4, 5, 6],
                zeroline: false,
                fixedrange: true,
                rangemode: 'tozero'
            },
            xaxis:
                {
                    rangemode: 'tozero'
                },
            scrollZoom: true,
        };
        let ctx = this.refs.myGanttCanvas;

        /* WE MUST FREE THE LOCK WHEN PRESSED ON GRAPH TO TRIGGER MULTIPLE EVENTS */
        Plotly.plot(ctx, {
            data: data,
            layout: layout
        }).then( gd => {
            let isMouseDown = false;
            gd.addEventListener('mousedown', () => {
                console.log('mousedown!');
                this.lock = false;
            });
        });

        Plotly.plot(ctx, data, layout);
        let ctx2 = this.refs.myGanttWithNormalCanvas;
        let ctx3 = this.refs.myGanttWithNormalCanvas2;
        /* ZOOMING 2 GRAPH AT THE SAME TIME */
        /* ctx.on('plotly_relayout',
             function(eventdata){

                 /*alert( 'ZOOM!' + '\n\n' +
                     'Event data:' + '\n' +
                     JSON.stringify(eventdata) + '\n\n' +
                     'x-axis start:' + eventdata['xaxis.range[0]'] + '\n' +
                     'x-axis end:' + eventdata['xaxis.range[1]'] );

                     Plotly.relayout(ctx2, 'xaxis.range', [eventdata['xaxis.range[0]'],eventdata['xaxis.range[1]']]);
                     Plotly.relayout(ctx3, 'xaxis.range', [eventdata['xaxis.range[0]'],eventdata['xaxis.range[1]']]);
             });
         */
        let trace111 = {
            x: [1, 2, 3, 4],
            y: [10, 15, 13, 17],
            mode: 'Lines',
            name: 'Lines'
        };

        let trace222 = {
            x: [2, 3, 4, 5],
            y: [16, 5, 11, 9],
            mode: 'lines',
            name: 'Lines'
        };

        let trace333 = {
            x: [1, 2, 3, 4],
            y: [12, 9, 15, 12],
            mode: 'lines+markers',
            name: 'Scatter + Lines'
        };

        let data2 = [trace111];

        let layout2 = {
            margin: {
                l: 55,
                r: 20,
                b: 20,
                t: 20,
                pad: 3
            },
            height: 150,
            yaxis: {
                fixedrange: true,
                rangemode: 'tozero'
            },
            xaxis: {
                rangemode: 'tozero'
            },
            scrollZoom: true
        };


        Plotly.plot(ctx2, data2, layout2, {displayModeBar: false}).then( gd => {
            gd.addEventListener('mousedown', () => {
                console.log('mousedown!');
                this.lock = false;
            });
        });


        let data3 = [trace222];

        let layout3 = {
            margin: {
                l: 55,
                r: 20,
                b: 20,
                t: 20,
                pad: 3
            },
            height: 150,
            yaxis: {
                fixedrange: true,
                rangemode: 'tozero'
            },
            scrollZoom: true,
            xaxis: {
                rangemode: 'tozero'
            }
        };



        Plotly.plot(ctx3, data3, layout3, {displayModeBar: false}).then( gd => {
            gd.addEventListener('mousedown', () => {
                console.log('mousedown!');
                this.lock = false;
            });
        });

        var plots = [ctx, ctx2, ctx3];
        plots.forEach(div => {
            div.on("plotly_relayout", function (ed) {
                this.zoomAll(ed, plots);
            }.bind(this));
        });

    }
    zoomAll = (ed, divs) => {
            if(this.lock)
                return;
            divs.forEach((div, i) => {
               this.lock = true;
                    let x = div.layout.xaxis;
                    if (ed["xaxis.autorange"] && x.autorange) return;
                    if (
                        x.range[0] != ed["xaxis.range[0]"] &&
                        x.range[1] != ed["xaxis.range[1]"]
                    )
                        Plotly.relayout(div, ed);
            });

    };
     sleep = (time) => {
        return new Promise((resolve) => setTimeout(resolve, time));
    };
    randomRgb = () => {
        var num = Math.round(0xffffff * Math.random());
        var r = num >> 16;
        var g = num >> 8 & 255;
        var b = num & 255;
        return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    };
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
        let ctx = this.refs.myGanttCanvas;
        let ctx2 = this.refs.myGanttWithNormalCanvas;
            /* I'm using relayout() shows only an area with an interval */
            Plotly.relayout(ctx, 'xaxis.range', [0,4]);
            Plotly.relayout(ctx2, 'xaxis.range', [0,4]);

    };
    internalInputOnChange = (e) =>
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
    };
    render()
    {
     return (
         <div>
             <table className="granttGraphsTable">
                 <tbody>
                 <tr>
                     <td>ASDASD</td>
                     <div ref="myGanttCanvas" id="myGanttCanvas">
                     </div>
                 </tr>

                 <tr>
                     <td>ASDASD</td>
                     <div ref="myGanttWithNormalCanvas" id="myGanttWithNormalCanvas">
                     </div>
                 </tr>
                 <tr>
                     <td>ASDASD</td>
                     <div ref="myGanttWithNormalCanvas2" id="myGanttWithNormalCanvas2">
                     </div>
                 </tr>
                 </tbody>
             </table>




         <input id="intervalsHourMin"   className="intervals"   pattern="[0-9]*" onChange={(e) =>this.internalInputOnChange(e)}/>
         <input id="intervalsMinuteMin" className="intervals"   pattern="[0-9]*" onChange={(e) =>this.internalInputOnChange(e)}/>
         <input id="intervalsSecondMin" className="intervals"   pattern="[0-9]*" onChange={(e) =>this.internalInputOnChange(e)}/>
         <p>-</p>
         <input id="intervalsHourMax"   className="intervals"   pattern="[0-9]*" onChange={(e) =>this.internalInputOnChange(e)}/>
         <input id="intervalsMinuteMax" className="intervals"   pattern="[0-9]*" onChange={(e) =>this.internalInputOnChange(e)}/>
         <input id="intervalsSecondMax" className="intervals"   pattern="[0-9]*" onChange={(e) =>this.internalInputOnChange(e)}/>

         <button id="setIntervals" onClick = {() => this.setIntervals()}>Ayarla</button>

     </div>);
    }
}

export default GanttRenderer;