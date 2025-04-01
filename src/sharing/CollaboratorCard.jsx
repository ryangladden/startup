import React from 'react';
import {Card, Button, Dropdown} from 'react-bootstrap'

export default function CollaboratorCard({collaborator, enableChat}) {
    return (
        <Card>
        <Card.Body>
            <Card.Title>{collaborator.name}</Card.Title>
            <Card.Subtitle className="text-muted">{collaborator.email}</Card.Subtitle>
        </Card.Body>
        <Card.Footer style={{display: "flex", flexDirection: "row", gap:"20px"}}>
            <Button style={{margin: "1px"}}value={collaborator} onClick={enableChat}>Message</Button>
                <Dropdown>
                    <Dropdown.Toggle>Share doc</Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>Item</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
        </Card.Footer>
    </Card>
    )
}