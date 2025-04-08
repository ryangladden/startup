import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownItem, DropdownToggle } from 'react-bootstrap';


export default function DocCard(props) {
    const { cover, title, author, date, _id, role } = props.data;

    function formatDate(date) {
        return new Date(date).toLocaleDateString();
    }

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

    React.useEffect(() => {
        console.log(props);
    }, [])

    return (
    <Card>
        <Link to={'/docs/' + _id}>
            <Card.Img variant="top" src={cover} className='card-img' style={{ height: '200px', objectFit: 'cover' }} />
        </Link>
        <Card.Body>
            <Card.Title style={{fontSize: 17}}>{title}</Card.Title>
            <Card.Text style={{fontSize: 15}}>Author: {author}</Card.Text>
            <Card.Text style={{fontSize: 15}}>{new Date(date).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}</Card.Text>
            <br/>
            {/* <p>{role}</p> */}
            {/* <Card.Link to="/sharing">Share</Card.Link> */}
            {role === "owner" ? <Dropdown>
                <Dropdown.Toggle>Share with...</Dropdown.Toggle>
                <Dropdown.Menu>
                {props.collaborators.map((collaborator) => (<Dropdown.Item onClick={() => shareDoc(collaborator.email)} value={collaborator.email}>{collaborator.email}</Dropdown.Item>))}
                </Dropdown.Menu>
            </Dropdown> : <Card.Text style={{fontSize: "14px"}}className="text-muted">Shared with you</Card.Text>}
        </Card.Body>
    </Card>
    );
}