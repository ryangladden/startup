import React from 'react';
import './doc_viewer.css';
import Card from 'react-bootstrap/Card';

export function DocViewer({ metadata, document }) {

  return (
    <main className='container-fluid'>
      <span id="return">
            <button className="btn btn-primary">
                Return to list
            </button>
        </span>
        <div className="doc-data container-fluid">
            <div className="viewer">
                <iframe type="pdf" src="example.pdf" width="95%" height="95%"></iframe>
            </div>
            <div className="sidebar">
                <div className="doc-title">
                    <h2>{metadata.title}</h2>
                </div>
                <div className="metadata">
                    <div className="date">
                        <img src="calendar.svg" width="30"/>
                        <p>{metadata.date}</p>
                    </div>
                    <div className="date">
                        <img src="map.svg" width="30"/>
                        <p>{metadata.location}</p>
                    </div>
                    <div className="people">
                        <h4>People</h4>
                        <p>Author: {metadata.author}</p>
                    </div>
                    <div className="tags">
                        <h4>Tags</h4>
                            {metadata.tags.map((tag) => <button>{tag}</button>)}
                    </div>
                    <div className="in-history card card-body">
                      <Card>
                        <Card.Title>In History</Card.Title>
                      </Card>
                        <h5 className="card-title">In History:</h5>
                        <p className="card-text">"in history" external API call</p>
                    </div>
                </div>
                <div className="activity">
                    <h4>Activity</h4>
                    <div className="card card-body">
                        <h5 className="card-title"><a href="sharing.html">Joe Mama Collaborator</a></h5>
                        <p className="card-text text-muted">1 Feb 2025</p>
                        <p>Joe Mama Collaborator added tag "mission letter"</p>
                    </div>
                    <div className="card card-body">
                        <h5 className="card-title"><a href="sharing.html">Joe Mama Collaborator</a></h5>
                        <p className="card-text text-muted">27 Jan 2025</p>
                        <p className="card-text">shared this document with you"</p>
                    </div>
                </div>
            </div>
        </div>
    </main>
  );
}