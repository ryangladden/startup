import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

export default function PopUp( { uploadData, show, cancel } ) {

    const [author, setAuthor] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [date, setDate] = React.useState('');

    function upload() {
        uploadData(
            {
                'title': title,
                'author': author,
                'date': date
            }
        )
        cancel();
    }


    return (
        <Modal show={show} centered aria-labelledby="contained-modal-title-vcenter" onHide={cancel}>
            <Modal.Header closeButton>
            <Modal.Title>Upload New Document</Modal.Title>
            </Modal.Header>
            <Form>
            <Modal.Body>
                    <Form.Group>
                        <Form.Label>Document Title</Form.Label>
                        <Form.Control type='text' onChange={(e)=>setTitle(e.target.value)}/>
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Author</Form.Label>
                        <Form.Control type='text' onChange={(e)=>setAuthor(e.target.value)}/>
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Date</Form.Label>
                        <Form.Control type='date' onChange={(e) => setDate(e.target.value)}/>
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Control type='file' />
                    </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={cancel}>Cancel</Button>
                <Button variant='primary' onClick={upload}>Upload</Button>
            </Modal.Footer>
            </Form>
        </Modal>
    )

    }