import React from 'react';

export default function bringValues(parameters,drag,mousedown,mousehover,onDoubleClick) {

    // BRING ALL XML TAGS's VALUES AND FLUSH THEM TO table ARRAY
    let table = [];
    for (let i = 0; i < parameters.length; i++) {
        let children = [];
        children.push(<td onDoubleClick={(e) => onDoubleClick(e)} onMouseEnter={(e) => mousehover(e)} onMouseDown={(e)=>mousedown(e,"OuterTD")}><div onMouseDown={(e)=>mousedown(e,"InnerDiv")} draggable="true" onDragStart={(e) => drag(e, i)}>{i+1}</div></td>);
        for (let j = 0; j < 1; j++) {
            children.push(
                <td><div onMouseDown={(e)=>mousedown(e)} draggable="true" onDragStart={(e) => drag(e, i)}>{parameters[i].parameter1}</div></td>,
                <td><div onMouseDown={(e)=>mousedown(e)} draggable="true" onDragStart={(e) => drag(e, i)}>{parameters[i].definition}</div></td>
            );
        }
        table.push(<tr>{children}</tr>);
    }
    return table;
}