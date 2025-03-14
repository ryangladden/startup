import React from 'react';
import './doc_viewer.css';
import Card from 'react-bootstrap/Card';
import { useParams } from 'react-router-dom';
import { key } from './key.json';

const placeholder = {
    title: "Loading...",
    author: "",
    location: "",
    date: "",
    tags: [""]
}

export function DocViewer() {

    const { id } = useParams();
    const [metadata, setMetadata] = React.useState(placeholder)
    const [inHistory, setInHistory] = React.useState("Loading...")

    React.useEffect( () => {
        async function fetchData() {
            const response = await fetch(`/api/docs/${id}`, {
                method: "get",
            })
            const data = await response.json();
            setMetadata(data);
        }
        fetchData();
    }, [])

    React.useEffect( () => {
        async function fetchData() {
            const date = new Date(metadata.date);
            console.log(date.getFullYear())
            console.log(date.getDate())
            console.log(date.getMonth())
            const response = await fetch(`https://api.api-ninjas.com/v1/historicalevents?day=${date.getDate() + 1}&month=${date.getMonth() + 1}&year=${date.getFullYear()}`, {
                method: "get",
                headers: {
                    'X-Api-Key': key
                }

            })
            const data = await response.json();
            if (data[0]) {
                setInHistory(data[0].event)
            } else {
                setInHistory("No historical events for this day.")
            }
        }
        if (metadata.date) {
        fetchData();
        }
    }, [metadata])

  return (
    <main className='container-fluid'>
      <span id="return">
            <button className="btn btn-primary">
                Return to list
            </button>
        </span>
        <div className="doc-data container-fluid">
            <div className="viewer">
                <iframe type="pdf" src={`/api/docs/${id}/file`} width="95%" height="95%"></iframe>
            </div>
            <div className="sidebar">
                <div className="doc-title">
                    <h2>{metadata.title}</h2>
                </div>
                <div className="metadata">
                    <div className="date">
                        <img src="/calendar.svg" width="30"/>
                        <p>{metadata.date}</p>
                    </div>
                    <div className="date">
                        <img src="/map.svg" width="30"/>
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
                      <Card>
                        <Card.Header>
                        <Card.Title>In History</Card.Title>
                        </Card.Header>
                        <Card.Body><Card.Text>{inHistory}</Card.Text></Card.Body>
                      </Card>
                </div>
                {/* <div className="activity">
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
                </div> */}
            </div>
        </div>
    </main>
  );
}