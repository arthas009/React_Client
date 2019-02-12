import React from 'react';


export default function renderFunc(createTable,readxmlfunc,search)
{

    return(
        <div className="sidenav">
            {/*   <input className="FileChooserInput" type='file' accept='text/xml' onChange={readxmlfunc}/><br/> -->*/}
            <p> Arama </p>
            <label className="search" htmlFor="inpt_search">
            <input id="inpt_search" type="text" name="input" ref="searchInput" onChange={(e) => search(e)}/>
            </label>
            <table className="table table-striped table-bordered table-resizable tables_ui" id="t_draggable1">
                <tbody className="t_sortable">
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Source</th>
                </tr>
                {createTable()}
                </tbody>
            </table>
        </div>
    );
}