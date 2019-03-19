import React from 'react';

export default function bringValues(parameters,drag) {

    // BRING ALL XML TAGS's VALUES AND FLUSH THEM TO table ARRAY
    let table = [];
    for (let i = 0; i < parameters.length; i++) {
        let children = [];

        // PUSH A DRAG BUTTON TO EACH COLUMNG
        children.push(
            <td id="first" draggable="true" ref={"tableTd"+i} onDragStart={(e) => drag(e, i)}>
                <button
                   id = "dragButton" ref={"dragbutton"+i} draggable="true" onDragStart={(e) => drag(e, i)}>Sürükle
                </button>
            </td>
        );
        for (let j = 0; j < 1; j++) {
            children.push(
                <td>{parameters[i].parameter1}</td>,
                <td>{parameters[i].definition}</td>
            );
        }
        table.push(<tr>{children}</tr>);
    }
    return table;
}