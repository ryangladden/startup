import React from 'react';
import { Button, Form } from 'react-bootstrap'
import CollaboratorCard from './CollaboratorCard';

export default function Collaborators({enableChat}) {

    async function addCollaborator() {
        const formElements = document.forms['collabRequest'].elements;
        console.log(formElements);
        console.log(formElements.collaborator.value)
        response = await fetch("/api/share/request", {
            method: "put",
            body: JSON.stringify({email: formElements.collaborator.value}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
    }

    return (
    <aside>
    <h3>Your Collaborators</h3>
    <CollaboratorCard collaborator='Joe Mama' enableChat={enableChat}/>
    <CollaboratorCard collaborator='Ryan Gladden' enableChat={enableChat}/>
    <CollaboratorCard collaborator='Catherine de Burg' enableChat={enableChat}/>
    <CollaboratorCard collaborator='Captain Jack Sparrow' enableChat={enableChat}/>
    <Form name="collabRequest">
        <Form.Label>Add Collaborator by Email</Form.Label>
        <Form.Control type="email" name="collaborator" />
            <br/>
        <Button className="btn btn-primary" onClick={addCollaborator}>Add Collaborator</Button>
    </Form>
    </aside>
    )
}