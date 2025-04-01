import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import Message from './Message';

const sampleMessages = [
    {sender: 'You', time: '8:54', share: true, message: ''},
    {sender: 'Joe Mama', time: '10:31', message: 'Hey, how are you doing?', share: false},
    {sender: 'You', time: '10:34', message: 'Not much, did you check out that document I sent you?', share: false},
    {sender: 'Joe Mama', time: '10:32', message: 'Yeah, I thought it was pretty cool', share: false},
]

export default function Chat({user, disableChat}) {


    const [currentMessage, setCurrentMessage] = React.useState('')
    const [messages, updateMessages] = React.useState(sampleMessages)
    const messageEndRef = React.useRef(null);

    function formatMessage(obj, key) {
        return (<Message sender={obj.sender} message={obj.message} share={obj.share} time={obj.time} key={key}/>)
    }

    function sendMessage() {
        const newMessage = {sender: 'You', message: currentMessage, share: false, time: new Date().toLocaleTimeString()};
        updateMessages([...messages, newMessage])
        setCurrentMessage('');
    }

    // setTimeout(() => {
    //     const newMessage = {sender:'Joe Mama', message:'Check out this document', share: false, time: new Date().toLocaleTimeString()}
    //     updateMessages([...messages, newMessage])
    // }, 8000)


    React.useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);


    return (
        <aside style={{height: '65vh', display: 'flex', flexDirection: 'column', border: '3px solid lightgrey', borderRadius: '20px', backgroundColor: 'white', margin: '20px', padding: '0'}}>
            <div style={{flex: '0 0 20px', padding: '10px', fontWeight: 'bold', display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottom: '1px solid grey'}}>
                <Button size='sm' style={{flexGrow: '0'}} onClick={disableChat}>Return</Button>
                <h4 style={{flexGrow: '1', textAlign: 'center'}}>Chat with {user}</h4>
                </div>
            <div style={{flexGrow: '1',overflow: 'auto'}}>
                {messages.map((msg, index) => formatMessage(msg, index))}
                <div ref={messageEndRef} />
            </div>
            <div style={{flex: '0 0 80px', padding: '15px', borderTop: '1px solid grey'}}>
                <Form style={{display: 'flex', flexDirection: 'row', gap: '10px', width: '340px'}}>
                    <Form.Control as='textarea' value={currentMessage} placeholder='Send a message...' onChange={(e)=> setCurrentMessage(e.target.value)}/>
                    <Button onClick={sendMessage}>Send</Button>
                </Form>
            </div>
        </aside>
    )
}