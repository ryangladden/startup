import React from 'react';
import { Button, Form } from 'react-bootstrap'
import CollaboratorCard from './CollaboratorCard';
import Chat from './Chat';

export default function Collaborators({webSocket}) {

    const [collaborators, setCollaborators] = React.useState([])
    const [showChat, toggleShowChat] = React.useState(false);
    const [chatPartner, setChatPartner] = React.useState("");

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
        {!showChat && <h3>Your Collaborators</h3>}
        {showChat ? 
        (<Chat hideChat={() => toggleShowChat(false)} webSocket={webSocket} user={chatPartner}/>) : 
        (collaborators.length === 0 ?
        (<><br/><p style={{fontStyle: 'italic'}} className="text-muted">You have no collaborators. Start sharing by adding collaborators in the Requests tab.</p></>) :
        collaborators.map((collaborator, index) => (<CollaboratorCard key={index} collaborator={collaborator} enableChat={() => {toggleShowChat(true); setChatPartner(collaborator)}}/>)))}
    </div>

    )
}