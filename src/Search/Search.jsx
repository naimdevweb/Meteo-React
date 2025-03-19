import React from "react";
import "./Search.css";

function Search() {
    return (
        <div className="search">
            <input type="text" placeholder="Search" />
            <button type="button">Rechercher</button>
        </div>
    );
}

export default Search;