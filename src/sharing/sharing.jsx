import React from 'react';
import './sharing.css'
import Sidebar from './Sidebar';
import ChatClient from './ChatClient';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export function Sharing() {

    const navigate = useNavigate();
    const [webSocket, configureWebSocket] = React.useState(new ChatClient())
    const [posts, setPosts] = React.useState([])

    React.useEffect(() => {
        async function fetchData() {
            const response = await fetch("/api/share/posts", {
                method: "get"
            })
            const data = await response.json();
            console.log(data);
            setPosts(data);
        }
        fetchData();
    }
    , [])

    return (
    <main className='sharing'>
    <section className="sharing">
        <h3>Sharing</h3>
        <div className="scrollbox">
        {posts.length === 0 ? <p className="text-muted">Not seeing any posts? Add collaborators in the Requests tab, or post something by going to the Post tab on the sidebar.</p> : posts.map((post) => (
            <div className="card card-body post" key={post.id}>
                {/* <img src={post.image} className="card-img-top"/> */}
                <h4 className="card-title">Posted by: {post.owner.name}</h4>
                <h5 className="card-subtitle">{post.title}</h5>
                <p className="card-text text-muted">{post.date}</p>
                <p>{post.text}</p>
                <br/>
                <Button onClick={()=> navigate(`/docs/${post.document_id}`)}>View Document</Button>
            </div>
        ))}
        </div>
    </section>
    <Sidebar webSocket={webSocket}/>
    {/* {showChat ? <Chat user={chatUser} disableChat={()=>setShowChat(false)}/> : <Collaborators enableChat={enableChat}/>} */}
</main>
  );
}