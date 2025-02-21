import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import './doc_list.css'
import CardList from './CardList'

export function DocList() {
    return (
        <main className='container-fluid'>
            <div className="doc-list-header">
                <h3>Username's Documents</h3>
                <input type="text" className="form-control search-input" placeholder="search by author, document type, date..." />
                <button className="btn btn-secondary">Search</button>
            </div>
            <div className="container-fluid doc-list">
                <div className="doc-list-filter">
                    <p>filterstuff</p>
                </div>
                <CardList />
            </div>
        </main>
    );
}