import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

export default function PopUp( { uploadData, show, cancel } ) {

    function upload() {
        uploadData(
            {
                'title': 'SAMPLE TITLE',
                'author': 'SAMPLE AUTHOR',
                'date': '24 February 2025'
            }
        )
        cancel();
    }


    return (
        <Modal show={show} centered aria-labelledby="contained-modal-title-vcenter" onHide={cancel}>
            <Modal.Header closeButton>
            <Modal.Title>Upload New Document</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Document Title</Form.Label>
                        <Form.Control type='text'/>
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Date</Form.Label>
                        <Form.Control type='date'/>
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Author</Form.Label>
                        <Form.Control />
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Control type='file' />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant='secondary' onClick={cancel}>Cancel</Button>
                <Button variant='primary' onClick={upload}>Upload</Button>
            </Modal.Footer>
        </Modal>
    )

    }