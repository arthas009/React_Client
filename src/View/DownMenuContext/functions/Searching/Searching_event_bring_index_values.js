import React from 'react';


export default function bringIndexValues (found_indexes, parameters, drag,mousedown,mousehover,onDoubleClick)
{
    let table = [];
    for (let i = 0; i < found_indexes.length; i++) // WE HAVE ALREADY FOUND OUR PATTERNS INDEX, NOW BRING THEM TO SCREEN
    {
        let children = [];
        children.push(<td onDoubleClick={(e) => onDoubleClick(e)} onMouseEnter={(e) => mousehover(e)} onMouseDown={(e)=>mousedown(e,"OuterTD")}><div onMouseDown={(e)=>mousedown(e,"InnerDiv")} draggable="true" onDragStart={(e) => drag(e, i)}>{found_indexes[i]+1}</div></td>
        );
        // PUSH 2 TAG VALUE TO TABLE
        for (let j = 0; j <1; j++) {
            children.push(
                <td><div onMouseDown={(e)=>mousedown(e)} draggable="true" onDragStart={(e) => drag(e, i)}>{parameters[found_indexes[i]].parameter1}</div></td>,
                <td><div onMouseDown={(e)=>mousedown(e)} draggable="true" onDragStart={(e) => drag(e, i)}>{parameters[found_indexes[i]].definition}</div></td>)
        }
        table.push(<tr>{children}</tr>)
    }
    return table;
}
