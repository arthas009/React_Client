import React from 'react';


export default function renderFunc(currentTab)
{

    return(
        <div className="sidenav">
        <h1> Sekme {currentTab}</h1>

                <canvas ref="myGraphCanvas" id="myGraphCanvas"></canvas>
        </div>
    );
}