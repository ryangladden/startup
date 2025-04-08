import React from 'react';
import CollaboratorCard from './CollaboratorCard';
import Chat from './Chat';

export default function Collaborators({webSocket, documents}) {

    const [collaborators, setCollaborators] = React.useState([])
    const [showChat, toggleShowChat] = React.useState(false);
    const [chatPartner, setChatPartner] = React.useState("");
    const [messages, setMessages] = React.useState({});
    const [activeNotifications, addActiveNotification] = React.useState({})

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

    function addMessage(e) {
        setMessages((oldMessages => {
            const newMessages = { ...oldMessages };
            newMessages[e.from] = [...newMessages[e.from], e.msg];
            return newMessages;
        }))
    }

    function formatMessageList(messages, collaborators) {
        var msgs = {}
        for (const collaborator of collaborators) {
            msgs[collaborator.email] = messages.find((chat) => chat.users.includes(collaborator.email)).messages;
        }
        return msgs;
    }

    function removeActiveNotification(email) {
        var notifications = activeNotifications;
        notifications[email] = false;
        addActiveNotification(notifications);
    }

    React.useEffect(() => {
        async function fetchData() {
            const messageArray = await getMessages();
            const response = await getCollaborators();
            const collaborators = await response.json();
            setCollaborators(collaborators);
            setMessages(formatMessageList(messageArray, collaborators));
            console.log(formatMessageList(messageArray, collaborators));
            var notifications = {}
            for (const collaborator of collaborators) {
                notifications[collaborator] = false;
            }
            addActiveNotification(notifications);
        }
        fetchData();
        // console.log(messages);
    }, [])

    React.useEffect(() => {
        console.log(messages)
    }, [messages])

    React.useEffect(() => {
        webSocket.addObserver((e) => {
            if (e.event === "received") {
                var notifications = activeNotifications;
                notifications[e.from] = true;
                addActiveNotification(notifications);
                addMessage(e)
            }
        })
    }, [])

    return (
    <div>
        {!showChat && <h3>Your Collaborators</h3>}
        {showChat ? 
        (<Chat conversation={messages[chatPartner.email]} hideChat={() => toggleShowChat(false)} webSocket={webSocket} user={chatPartner}/>) : 
        (collaborators.length === 0 ?
        (<><br/><p style={{fontStyle: 'italic'}} className="text-muted">You have no collaborators. Start sharing by adding collaborators in the Requests tab.</p></>) :
        collaborators.map((collaborator, index) => (<CollaboratorCard activeNotifications={activeNotifications} key={index} collaborator={collaborator} documents={documents} enableChat={() => {toggleShowChat(true); setChatPartner(collaborator); removeActiveNotification(collaborator.email)}}/>)))}
    </div>

    )
}