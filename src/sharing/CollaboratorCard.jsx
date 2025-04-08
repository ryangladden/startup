import React from 'react';
import {Card, Button, Dropdown} from 'react-bootstrap'

export default function CollaboratorCard({collaborator, enableChat, activeNotifications, documents}) {

    // const [hasNotification, setHasNotification] = React.useState(false);

    // React.useEffect(() => {
    //     if (activeNotifications.includes(collaborator.email)) {
    //         setHasNotification(true);
    //     }
    // }, [activeNotifications])

    function setChat() {
        enableChat();
        activeNotifications[collaborator.email] = false;
    }

    async function shareDoc(id, email) {
        const response = await fetch("/api/docs/share", {
            method: "put",
            body: JSON.stringify({
                id: id,
                email: email
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
    }

    return (
        <Card>
        <Card.Body>
            <Card.Title>{collaborator.name}</Card.Title>
            <Card.Subtitle className="text-muted">{collaborator.email}</Card.Subtitle>
        </Card.Body>
        <Card.Footer style={{display: "flex", flexDirection: "row", gap:"20px"}}>
            <Button variant={activeNotifications[collaborator.email] ? "danger" : "primary"} style={{margin: "1px"}}value={collaborator} onClick={() => setChat()}>{activeNotifications[collaborator.email] ? "See New Messages" : " Send a Message "}</Button>
                <Dropdown>
                    <Dropdown.Toggle>Share doc</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {documents.map((doc) => (
                            <Dropdown.Item key={doc._id} onClick={() => {shareDoc(doc._id, collaborator.email)}}>{doc.title}</Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
        </Card.Footer>
    </Card>
    )
}