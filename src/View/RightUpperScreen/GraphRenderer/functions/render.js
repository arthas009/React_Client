import React from 'react';


export default function renderFunc(currentTab,intervalInputOnChange,setIntervals,startFloating,stopFloating,onDrop,allowDrop)
{

    return(
        <div className="sidenav">
            <div onDrop={(e) => onDrop(e)} onDragOver={(e)=>allowDrop(e)} ref="myGraphCanvas" id="myGraphCanvas"> </div>

            <p id="totalIntervals">Aralıklar (HH - MM - ss)</p>

            <input id="intervalsHourMin"   className="intervals"   pattern="[0-9]*" onChange={(e) =>intervalInputOnChange(e)}/>
            <input id="intervalsMinuteMin" className="intervals"   pattern="[0-9]*" onChange={(e) =>intervalInputOnChange(e)}/>
            <input id="intervalsSecondMin" className="intervals"   pattern="[0-9]*" onChange={(e) =>intervalInputOnChange(e)}/>
            <p>-</p>
            <input id="intervalsHourMax"   className="intervals"   pattern="[0-9]*" onChange={(e) =>intervalInputOnChange(e)}/>
            <input id="intervalsMinuteMax" className="intervals"   pattern="[0-9]*" onChange={(e) =>intervalInputOnChange(e)}/>
            <input id="intervalsSecondMax" className="intervals"   pattern="[0-9]*" onChange={(e) =>intervalInputOnChange(e)}/>

            <button id="setIntervals" onClick = {() => setIntervals()}>Ayarla</button>

            <button ref ="startFloating" id="startFloating" onClick = {() => startFloating()}>Start</button>
            <button ref ="stopFloating" id="stopFloating" onClick = {() => stopFloating()}>Stop</button>


        </div>
    );
}