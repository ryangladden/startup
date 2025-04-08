import React from 'react';
import {Card, Button, Dropdown} from 'react-bootstrap'

export default function CollaboratorCard({collaborator, enableChat, activeNotifications}) {

    const [hasNotification, setHasNotification] = React.useState(false);

    React.useEffect(() => {
        if (activeNotifications.includes(collaborator.email)) {
            setHasNotification(true);
        }
    }, [activeNotifications])

    function setChat() {
        enableChat();
        setHasNotification(false);
    }

    return (
        <Card>
        <Card.Body>
            <Card.Title>{collaborator.name}</Card.Title>
            <Card.Subtitle className="text-muted">{collaborator.email}</Card.Subtitle>
        </Card.Body>
        <Card.Footer style={{display: "flex", flexDirection: "row", gap:"20px"}}>
            <Button variant={hasNotification ? "danger" : "primary"} style={{margin: "1px"}}value={collaborator} onClick={() => setChat()}>{hasNotification ? "See New Messages" : " Send a Message "}</Button>
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