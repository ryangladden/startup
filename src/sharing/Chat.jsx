import React from 'react';
import { Form, Button } from 'react-bootstrap';
import Message from './Message';

export default function Chat({user, hideChat, webSocket, conversation}) {


    const [currentMessage, setCurrentMessage] = React.useState('')
    const [messages, updateMessages] = React.useState(conversation)
    const messageEndRef = React.useRef(null);

    function formatMessage(obj, key) {
        const sender = obj.sender === user.email ? user.name : "You"
        return (<Message sender={sender} message={obj.message} time={obj.time} key={key}/>)
    }

    function sendMessage() {
        const currentMessage = document.forms['newMessageForm'].elements['newMessage'].value;
        var newMessage = {receiver: user.email, message: currentMessage, time: Date.now()};
        webSocket.sendMessage(newMessage)
        document.forms['newMessageForm'].elements['newMessage'].value = ''
        newMessage.sender = "You";
        updateMessages([...messages, newMessage]);
        setCurrentMessage('');
    }


    React.useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    React.useEffect(() => {
        webSocket.addObserver((event) => {
            const message = event.msg
            updateMessages([...messages, message])
        })
    })


    return (
        <aside style={{height: '65vh', display: 'flex', flexDirection: 'column', border: '3px solid lightgrey', borderRadius: '20px', backgroundColor: 'white', margin: '10px', padding: '0'}}>
            <div style={{flex: '0 0 20px', padding: '10px', fontWeight: 'bold', display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottom: '1px solid grey'}}>
                <Button size='sm' style={{flexGrow: '0'}} onClick={hideChat}>Return</Button>
                <h5 style={{flexGrow: '1', textAlign: 'center'}}>Chat with {user.name}</h5>
                </div>
            <div style={{flexGrow: '1',overflow: 'auto'}}>
                {messages.map((msg, index) => formatMessage(msg, index))}
                <div ref={messageEndRef} />
            </div>
            <div style={{flex: '0 0 80px', padding: '15px', borderTop: '1px solid grey'}}>
                <Form style={{display: 'flex', flexDirection: 'row', gap: '10px', width: '340px'}} name="newMessageForm">
                    <Form.Control as='textarea' name='newMessage' placeholder='Send a message...'/>
                    <Button onClick={() => sendMessage()}>Send</Button>
                </Form>
            </div>
        </aside>
    )
}