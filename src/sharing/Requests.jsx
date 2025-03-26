import React from 'react';
import { Form, Button } from 'react-bootstrap'
import RequestCard from './RequestCard';

export default function Requests() {

    const [requests, setRequests] = React.useState([])

    async function getRequests() {
        const response = await fetch("/api/share/request", {
            method: "get"
        })
        const json = await response.json();
        console.log(Array.isArray(json));
        setRequests(json);
    }

    React.useEffect(() => {
        getRequests()
    }, [])

    async function sendRequest() {
        const formElements = document.forms['sendRequest'].elements;
        console.log(formElements.email.value);
        const response = await fetch("/api/share/request", {
            method: "put",
            body: JSON.stringify({
                email: formElements.email.value
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        console.log(await response.json())
    }

    return (
        <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
            <div style={{flex: "1"}}>
                {requests.length === 0 ? (<p>No requests</p>) : (requests.map((req, i) => (<RequestCard key={i} reload={() => getRequests()} request={req} />)))}
            </div>
            <div className="sticky-bottom" style={{flex: "0"}}>
                <Form name='sendRequest'>
                    <Form.Label>Invite someone to be a collaborator</Form.Label>
                    <Form.Control type="email" name="email" placeholder="email"/>
                    <br/>
                    <Button type="submit" onClick={()=>sendRequest()}>Send Request</Button>
                </Form>
            </div>
        </div>
    )
}