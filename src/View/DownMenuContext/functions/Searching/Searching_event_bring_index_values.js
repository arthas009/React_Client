import React from 'react';


export default function bringIndexValues (found_indexes, parameters, drag)
{
    let table = [];
    for (let i = 0; i < found_indexes.length; i++) // WE HAVE ALREADY FOUND OUR PATTERNS INDEX, NOW BRING THEM TO SCREEN
    {
        let children = [];
        children.push(<td><div draggable="true" onDragStart={(e) => drag(e, i)}>{i+1}</div></td>
        );
        // PUSH 2 TAG VALUE TO TABLE
        for (let j = 0; j <1; j++) {
            children.push(
                <td><div draggable="true" onDragStart={(e) => drag(e, i)}>{parameters[found_indexes[i]].parameter1}</div></td>,
                <td><div draggable="true" onDragStart={(e) => drag(e, i)}>{parameters[found_indexes[i]].definition}</div></td>)
        }
        table.push(<tr>{children}</tr>)
    }
    return table;
}
