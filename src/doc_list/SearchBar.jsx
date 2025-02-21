import React from 'react';

export default function SearchBar() {
    return (
        <div className="doc-list-header">
            <h3>Username's Documents</h3>
            <input type="text" className="form-control search-input" placeholder="search by author, document type, date..." />
            <button className="btn btn-secondary">Search</button>
        </div>
    );
}