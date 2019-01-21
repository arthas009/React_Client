import React from 'react';


export default function bringIndexValues (found_indexes, parameters, drag)
{
    let table = [];
    for (let i = 0; i < found_indexes.length; i++) // WE HAVE ALREADY FOUND OUR PATTERNS INDEX, NOW BRING THEM TO SCREEN
    {
        let children = [];
        children.push(<td id="first" draggable="true" onDragStart={(e) => drag(e, i)}>
                <button id="dragButton" draggable="true" onDragStart={(e) => drag(e, i)} width="25"
                        height="69">Sürükle
                </button>
            </td>
        );
        // PUSH 2 TAG VALUE TO TABLE
        for (let j = 0; j <1; j++) {
            children.push(
               <td>{parameters[found_indexes[i]].parameter1}</td>,<td>{parameters[found_indexes[i]].definition}</td>)
        }
        table.push(<tr>{children}</tr>)
    }
    return table;
}
