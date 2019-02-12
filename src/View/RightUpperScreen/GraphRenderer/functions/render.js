import React from 'react';


export default function renderFunc(currentTab)
{

    return(
        <div className="sidenav">
            <div id="graphDivision">
                <h1> Sekme {currentTab}</h1>
            </div>

            <div id="canvasDivision">
                <canvas ref="myGraphCanvas" id="myGraphCanvas"></canvas>
            </div>
        </div>
    );
}