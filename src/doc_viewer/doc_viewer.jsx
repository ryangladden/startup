import React from 'react';
import './doc_viewer.css';
import { Dropdown, Card, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { key } from './key.json';


const placeholder = {
    title: "Loading...",
    author: "",
    location: "",
    date: "",
    tags: [""]
}

export function DocViewer() {

        const [collabList, setCollabList] = React.useState([])
    
        React.useEffect(() => {
            async function getCollabs() {
            const collaborators = await getCollaborators()
            console.log(collaborators)
            setCollabList(collaborators);
            }
            getCollabs();
        }, [])
    
        async function getCollaborators() {
            const response = await fetch("/api/share/collaborators", {
                method: "get"
            })
            return await response.json();
        }

    const navigate = useNavigate();

    const { id } = useParams();
    const [metadata, setMetadata] = React.useState(placeholder)
    const [inHistory, setInHistory] = React.useState({year: "", text: ""})
    

    React.useEffect( () => {
        async function fetchData() {
            const response = await fetch(`/api/docs/${id}`, {
                method: "get",
            })
            const data = await response.json();
            console.log(data);
            setMetadata(data);
        }
        fetchData();
    }, [])

    React.useEffect( () => {
        async function fetchData() {
            const date = new Date(metadata.date);
            let month = String(date.getMonth() + 1).padStart(2,'0');
            let day = String(date.getDate()).padStart(2,'0');
            let url = `https://en.wikipedia.org/api/rest_v1/feed/onthisday/all/${month}/${day}`;
            console.log(url);
            const response = await fetch(url, {
                method: "get",
            })
            const data = await response.json();
            const years = data.selected.map((event) => event.year)
            console.log(years)
            if (data.selected[0]) {
                setInHistory({year: data.selected[1].year, text: data.selected[1].text})
            } else {
                setInHistory("No historical events for this day.")
            }
        }
        if (metadata.date) {
        fetchData();
        }
    }, [metadata])

    async function shareDoc(email) {
        const response = await fetch("/api/docs/share", {
            method: "put",
            body: JSON.stringify({
                id: _id,
                email: email
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
    }

  return (
    <main className='container-fluid'>
      <span style={{display: "flex", flexDirection: "row", gap: "15px"}} id="return">
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>
                Return to list
            </button>
            {metadata.role !== "owner" && <Dropdown>
                <Dropdown.Toggle>Share with...</Dropdown.Toggle>
                <Dropdown.Menu>
                {collabList.map((collaborator) => (<Dropdown.Item onClick={() => shareDoc(collaborator.email)} value={collaborator.email}>{collaborator.email}</Dropdown.Item>))}
                </Dropdown.Menu>
            </Dropdown>}
            {metadata.role === "owner" && <p className="text-muted">{metadata.owner} shared this document with you.</p>}
        </span>
        <div className="doc-data container-fluid">
            <div className="viewer">
                <iframe type="pdf" src={metadata.key} width="95%" height="95%"></iframe>
            </div>
            <div className="sidebar">
                <div className="doc-title">
                    <h2>{metadata.title}</h2>
                </div>
                <div className="metadata">
                    <div className="date">
                        <img src="/calendar.svg" width="30"/>
                        <p>{new Date(metadata.date).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}</p>
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
                            {metadata.tags.map((tag) => <Button style={{margin: "3px"}} variant={'warning'}>{tag}</Button>)}
                    </div>
                      <Card>
                        <Card.Header>
                        <Card.Title>In History - {inHistory.year}</Card.Title>
                        </Card.Header>
                        <Card.Body><Card.Text>{inHistory.text}</Card.Text></Card.Body>
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