import React from 'react';


export default function renderFunc(currentTab)
{

    return(
        <div className="sidenav">
                <canvas ref="myGraphCanvas" id="myGraphCanvas"></canvas>
        </div>
    );
}