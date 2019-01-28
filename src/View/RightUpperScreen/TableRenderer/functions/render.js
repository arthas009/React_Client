import React from "react";

export default function renderFunc (createInfoComps,drop,allowDrop){

    //CREATE THE TABLE OF DRAGGED ID's
    let table_to_add = createInfoComps();
    return(
        <div class="sidenav">
            <p>  Sonuçlar </p>
            <div id="droppingDivision" onDrop={(e)=>drop(e)} onDragOver={(e)=>allowDrop(e)}>
                <table className="table table-striped table-bordered table-resizable tables_ui" id="t_draggable1">
                    <tbody className="t_sortable">
                    <tr>
                        <th>Remove</th>
                        <th>Parameter1</th>
                        <th>Parameter2</th>
                        <th>Parameter3</th>
                        <th>Parameter4</th>
                        <th>Definition</th>
                        <th>MinValue</th>
                        <th>MaxValue</th>
                    </tr>
                    {table_to_add}
                    </tbody>
                </table>
            </div>
        </div>
    );
}