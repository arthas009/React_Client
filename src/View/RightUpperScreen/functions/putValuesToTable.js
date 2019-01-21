import React from "react";


export default function putValuesToTable(currentids,parameters,remove)
{
    let table = [];
    /*FIND THE INDEX YOU SEEK AND BRING ELEMENTS */
    /* CURRENTIDS HOLDS THE ALL IDS WE BROUGHT TO THE RIGHT UPPER SCREEN */
        for (let i = 0; i < currentids.length; i++) {
            {
                let children = [];	 /* SUB CELLS */
                children.push(<td>
                    <button ref={"deletebutton" + i} width="25" height="69" onClick={() => remove(i)}> Kaldır</button>
                </td>)
                children.push(<td> {parameters[currentids[i]].parameter1} </td>);
                children.push(<td> {parameters[currentids[i]].parameter2} </td>);
                children.push(<td> {parameters[currentids[i]].parameter3} </td>);
                children.push(<td> {parameters[currentids[i]].parameter4} </td>);
                children.push(<td> {parameters[currentids[i]].definition} </td>);
                children.push(<td> {parameters[currentids[i]].minvalue} </td>);
                children.push(<td> {parameters[currentids[i]].maxvalue} </td>);
                table.push(<tr>{children}</tr>);
            }
        }

return table;
}