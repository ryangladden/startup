import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


export default function DocCard(props) {
    const { cover, title, author, date, _id } = props.data;
    const metadata = {}

    function formatDate(date) {
        var formatted = new Date(date);
        return `${formatted.getDate()} ${formatted.getMont()} ${formatted.getFullYear()}`
    }

    // async function shareDoc(e) {
    //     const response = await fetch("/api/docs/share", {
    //         method: "put",
    //         body: {
    //             id: _id,
    //             user:
    //         }
    //     })
    // }

    return (
    <Card>
        <Link to={'/docs/' + _id}>
            <Card.Img variant="top" src={cover} className='card-img' style={{ height: '200px', objectFit: 'cover' }} />
        </Link>
        <Card.Body>
            <Card.Title style={{fontSize: 17}}>{title}</Card.Title>
            <Card.Text style={{fontSize: 15}}>Author: {author}</Card.Text>
            <Card.Text style={{fontSize: 15}}>{formatDate(date)}</Card.Text>
            <Card.Link to={'/docs/' + _id}>View</Card.Link>
            <Card.Link to="/sharing">Share</Card.Link>
        </Card.Body>
    </Card>
    );
}