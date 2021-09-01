import React from "react"

export const GlobalFilter = ({ filter, setFilter }) => {
    return (
        <div id="globalFilter" className="input-group mb3 justify-content-md-center">
            <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">Search</span>
            </div>
            <input value={filter || ""} onChange={e => setFilter(e.target.value)} />
        </div>
    )
}