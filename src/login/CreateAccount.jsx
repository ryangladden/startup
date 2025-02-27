import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap' 
import validator from 'validator'

export default function CreateAccount() {
    
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [userName, setUserName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [passwordMatch, setPasswordMatch] = React.useState(false);
    const [passwordEdited, setPasswordEdited] = React.useState(false);
    const [confirmEdited, setConfirmEdited] = React.useState(false);
    const [activeConfirm, setActiveConfirm] = React.useState(false)

    function updateEmail(e) {
        setEmail(e.target.value);
    }

    function updateUserName(e) {
        setUserName(e.target.value);
    }

    function updatePassword(e) {
        setPassword(e.target.value);
    }

    function updateConfirm(e) {
        setConfirmPassword(e.target.value);
    }

    function checkPasswordMatches(e) {
        if (passwordEdited & confirmEdited) {
            setPasswordMatch(e.target.value != confirmPassword)
        }
    }

    function checkConfirmMatches(e) {
        if (passwordEdited & confirmEdited) {
            setPasswordMatch(e.target.value != password)
        }
    }

    React.useEffect(() => 
        setActiveConfirm(passwordEdited && confirmEdited && !passwordMatch && userName != ""), [passwordMatch])
    
    return (
        <Modal show={true} centered aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header>
                <Modal.Title>Create a new account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' onBlur={updateUserName}/>
                    <Form.Label></Form.Label>
                    <br/>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' placeholder='email@example.com' onBlur={updateEmail}/>
                    <br/>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' onFocus={()=>setPasswordEdited(true)} onBlur={updatePassword} onChange={checkPasswordMatches}/>
                    <br/>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' onFocus={()=>setConfirmEdited(true)} onBlur={updateConfirm} onChange={checkConfirmMatches}/>
                    <br/>
                    {passwordMatch ? <Form.Label  className='text-muted' hidden={!passwordMatch}>Passwords do not match</Form.Label> : <br/>}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <Button type='submit' disabled={!activeConfirm}>Create Account</Button>
                    <Button>Cancel</Button>
                    </div>
            </Modal.Footer>
        </Modal>
    )
}