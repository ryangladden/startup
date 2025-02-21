import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const covers = [
    "journal.png",
    "letter.png",
    "letter2.png"
]

const dates = [
    "12 July 1958",
    "29 January 1981",
    "04 March 2000"
]

const names = [
    "Joe Mama",
    "John Doe",
    "Gary E. Stevenson"
]

const titles = [
    "Mission Letter",
    "First day at college journal",
    "Really sad letter"
]

const doc_types = []


export default function DocCard() {

    const date = dates[Math.floor(Math.random() * 3)];
    const name = names[Math.floor(Math.random() * 3)];
    const title = titles[Math.floor(Math.random() * 3)];
    const cover = covers[Math.floor(Math.random() * 3)];

    return (
    <Card>
        <Link to='/doc-viewer'>
            <Card.Img variant="top" src={cover} className='card-img' style={{ height: '200px', objectFit: 'cover' }} />
        </Link>
        <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>Author: {name}</Card.Text>
            <Card.Text>{date}</Card.Text>
            <Card.Link to="/doc-viewer">View</Card.Link>
            <Card.Link to="/sharing">Share</Card.Link>
        </Card.Body>
    </Card>
    );
}