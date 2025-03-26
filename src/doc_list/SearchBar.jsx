import React from 'react';

export default function SearchBar({upload}) {

    function openModal() {
        upload();
    }


    return (
        <div className="doc-list-header">
            <h3>{localStorage.getItem('currentUser')}'s Documents</h3>
            {/* <input type="text" onChange={filterSearch} className="form-control search-input" placeholder="search by author, document title" />
            <button className="btn btn-secondary">Search</button> */}
            <button className= 'btn btn-secondary' onClick={openModal}>Upload new Document</button>
        </div>
    );
}