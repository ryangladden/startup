import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


export default function DocCard(props) {
    const { cover, title, author, date, id } = props.data;
    const metadata = {}

    return (
    <Card>
        <Link to={'/docs/' + id}>
            <Card.Img variant="top" src={cover} className='card-img' style={{ height: '200px', objectFit: 'cover' }} />
        </Link>
        <Card.Body>
            <Card.Title style={{fontSize: 17}}>{title}</Card.Title>
            <Card.Text style={{fontSize: 15}}>Author: {author}</Card.Text>
            <Card.Text style={{fontSize: 15}}>{date}</Card.Text>
            <Card.Link to="/doc-viewer">View</Card.Link>
            <Card.Link to="/sharing">Share</Card.Link>
        </Card.Body>
    </Card>
    );
}