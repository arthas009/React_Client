import React from 'react';


export default function renderFunc(currentTab,intervalInputOnChange,setIntervals,resetGraph,startFloating,stopFloating,changeColors)
{

    return(
        <div className="sidenav">
            <canvas ref="myGraphCanvas" id="myGraphCanvas" />

            <p id="totalIntervals">Aralıklar (Min-Max)</p>
            <input id="intervalsMin" pattern="[0-9]*" onChange={(e) =>intervalInputOnChange(e)}/>
            <input id="intervalsMax" pattern="[0-9]*" onChange={(e) =>intervalInputOnChange(e)}/>
            <button id="setIntervals" onClick = {() => setIntervals()}>Ayarla</button>
            <button id="resetGraph" onClick = {() => resetGraph()}>Reset zoom</button>

            <button ref ="startFloating" id="startFloating" onClick = {() => startFloating()}>Start</button>
            <button ref ="stopFloating" id="stopFloating" onClick = {() => stopFloating()}>Stop</button>

            <button ref ="changeColors" id="changeColors" onClick = {() => changeColors()}>Change Colors</button>

        </div>
    );
}