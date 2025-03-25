import React from 'react';
import './sharing.css'
import Collaborators from './Collaborators';
import Chat from './Chat';
import { Navbar } from 'react-bootstrap';

export function Sharing() {


    const [showChat, setShowChat] = React.useState(false);
    const [chatUser, setChatUser] = React.useState('')

    function enableChat(e) {
        setChatUser(e.target.value)
        setShowChat(true);
    }

    function disableChat() {
        setShowChat(false);
    }

    return (
    <main className='sharing'>
    <section className="sharing">
        <h3>Sharing</h3>
        <div className="scrollbox">
        <div className="card card-body post">
            <img src="letter2.png" className="card-img-top"/>
            <h4 className="card-title">Posted by: Username</h4>
            <h5 className="card-subtitle">Letter from my grandpa</h5>
            <p className="card-text text-muted">4 hours ago</p>
            <p>User adds a caption about how this document is super special. This letter was written by such and
                such. Check it out!</p>
        </div>
        <div className="card card-body post">
            <Navbar>
                
            </Navbar>
            <img src="journal.png" className="card-img-top"/>
            <h4 className="card-title">Posted by: Joe Mama</h4>
            <h5 className="card-subtitle">Missionary journal entry</h5>
            <p className="card-text text-muted">4 hours ago</p>
            <p>This is a journal entry from my uncle's first day as a missionary. It was a pretty crazy day!</p>
        </div>
        </div>
    </section>
    {showChat ? <Chat user={chatUser} disableChat={()=>setShowChat(false)}/> : <Collaborators enableChat={enableChat}/>}
</main>
  );
}