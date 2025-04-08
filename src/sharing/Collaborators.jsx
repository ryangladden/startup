import React from 'react';
import { Button, Form } from 'react-bootstrap'
import CollaboratorCard from './CollaboratorCard';
import Chat from './Chat';

export default function Collaborators({webSocket}) {

    const [collaborators, setCollaborators] = React.useState([])
    const [showChat, toggleShowChat] = React.useState(false);
    const [chatPartner, setChatPartner] = React.useState("");
    const [messages, setMessages] = React.useState([]);
    const [activeNotifications, addActiveNotification] = React.useState([])

    async function getCollaborators() {
        const response = await fetch("/api/share/collaborators", {
            method: "get"
        })
        return response;
    }

    async function getMessages() {
        const response = await fetch("/api/share/collaborators/messages", {
            method: "get"
        })
        return await response.json();
    }

    function filterMessages(collaborator) {
        return messages.find((chat) => chat.users.includes(collaborator));
    }

    function removeActiveNotification(email) {
        console.log("REMOVING")
        const newNotifications = activeNotifications.filter((user) => email !== user);
        console.log(newNotifications);
        addActiveNotification(newNotifications);
    }

    React.useEffect(() => {
        async function fetchData() {
            const messageArray = await getMessages();
            setMessages(messageArray);
            const response = await getCollaborators();
            const collaborators = await response.json();
            setCollaborators(collaborators);
        }
        fetchData();
    }, [])

    React.useEffect(() => {
        webSocket.addObserver((e) => {
            if (e.event === "received") {
                addActiveNotification([...activeNotifications, e.from]);
            }
        })
    }, [])

    return (
    <div>
        {!showChat && <h3>Your Collaborators</h3>}
        {showChat ? 
        (<Chat conversation={filterMessages(chatPartner.email)} hideChat={() => toggleShowChat(false)} webSocket={webSocket} user={chatPartner}/>) : 
        (collaborators.length === 0 ?
        (<><br/><p style={{fontStyle: 'italic'}} className="text-muted">You have no collaborators. Start sharing by adding collaborators in the Requests tab.</p></>) :
        collaborators.map((collaborator, index) => (<CollaboratorCard activeNotifications={activeNotifications} key={index} collaborator={collaborator} enableChat={() => {toggleShowChat(true); setChatPartner(collaborator); removeActiveNotification(collaborator.email)}}/>)))}
    </div>

    )
}