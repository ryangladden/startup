import React from 'react';
import {Form, Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Post({documents}) {

    const navigate = useNavigate();
    const [docId, setDocId] = React.useState('');

    async function post() {
        const formElements = document.forms['postDocument'].elements;
        const response = await fetch("/api/share/post", {
            method: "post",
            body: JSON.stringify({
                document_id: docId,
                text: formElements["postText"].value,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                }
            }
        )
        navigate("/sharing");
    }


    return (
        <div>
            <h4>Post</h4>
            <p>Share a memory or document for all of your collaborators to see on their feed</p>
            <Form name="postDocument">
                <Form.Group>
                    <Form.Label>Select a document</Form.Label>
                    <Form.Select name="selectedDocument" onChange={(e) => setDocId(e.target.value)}>
                        {documents.map((doc, index) => (
                            <option key={index} value={doc._id} >"{doc.title}" by {doc.author}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Write a post</Form.Label>
                    <Form.Control as="textarea" name="postText" rows={3} />
                </Form.Group>
                <br/>
                <Button variant="primary" onClick={() => post()}>
                    Post
                </Button>
            </Form>
        </div>
    )

}