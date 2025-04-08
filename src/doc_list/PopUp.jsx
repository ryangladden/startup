import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function PopUp( { uploadData, show, cancel } ) {

    const navigate = useNavigate()

    const [author, setAuthor] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [date, setDate] = React.useState('');
    const [formData, updateFormData] = React.useState(new FormData())


    function appendData(e) {
        const data = e.target.name === 'file' ? e.target.files[0] : e.target.value;
        formData.append(e.target.name, data);
        updateFormData(formData);
    }

    function appendFile(input) {
        const newFormData = new FormData(formData);
        newFormData.append(e.target.name, e.target.files[0])
        updateFormData(newFormData);
    }

    async function upload() {
        const response = await fetch('/api/docs/upload', {
            method: 'post',
            body: prepareForm()
        });
        navigate("/docs");
        cancel();
        }

    function parseTags(string) {
        return string.split(',').map(item => item.trim());
    }

    function prepareForm() {
        const formElements = document.forms['uploadForm'].elements;
        var formData = new FormData();
        formData.append('title', formElements['title'].value);
        formData.append('author', formElements['author'].value);
        formData.append('date', formElements['date'].value);
        formData.append('location', formElements['location'].value);
        formData.append('tags', parseTags(formElements['tags'].value));
        formData.append('file', formElements['file'].files[0]);
        
        return formData
    }



    return (
        <Modal show={show} centered aria-labelledby="contained-modal-title-vcenter" onHide={cancel}>
            <Modal.Header closeButton>
            <Modal.Title>Upload New Document</Modal.Title>
            </Modal.Header>
            <Form name="uploadForm">
            <Modal.Body>
                    <Form.Group>
                        <Form.Label>Document Title</Form.Label>
                        <Form.Control type='text' name='title' onChange={(e) => appendData(e)}/>
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Author</Form.Label>
                        <Form.Control type='text' name='author' onChange={(e) => appendData(e)}/>
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Date</Form.Label>
                        <Form.Control type='date' name='date' onChange={(e) => appendData(e)}/>
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Location</Form.Label>
                        <Form.Control type='text' name='location' onChange={(e) => appendData(e)}/>
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label>Tags</Form.Label>
                        <Form.Control type='text' name='tags' onChange={(e) => appendData(e)}/>
                        <Form.Label className='text-muted'>Enter tags as a comma-seperated list (tag1,tag2,tag3)</Form.Label>
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Control type='file' name='file' accept=".jpg, .jpeg, .png, .pdf" onChange={(e) => appendData(e)}/>
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