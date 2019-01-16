import React from "react";


export default function putValuesToTable(Tags,currentids,books,remove)
{
    let table = [];
    /*FIND THE INDEX YOU SEEK AND BRING ELEMENTS */
    /* CURRENTIDS HOLDS THE ALL IDS WE BROUGHT TO THE RIGHT UPPER SCREEN */
    for(let i=0 ;i<currentids.length;i++)
    {
        for(let j = 0;j<books.length;j++)
        {
            if (currentids[i] == j)
            {
                let children = [];	 /* SUB CELLS */
                children.push(<td> <button ref={"deletebutton"+i}width="25" height="69" onClick = {() => remove(i)}>   Kaldır	</button></td>)
                children.push(<td> {Tags[0][j]} </td>);
                children.push(<td> {Tags[1][j]} </td>);
                children.push(<td> {Tags[2][j]} </td>);
                children.push(<td> {Tags[3][j]} </td>);
                table.push(<tr>{children}</tr>);
                break;
            }
        }
    }

return table;
}