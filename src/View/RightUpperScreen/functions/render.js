import React from "react";

export default function renderFunc (createInfoComps,drop,allowDrop){

    //CREATE THE TABLE OF DRAGGED ID's
    let table_to_add = createInfoComps();
    return(
        <div class="sidenav">
            <p>  Sonuçlar </p>
            <hr />
            <div id="droppingDivision" onDrop={(e)=>drop(e)} onDragOver={(e)=>allowDrop(e)}> - - - - - | Eklemek istediğiniz itemleri buraya sürükleyiniz | - - - - -
                <hr />
                <table className="table table-striped table-bordered table-resizable tables_ui" id="t_draggable1">
                    <tbody className="t_sortable">
                    <tr>
                        <th>Remove</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Year</th>
                        <th>Price</th>
                    </tr>
                    {table_to_add}
                    </tbody>
                </table>
            </div>
        </div>
    );
}