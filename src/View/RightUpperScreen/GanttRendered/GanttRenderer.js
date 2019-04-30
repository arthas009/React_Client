import React, {Component} from 'react';
import * as Plotly from "plotly.js";

class GanttRenderer extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        /* GANNTLAR */
       this.startPlotting();
    }
    startPlotting = () =>
    {
        let indirmeBaslangic = this.refs.indirmeBaslangicGannt;
        let manevra = this.refs.manevraGannt;
        let goruntuBaslangic = this.refs.goruntulemeBaslangicGannt;
        let goruntuleme = this.refs.goruntulemeGannt;
        let goruntulemeBitis = this.refs.goruntulemeBitisGannt;
        let manevraOto = this.refs.manevraOtoGannt;
        let goruntuIndirme = this.refs.goruntuIndirmeGannt;
        let goruntuSilme = this.refs.goruntuSilmeGannt;
        let indirmeBitis = this.refs.indirmeBitisGannt;
        let dtoBir = this.refs.dtoBirGannt;
        let dloSabitYerIstasyonu = this.refs.dloSabitYerIstasyonuGannt;
        let yerIstasyonuIletisimZamanlari = this.refs.yerIstasyonuIletisimZamanlariGannt;
        let gunesIsigiUygunsuzlukAraligi = this.refs.gunesIsigiUygunsuzlukAraligiGannt;
        let gorevYukuElverisizlikPenceresi = this.refs.gorevYukuElverissizlikPenceresiGannt;
        let pilGerilim = this.refs.pilGerilimGannt;
        let pilDOD = this.refs.pilDODGannt;
        let gorevYuku = this.refs.gorevYukuGannt;
        let veriDepolama = this.refs.veriDepolamaGannt;

        // console.log("asd"+goruntulemeBitis);

        let data = [];
        let indirmeBaslangicLayout = {
            margin: {
                l: 20,
                r: 20,
                b: 20,
                t:0,
                pad: 3
            },
            height: 50,
            shapes: [
                {
                    fillcolor: 'rgb(0, 0, 0)',
                    line: {width: 0},
                    opacity: 1,
                    type: 'rect',
                    x0: 1,
                    x1: 5,
                    xref: 'x',
                    y0: -1,
                    y1: 1,
                    yref: 'y'
                }
            ],
            width: 1300,
            yaxis: {
                range: [-1, 1],
                showgrid: true,
                //ticktext: ['Turbine 2', 'Turbine 4', 'Turbine 10', 'Turbine 11', 'Turbine 20', 'Turbine 27', 'Turbine 16'],
                //ticktext:[""],
                tickvals: [],
                zeroline: false,
                fixedrange: true,
                rangemode: 'tozero'
            },
            xaxis:
                {
                    rangemode: 'tozero',
                    range:[0,12]
                },
            scrollZoom: true,
        };
        let manevraHedefLayout = {
            margin: {
                l: 20,
                r: 20,
                b: 20,
                t:0,
                pad: 3
            },
            height: 50,
            shapes: [
                {
                    fillcolor: 'rgb(0, 0, 0)',
                    line: {width: 0},
                    opacity: 1,
                    type: 'rect',
                    x0: 2,
                    x1: 3,
                    xref: 'x',
                    y0: -1,
                    y1: 1,
                    yref: 'y'
                }
            ],
            width: 1300,
            yaxis: {
                range: [-1, 1],
                showgrid: true,
                //ticktext: ['Turbine 2', 'Turbine 4', 'Turbine 10', 'Turbine 11', 'Turbine 20', 'Turbine 27', 'Turbine 16'],
                //ticktext:[""],
                tickvals: [],
                zeroline: false,
                fixedrange: true,
                rangemode: 'tozero'
            },
            xaxis:
                {
                    rangemode: 'tozero',
                    range:[0,12]
                },
            scrollZoom: true,
        };
        let goruntulemeBaslangicLayout = {
            margin: {
                l: 20,
                r: 20,
                b: 20,
                t:0,
                pad: 3
            },
            height: 50,
            shapes: [
                {
                    fillcolor: 'rgb(0, 0, 0)',
                    line: {width: 0},
                    opacity: 1,
                    type: 'rect',
                    x0: 0,
                    x1: 3,
                    xref: 'x',
                    y0: -1,
                    y1: 1,
                    yref: 'y'
                }
            ],
            width: 1300,
            yaxis: {
                range: [-1, 1],
                showgrid: true,
                //ticktext: ['Turbine 2', 'Turbine 4', 'Turbine 10', 'Turbine 11', 'Turbine 20', 'Turbine 27', 'Turbine 16'],
                //ticktext:[""],
                tickvals: [],
                zeroline: false,
                fixedrange: true,
                rangemode: 'tozero'
            },
            xaxis:
                {
                    rangemode: 'tozero',
                    range:[0,12]
                },
            scrollZoom: true,
        };
        let goruntulemeLayout = {
            margin: {
                l: 20,
                r: 20,
                b: 20,
                t:0,
                pad: 3
            },
            height: 50,
            shapes: [
                {
                    fillcolor: 'rgb(0, 0, 0)',
                    line: {width: 0},
                    opacity: 1,
                    type: 'rect',
                    x0: 0,
                    x1: 4,
                    xref: 'x',
                    y0: -1,
                    y1: 1,
                    yref: 'y'
                }
            ],
            width: 1300,
            yaxis: {
                range: [-1, 1],
                showgrid: true,
                //ticktext: ['Turbine 2', 'Turbine 4', 'Turbine 10', 'Turbine 11', 'Turbine 20', 'Turbine 27', 'Turbine 16'],
                //ticktext:[""],
                tickvals: [],
                zeroline: false,
                fixedrange: true,
                rangemode: 'tozero'
            },
            xaxis:
                {
                    rangemode: 'tozero',
                    range:[0,12]
                },
            scrollZoom: true,
        };
        let goruntulemeBitisLayout = {
            margin: {
                l: 20,
                r: 20,
                b: 20,
                t:0,
                pad: 3
            },
            height: 50,
            shapes: [
                {
                    fillcolor: 'rgb(0, 0, 0)',
                    line: {width: 0},
                    opacity: 1,
                    type: 'rect',
                    x0: 0,
                    x1: 6,
                    xref: 'x',
                    y0: -1,
                    y1: 1,
                    yref: 'y'
                }
            ],
            width: 1300,
            yaxis: {
                range: [-1, 1],
                showgrid: true,
                //ticktext: ['Turbine 2', 'Turbine 4', 'Turbine 10', 'Turbine 11', 'Turbine 20', 'Turbine 27', 'Turbine 16'],
                //ticktext:[""],
                tickvals: [],
                zeroline: false,
                fixedrange: true,
                rangemode: 'tozero'
            },
            xaxis:
                {
                    rangemode: 'tozero',
                    range:[0,12]
                },
            scrollZoom: true,
        };
        let manevraOtoLayout = {
            margin: {
                l: 20,
                r: 20,
                b: 20,
                t:0,
                pad: 3
            },
            height: 50,
            shapes: [
                {
                    fillcolor: 'rgb(0, 0, 0)',
                    line: {width: 0},
                    opacity: 1,
                    type: 'rect',
                    x0: 8,
                    x1: 11,
                    xref: 'x',
                    y0: -1,
                    y1: 1,
                    yref: 'y'
                }
            ],
            width: 1300,
            yaxis: {
                range: [-1, 1],
                showgrid: true,
                //ticktext: ['Turbine 2', 'Turbine 4', 'Turbine 10', 'Turbine 11', 'Turbine 20', 'Turbine 27', 'Turbine 16'],
                //ticktext:[""],
                tickvals: [],
                zeroline: false,
                fixedrange: true,
                rangemode: 'tozero'
            },
            xaxis:
                {
                    rangemode: 'tozero',
                    range:[0,12]
                },
            scrollZoom: true,
        };
        let goruntuIndirmeLayout = {
            margin: {
                l: 20,
                r: 20,
                b: 20,
                t:0,
                pad: 3
            },
            height: 50,
            shapes: [
                {
                    fillcolor: 'rgb(0, 0, 0)',
                    line: {width: 0},
                    opacity: 1,
                    type: 'rect',
                    x0: 4,
                    x1: 10,
                    xref: 'x',
                    y0: -1,
                    y1: 1,
                    yref: 'y'
                }
            ],
            width: 1300,
            yaxis: {
                range: [-1, 1],
                showgrid: true,
                //ticktext: ['Turbine 2', 'Turbine 4', 'Turbine 10', 'Turbine 11', 'Turbine 20', 'Turbine 27', 'Turbine 16'],
                //ticktext:[""],
                tickvals: [],
                zeroline: false,
                fixedrange: true,
                rangemode: 'tozero'
            },
            xaxis:
                {
                    rangemode: 'tozero',
                    range:[0,12]
                },
            scrollZoom: true,
        };
        let goruntuSilmeLayout = {
            margin: {
                l: 20,
                r: 20,
                b: 20,
                t:0,
                pad: 3
            },
            height: 50,
            shapes: [
                {
                    fillcolor: 'rgb(0, 0, 0)',
                    line: {width: 0},
                    opacity: 1,
                    type: 'rect',
                    x0: 6,
                    x1: 12,
                    xref: 'x',
                    y0: -1,
                    y1: 1,
                    yref: 'y'
                }
            ],
            width: 1300,
            yaxis: {
                range: [-1, 1],
                showgrid: true,
                //ticktext: ['Turbine 2', 'Turbine 4', 'Turbine 10', 'Turbine 11', 'Turbine 20', 'Turbine 27', 'Turbine 16'],
                //ticktext:[""],
                tickvals: [],
                zeroline: false,
                fixedrange: true,
                rangemode: 'tozero'
            },
            xaxis:
                {
                    rangemode: 'tozero',
                    range:[0,12]
                },
            scrollZoom: true,
        };
        let indirmeBitisLayout = {
            margin: {
                l: 20,
                r: 20,
                b: 20,
                t:0,
                pad: 3
            },
            height: 50,
            shapes: [
                {
                    fillcolor: 'rgb(0, 0, 0)',
                    line: {width: 0},
                    opacity: 1,
                    type: 'rect',
                    x0: 7,
                    x1: 8,
                    xref: 'x',
                    y0: -1,
                    y1: 1,
                    yref: 'y'
                }
            ],
            width: 1300,
            yaxis: {
                range: [-1, 1],
                showgrid: true,
                //ticktext: ['Turbine 2', 'Turbine 4', 'Turbine 10', 'Turbine 11', 'Turbine 20', 'Turbine 27', 'Turbine 16'],
                //ticktext:[""],
                tickvals: [],
                zeroline: false,
                fixedrange: true,
                rangemode: 'tozero'
            },
            xaxis:
                {
                    rangemode: 'tozero',
                    range:[0,12]
                },
            scrollZoom: true,
        };
        let dtoBirLayout = {
            margin: {
                l: 20,
                r: 20,
                b: 20,
                t:0,
                pad: 3
            },
            height: 50,
            shapes: [
                {
                    fillcolor: 'rgb(0, 0, 0)',
                    line: {width: 0},
                    opacity: 1,
                    type: 'rect',
                    x0: 4,
                    x1: 11,
                    xref: 'x',
                    y0: -1,
                    y1: 1,
                    yref: 'y'
                }
            ],
            width: 1300,
            yaxis: {
                range: [-1, 1],
                showgrid: true,
                //ticktext: ['Turbine 2', 'Turbine 4', 'Turbine 10', 'Turbine 11', 'Turbine 20', 'Turbine 27', 'Turbine 16'],
                //ticktext:[""],
                tickvals: [],
                zeroline: false,
                fixedrange: true,
                rangemode: 'tozero'
            },
            xaxis:
                {
                    rangemode: 'tozero',
                    range:[0,12]
                },
            scrollZoom: true,
        };
        let dloSabitYerIstasyonuLayout = {
            margin: {
                l: 20,
                r: 20,
                b: 20,
                t:0,
                pad: 3
            },
            height: 50,
            shapes: [
                {
                    fillcolor: 'rgb(0, 0, 0)',
                    line: {width: 0},
                    opacity: 1,
                    type: 'rect',
                    x0: 5,
                    x1: 8,
                    xref: 'x',
                    y0: -1,
                    y1: 1,
                    yref: 'y'
                }
            ],
            width: 1300,
            yaxis: {
                range: [-1, 1],
                showgrid: true,
                //ticktext: ['Turbine 2', 'Turbine 4', 'Turbine 10', 'Turbine 11', 'Turbine 20', 'Turbine 27', 'Turbine 16'],
                //ticktext:[""],
                tickvals: [],
                zeroline: false,
                fixedrange: true,
                rangemode: 'tozero'
            },
            xaxis:
                {
                    rangemode: 'tozero',
                    range:[0,12]
                },
            scrollZoom: true,
        };
        let yerIstasyonlarıIletisimZamanlariLayout = {
            margin: {
                l: 20,
                r: 20,
                b: 20,
                t:0,
                pad: 3
            },
            height: 50,
            shapes: [
                {
                    fillcolor: 'rgb(0, 0, 0)',
                    line: {width: 0},
                    opacity: 1,
                    type: 'rect',
                    x0: 1,
                    x1: 7,
                    xref: 'x',
                    y0: -1,
                    y1: 1,
                    yref: 'y'
                }
            ],
            width: 1300,
            yaxis: {
                range: [-1, 1],
                showgrid: true,
                //ticktext: ['Turbine 2', 'Turbine 4', 'Turbine 10', 'Turbine 11', 'Turbine 20', 'Turbine 27', 'Turbine 16'],
                //ticktext:[""],
                tickvals: [],
                zeroline: false,
                fixedrange: true,
                rangemode: 'tozero'
            },
            xaxis:
                {
                    rangemode: 'tozero',
                    range:[0,12]
                },
            scrollZoom: true,
        };
        let gunesIsigiUygunsuzlukAraligiLayout = {
            margin: {
                l: 20,
                r: 20,
                b: 20,
                t:0,
                pad: 3
            },
            height: 50,
            shapes: [
                {
                    fillcolor: 'rgb(0, 0, 0)',
                    line: {width: 0},
                    opacity: 1,
                    type: 'rect',
                    x0: 2,
                    x1: 8,
                    xref: 'x',
                    y0: -1,
                    y1: 1,
                    yref: 'y'
                }
            ],
            width: 1300,
            yaxis: {
                range: [-1, 1],
                showgrid: true,
                //ticktext: ['Turbine 2', 'Turbine 4', 'Turbine 10', 'Turbine 11', 'Turbine 20', 'Turbine 27', 'Turbine 16'],
                //ticktext:[""],
                tickvals: [],
                zeroline: false,
                fixedrange: true,
                rangemode: 'tozero'
            },
            xaxis:
                {
                    rangemode: 'tozero',
                    range:[0,12]
                },
            scrollZoom: true,
        };
        let gorevYukuElverissizlikPenceresi = {
            margin: {
                l: 20,
                r: 20,
                b: 20,
                t:0,
                pad: 3
            },
            height: 50,
            shapes: [
                {
                    fillcolor: 'rgb(0, 0, 0)',
                    line: {width: 0},
                    opacity: 1,
                    type: 'rect',
                    x0: 4,
                    x1: 6,
                    xref: 'x',
                    y0: -1,
                    y1: 1,
                    yref: 'y'
                }
            ],
            width: 1300,
            yaxis: {
                range: [-1, 1],
                showgrid: true,
                tickvals: [],
                zeroline: false,
                fixedrange: true,
                rangemode: 'tozero'
            },
            xaxis:
                {
                    rangemode: 'tozero',
                    range:[0,12]
                },
            scrollZoom: true,
        };






        /* WE MUST FREE THE LOCK WHEN PRESSED ON GRAPH TO TRIGGER MULTIPLE EVENTS */
        Plotly.plot(indirmeBaslangic, data, indirmeBaslangicLayout,
            {
                doubleClick: false,
                modeBarButtonsToRemove: ['autoScale2d']
            }).then( gd => {
            let isMouseDown = false;
            gd.addEventListener('mousedown', () => {
                console.log('mousedown!');
                this.lock = false;
            });
        });
        Plotly.plot(manevra, data, manevraHedefLayout,
            {
                displayModeBar: false,
                doubleClick: false
            }).then( gd => {
            gd.addEventListener('mousedown', () => {
                this.lock = false;
            });
        });
        Plotly.plot(goruntuBaslangic, data, goruntulemeBaslangicLayout,
            {
                displayModeBar: false,
                doubleClick: false
            }).then( gd => {
            gd.addEventListener('mousedown', () => {
                this.lock = false;
            });
        });
        Plotly.plot(goruntuleme, data, goruntulemeLayout,
            {
                displayModeBar: false,
                doubleClick: false
            }).then( gd => {
            let isMouseDown = false;
            gd.addEventListener('mousedown', () => {
                console.log('mousedown!');
                this.lock = false;
            });
        });
        Plotly.plot(goruntulemeBitis, data, goruntulemeBitisLayout,
            {
                displayModeBar: false,
                doubleClick: false
            }).then( gd => {
            let isMouseDown = false;
            gd.addEventListener('mousedown', () => {
                console.log('mousedown!');
                this.lock = false;
            });
        });
        Plotly.plot(manevraOto, data, manevraOtoLayout,
            {
                displayModeBar: false,
                doubleClick: false
            }).then( gd => {
            let isMouseDown = false;
            gd.addEventListener('mousedown', () => {
                console.log('mousedown!');
                this.lock = false;
            });
        });


        Plotly.plot(goruntuIndirme, data, goruntuIndirmeLayout,
            {
                displayModeBar: false,
                doubleClick: false
            }).then( gd => {
            let isMouseDown = false;
            gd.addEventListener('mousedown', () => {
                console.log('mousedown!');
                this.lock = false;
            });
        });
        Plotly.plot(goruntuSilme, data, goruntuSilmeLayout,
            {
                displayModeBar: false,
                doubleClick: false
            }).then( gd => {
            let isMouseDown = false;
            gd.addEventListener('mousedown', () => {
                console.log('mousedown!');
                this.lock = false;
            });
        });
        Plotly.plot(indirmeBitis, data, indirmeBitisLayout,
            {
                displayModeBar: false,
                doubleClick: false
            }).then( gd => {
            let isMouseDown = false;
            gd.addEventListener('mousedown', () => {
                console.log('mousedown!');
                this.lock = false;
            });
        });
        Plotly.plot(dtoBir, data, dtoBirLayout,
            {
                displayModeBar: false,
                doubleClick: false
            }).then( gd => {
            let isMouseDown = false;
            gd.addEventListener('mousedown', () => {
                console.log('mousedown!');
                this.lock = false;
            });
        });
        Plotly.plot(dloSabitYerIstasyonu, data, dloSabitYerIstasyonuLayout,
            {
                displayModeBar: false,
                doubleClick: false
            }).then( gd => {
            let isMouseDown = false;
            gd.addEventListener('mousedown', () => {
                console.log('mousedown!');
                this.lock = false;
            });
        });
        Plotly.plot(yerIstasyonuIletisimZamanlari, data, yerIstasyonlarıIletisimZamanlariLayout,
            {
                displayModeBar: false,
                doubleClick: false
            }).then( gd => {
            let isMouseDown = false;
            gd.addEventListener('mousedown', () => {
                console.log('mousedown!');
                this.lock = false;
            });
        });
        Plotly.plot(gunesIsigiUygunsuzlukAraligi, data, gunesIsigiUygunsuzlukAraligiLayout,
            {
                displayModeBar: false,
                doubleClick: false
            }).then( gd => {
            let isMouseDown = false;
            gd.addEventListener('mousedown', () => {
                console.log('mousedown!');
                this.lock = false;
            });
        });
        Plotly.plot(gorevYukuElverisizlikPenceresi, data, gorevYukuElverissizlikPenceresi,
            {
                displayModeBar: false,
                doubleClick: false
            }).then( gd => {
            let isMouseDown = false;
            gd.addEventListener('mousedown', () => {
                console.log('mousedown!');
                this.lock = false;
            });
        });

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
            x: [1, 2, 3, 4,5,6,7,8,9,10],
            y: [10, 15, 13, 17,33,44,77,12,54,566],
            mode: 'Lines',
            name: 'Lines'
        };

        let trace222 = {
            x: [1, 2, 3, 4,5,6,7,8,9,10],
            y: [16, 5, 11, 922,44,665,232,123,766,933],
            mode: 'lines',
            name: 'Lines'
        };

        let trace333 = {
            x: [1, 2, 3, 4,5,6,7,8,9,10],
            y: [1,1,1,1,1,1,0,1,1,0],
            mode: 'lines+markers',
            name: 'Scatter + Lines'
        };

        let trace444 = {
            x: [1, 2, 3, 4,5,6,7,8,9,10],
            y: [155,443, 15, 122,444,123,646,234,984,165],
            mode: 'lines+markers',
            name: 'Scatter + Lines'
        };
        let data2 = [trace111];

        let layout2 = {
            margin: {
                l: 20,
                r: 20,
                b: 20,
                t:0,
                pad: 3
            },
            height: 50,
            yaxis: {
                tickvals: [],
                fixedrange: true,
                rangemode: 'tozero'
            },
            xaxis: {
                rangemode: 'tozero',
                range:[0,12]
            },
            scrollZoom: true
        };


        Plotly.plot(pilGerilim, data2, layout2, {
            displayModeBar: false,
            doubleClick: false
        }).then( gd => {
            gd.addEventListener('mousedown', () => {
                console.log('mousedown!');
                this.lock = false;
            });
        });


        let data3 = [trace222];

        let layout3 = {
            margin: {
                l: 20,
                r: 20,
                b: 20,
                t:0,
                pad: 3
            },
            height: 50,
            yaxis: {
                tickvals: [],
                fixedrange: true,
                rangemode: 'tozero'

            },
            scrollZoom: true,
            xaxis: {
                rangemode: 'tozero',
                range:[0,12]
            }
        };

        let layout4 = {
            margin: {
                l: 20,
                r: 20,
                b: 20,
                t:0,
                pad: 3
            },
            height: 50,
            yaxis: {
                tickvals: [],
                fixedrange: true,
                rangemode: 'tozero'

            },
            scrollZoom: true,
            xaxis: {
                rangemode: 'tozero',
                range:[0,12]
            }
        };
        let layout5 = {
            margin: {
                l: 20,
                r: 20,
                b: 20,
                t:0,
                pad: 3
            },
            height: 50,
            yaxis: {
                tickvals: [],
                fixedrange: true,
                rangemode: 'tozero'

            },
            scrollZoom: true,
            xaxis: {
                rangemode: 'tozero',
                range:[0,12]
            }
        };
        let data4= [trace333];

        let data5 = [trace444];

        Plotly.plot(pilDOD, data3, layout3, {
            displayModeBar: false,
            doubleClick: false
        }).then( gd => {
            gd.addEventListener('mousedown', () => {
                console.log('mousedown!');
                this.lock = false;
            });
        });

        Plotly.plot(gorevYuku, data4, layout4, {
            displayModeBar: false,
            doubleClick: false
        }).then( gd => {
            gd.addEventListener('mousedown', () => {
                console.log('mousedown!');
                this.lock = false;
            });
        });
        Plotly.plot(veriDepolama, data5, layout5, {
            displayModeBar: false,
            doubleClick: false
        }).then( gd => {
            gd.addEventListener('mousedown', () => {
                console.log('mousedown!');
                this.lock = false;
            });
        });
        let plots = [indirmeBaslangic,manevra, goruntuBaslangic,goruntuleme,goruntulemeBitis,
            manevraOto,goruntuIndirme, goruntuSilme,indirmeBitis,dtoBir,dloSabitYerIstasyonu,
            yerIstasyonuIletisimZamanlari,gunesIsigiUygunsuzlukAraligi,gorevYukuElverisizlikPenceresi,pilGerilim, pilDOD,gorevYuku,veriDepolama];

        plots.forEach(div => {
            div.on("plotly_relayout", function (ed) {
                this.zoomAll(ed, plots);
            }.bind(this));
        });

    };
    zoomAll = (ed, divs, number) => {
           if(this.lock)
               return;

            this.lock = true;
            divs.forEach((div, i) => {
                    let x = div.layout.xaxis;
                    //if (ed["xaxis.autorange"] && x.autorange) return;
                    if (x.range[0] != ed["xaxis.range[0]"] && x.range[1] != ed["xaxis.range[1]"])
                        Plotly.relayout(div, ed);

            });
    };
    randomRgb = () => {
        var num = Math.round(0xffffff * Math.random());
        var r = num >> 16;
        var g = num >> 8 & 255;
        var b = num & 255;
        return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    };

    render()
    {
     return (
         <div>
             <table className="granttGraphsTable">
                 <tbody>
                 <tr>
                     <td>İndirme Başlangıç</td>
                     <td><div ref="indirmeBaslangicGannt" id="indirmeBaslangicGannt">
                 </div></td>
                 </tr>
                 <tr>
                     <td>Manevra</td>
                     <td><div ref="manevraGannt" id="manevraGannt">
                 </div></td>
                 </tr>
                 <tr>
                     <td>Görüntüleme Başlangıç</td>
                     <td><div ref="goruntulemeBaslangicGannt" id="goruntulemeBaslangicGannt">
                 </div></td>
                  </tr>
                 <tr>
                     <td>Görüntüleme</td>
                     <td><div ref="goruntulemeGannt" id="goruntulemeGannt">
                 </div></td>
                 </tr>
                 <tr>
                     <td>Görüntüleme Bitiş</td>
                     <td><div ref="goruntulemeBitisGannt" id="goruntulemeBitiscGannt">
                 </div></td>
                 </tr>
                 <tr>
                     <td>Manevra(Auto)</td>
                     <td><div ref="manevraOtoGannt" id="manevraOtoGannt">
                 </div></td>
                 </tr>
                 <tr>
                     <td>Görüntü İndirme</td>
                     <td><div ref="goruntuIndirmeGannt" id="goruntuIndirmeGannt">
                     </div></td>
                 </tr>
                 <tr>
                     <td>Görüntü Silme</td>
                     <td><div ref="goruntuSilmeGannt" id="goruntuSilmeGannt">
                     </div></td>
                 </tr>
                 <tr>
                     <td>İndirme Bitiş</td>
                     <td><div ref="indirmeBitisGannt" id="indirmeBitisGannt">
                 </div></td>
                 </tr>
                 <tr>
                     <td>DTO-1</td>
                     <td><div ref="dtoBirGannt" id="dtoBirGannt">
                     </div></td>
                 </tr>
                 <tr>
                     <td>DLO Sabit Yer İstasyonu</td>
                     <td><div ref="dloSabitYerIstasyonuGannt" id="dloSabitYerIstasyonuGannt">
                     </div></td>
                     </tr>
                 <tr>
                     <td>Yer İstasyonu İletişim Zamanları</td>
                     <td><div ref="yerIstasyonuIletisimZamanlariGannt" id="yerIstasyonuIletisimZamanlariGannt">
                     </div></td>
                 </tr>
                 <tr>
                     <td>Güneş Işığı Uygunsuzluk Aralığı</td>
                     <td><div ref="gunesIsigiUygunsuzlukAraligiGannt" id="gunesIsigiUygunsuzlukAraligiGannt">
                     </div></td>
                 </tr>
                 <tr>
                     <td>Görev Yükü Elverişsizlik Penceresi</td>
                     <td><div ref="gorevYukuElverissizlikPenceresiGannt" id="gorevYukuElverissizlikPenceresiGannt">
                     </div></td>
                 </tr>
                 <tr>
                     <td>Pil(Gerilim)</td>
                     <td><div ref="pilGerilimGannt" id="pilGerilimGannt">
                     </div></td>
                 </tr>
                 <tr>
                     <td>Pil(DOD%)</td>
                     <td><div ref="pilDODGannt" id="pilDODGannt">
                     </div></td>
                 </tr>
                  <tr>
                     <td>Görev Yükü</td>
                     <div ref="gorevYukuGannt" id="gorevYukuGannt">
                     </div>
                 </tr>
                 <tr>
                     <td>Veri Depolama</td>
                     <div ref="veriDepolamaGannt" id="veriDepolamaGannt">
                     </div>
                 </tr>
                 </tbody>
             </table>


     </div>);
    }
}

export default GanttRenderer;