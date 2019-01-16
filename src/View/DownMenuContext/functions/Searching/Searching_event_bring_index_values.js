import React from 'react';


export default function bringIndexValues (found_indexes, elemanlar, drag)
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
        for (let j = 0; j < 2; j++) {
            children.push(
               <td>{elemanlar[found_indexes[i]].childNodes[0].nodeValue}</td>)
        }
        table.push(<tr>{children}</tr>)
    }
    return table;
}
