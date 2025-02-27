import React from 'react';

export default function SearchBar({upload}) {

    function openModal() {
        upload();
    }

    function filterSearch(e) {
        console.log(e.target.value)
    }

    return (
        <div className="doc-list-header">
            <h3>Username's Documents</h3>
            <input type="text" onChange={filterSearch} className="form-control search-input" placeholder="search by author, document title" />
            <button className="btn btn-secondary">Search</button>
            <button className= 'btn btn-secondary' onClick={openModal}>Upload new Document</button>
        </div>
    );
}