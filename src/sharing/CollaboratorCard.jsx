import React from 'react';
import {Card, Button} from 'react-bootstrap'

export default function CollaboratorCard({collaborator, enableChat}) {
    return (
        <Card>
        <Card.Body>
            <Card.Title>{collaborator}</Card.Title>
            <Button value={collaborator} onClick={enableChat}>Send a message</Button>
            <Button>Share a document</Button>
        </Card.Body>
    </Card>
    )
}