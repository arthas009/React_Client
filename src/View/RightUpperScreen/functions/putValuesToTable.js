import React from "react";


export default function putValuesToTable(currentids,books,remove)
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
                children.push(<td> {books[currentids[i]].title} </td>);
                children.push(<td> {books[currentids[i]].author} </td>);
                children.push(<td> {books[currentids[i]].year} </td>);
                children.push(<td> {books[currentids[i]].price} </td>);
                table.push(<tr>{children}</tr>);
            }
        }

return table;
}