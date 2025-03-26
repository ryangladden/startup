import React from 'react';
import { Button, Form } from 'react-bootstrap'
import CollaboratorCard from './CollaboratorCard';

export default function Collaborators({enableChat}) {

    const [collaborators, setCollaborators] = React.useState([])

    async function getCollaborators() {
        const response = await fetch("/api/share/collaborators", {
            method: "get"
        })
        return response;
    }

    React.useEffect(() => {
        async function fetchData() {
            const response = await getCollaborators();
            const collaborators = await response.json();

            console.log(collaborators)
            setCollaborators(collaborators);
        }
        fetchData();
    }, [])

    return (
    <div>
    <h3>Your Collaborators</h3>
    {collaborators.length === 0 ? (<><br/><p style={{fontStyle: 'italic'}} className="text-muted">You have no collaborators. Start sharing by adding collaborators in the Requests tab.</p></>) : collaborators.map((collaborator, index) => (<CollaboratorCard key={index} collaborator={collaborator.name} enableChat={enableChat} />))}
    {/* <CollaboratorCard collaborator='Joe Mama' enableChat={enableChat}/>
    <CollaboratorCard collaborator='Ryan Gladden' enableChat={enableChat}/>
    <CollaboratorCard collaborator='Catherine de Burg' enableChat={enableChat}/>
    <CollaboratorCard collaborator='Captain Jack Sparrow' enableChat={enableChat}/> */}
    </div>
    )
}