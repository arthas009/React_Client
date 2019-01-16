import React from 'react';

export default function bringValues(titles,drag) {

    // BRING ALL XML TAGS's VALUES AND FLUSH THEM TO table ARRAY
    let table = [];
    for (let i = 0; i < titles.length; i++) {
        let children = [];

        // PUSH A DRAG BUTTON TO EACH COLUMNG
        children.push(
            <td id="first" draggable="true" onDragStart={(e) => drag(e, i)}>
                <button
                    ref={"dragbutton"+i} draggable="true" onDragStart={(e) => drag(e, i)} width="25" height="69">Sürükle
                </button>
            </td>
        );
        for (let j = 0; j < 2; j++) {
            children.push(
                <td>{titles[i].childNodes[0].nodeValue}</td>
            );
        }
        table.push(<tr>{children}</tr>);
    }
    return table;
}