import React from 'react';
import {Form, Button} from 'react-bootstrap';

export default function Post({documents}) {

    return (
        <div>
            <h4>Post</h4>
            <p>Share a memory or document for all of your collaborators to see on their feed</p>
            <Form>
                <Form.Group>
                    <Form.Label>Select a document</Form.Label>
                    <Form.Select>
                        {documents.map((doc, index) => (
                            <option key={index} value={index}>"{doc.title}" by {doc.author}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Write a post</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <br/>
                <Button variant="primary" type="submit">
                    Post
                </Button>
            </Form>
        </div>
    )

}