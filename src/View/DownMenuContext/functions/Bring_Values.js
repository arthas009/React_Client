import React from 'react';

export default function bringValues(books,drag) {

    // BRING ALL XML TAGS's VALUES AND FLUSH THEM TO table ARRAY
    let table = [];
    for (let i = 0; i < books.length; i++) {
        let children = [];

        // PUSH A DRAG BUTTON TO EACH COLUMNG
        children.push(
            <td id="first" draggable="true" onDragStart={(e) => drag(e, i)}>
                <button
                   id = "dragButton" ref={"dragbutton"+i} draggable="true" onDragStart={(e) => drag(e, i)} width="25" height="69">Sürükle
                </button>
            </td>
        );
        for (let j = 0; j < 2; j++) {
            children.push(
                <td>{books[i].title}</td>
            );
        }
        table.push(<tr>{children}</tr>);
    }
    return table;
}