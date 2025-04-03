import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import Message from './Message';

const sampleMessages = [
    {sender: 'You', time: new Date("2025-04-03T09:30:00"), share: true, message: ''},
    {sender: 'Joe Mama', time: new Date("2025-04-01T12:00:00"), message: 'Hey, how are you doing?', share: false},
    {sender: 'You', time: new Date("2025-03-26T15:45:00"), message: 'Not much, did you check out that document I sent you?', share: false},
    {sender: 'Joe Mama', time: new Date("2025-03-03T08:15:00"), message: 'Yeah, I thought it was pretty cool', share: false},
]

export default function Chat({user, hideChat, webSocket, conversation}) {


    const [currentMessage, setCurrentMessage] = React.useState('')
    // const [messages, updateMessages] = React.useState(conversation.messages)
    const messageEndRef = React.useRef(null);

    React.useEffect(() => console.log(conversation), [])

    function formatMessage(obj, key) {
        console.log(obj)
        obj.sender = obj.sender === user.email ? user.name : "You"
        return (<Message sender={obj.sender} message={obj.message} time={obj.time} key={key}/>)
    }

    function sendMessage() {
        var newMessage = {receiver: user.email, message: currentMessage, time: Date.now()};
        webSocket.sendMessage(newMessage)
        newMessage.sender = "You";
        updateMessages([...messages, newMessage])
        setCurrentMessage('');
    }


    // React.useEffect(() => {
    //     messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    // }, [messages]);

    // React.useEffect(() => {
    //     webSocket.addObserver((chat, other, other2) => {
    //         console.log(chat);
    //     })
    // })


    return (
        <aside style={{height: '65vh', display: 'flex', flexDirection: 'column', border: '3px solid lightgrey', borderRadius: '20px', backgroundColor: 'white', margin: '10px', padding: '0'}}>
            <div style={{flex: '0 0 20px', padding: '10px', fontWeight: 'bold', display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottom: '1px solid grey'}}>
                <Button size='sm' style={{flexGrow: '0'}} onClick={hideChat}>Return</Button>
                <h5 style={{flexGrow: '1', textAlign: 'center'}}>Chat with {user.name}</h5>
                </div>
            <div style={{flexGrow: '1',overflow: 'auto'}}>
                {conversation.messages.map((msg, index) => formatMessage(msg, index))}
                <div ref={messageEndRef} />
            </div>
            <div style={{flex: '0 0 80px', padding: '15px', borderTop: '1px solid grey'}}>
                <Form style={{display: 'flex', flexDirection: 'row', gap: '10px', width: '340px'}}>
                    <Form.Control as='textarea'  placeholder='Send a message...' onChange={(e)=> setCurrentMessage(e.target.value)}/>
                    <Button onClick={() => sendMessage()}>Send</Button>
                </Form>
            </div>
        </aside>
    )
}