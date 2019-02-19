import React from 'react';


export default function renderFunc(currentTab,intervalInputOnChange,setIntervals)
{

    return(
        <div className="sidenav">
            <canvas ref="myGraphCanvas" id="myGraphCanvas" />
            <p id="totalIntervals">Aralık sayısı</p>
            <input id="intervals" pattern="[0-9]*" onChange={(e) =>intervalInputOnChange(e)}/>
            <button id="setIntervals" onClick = {() => setIntervals}>Ayarla</button>
        </div>
    );
}