import React from 'react';
import { Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

export default function RequestCard({ request, reload }) {
        const navigate = useNavigate();
        const [showCard, setShowCard] = React.useState(true)

        async function respondRequest(accept, email) {
            const response = await fetch("/api/share/request", {
                method: "post",
                body: JSON.stringify({
                    accept: accept,
                    email: email
                    }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    }
                }
            )
            setShowCard(false)
            if (accept) {
                navigate("/docs");
            }
        }
    return (<>
        {showCard &&
        (<Card>
            <Card.Body>
                <Card.Title style={{fontSize: "12pt"}}>{request.name}</Card.Title>
                <Card.Subtitle style={{fontSize: "10pt"}}>({request.email})</Card.Subtitle>
                <Card.Text style={{fontSize: "10pt"}} className='text-muted'>sent a collaboration request</Card.Text>
                <Button style={{fontSize: "12pt"}} onClick={() => respondRequest(true, request.email)}>Accept</Button>
                <Button  style={{fontSize: "12pt"}}onClick={() => respondRequest(false, request.email)}>Deny</Button>
            </Card.Body>
        </Card>)
        }
        </>
    )
}