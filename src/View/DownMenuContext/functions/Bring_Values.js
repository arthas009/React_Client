import React from 'react';

export default function bringValues(parameters,drag,mousehover,mousedown) {

    // BRING ALL XML TAGS's VALUES AND FLUSH THEM TO table ARRAY
    let table = [];
    for (let i = 0; i < parameters.length; i++) {
        let children = [];
        children.push(<td><div  draggable="true" onDragStart={(e) => drag(e, i)}>{i+1}</div></td>);
        for (let j = 0; j < 1; j++) {
            children.push(
                <td><div draggable="true" onDragStart={(e) => drag(e, i)}>{parameters[i].parameter1}</div></td>,
                <td><div draggable="true" onDragStart={(e) => drag(e, i)}>{parameters[i].definition}</div></td>
            );
        }
        table.push(<tr>{children}</tr>);
    }
    return table;
}