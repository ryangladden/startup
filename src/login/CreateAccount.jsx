import React from 'react';
import { useNavigate} from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import validator from 'validator';

export default function CreateAccount( {show, cancel, setLoggedIn } ) {


    const navigate = useNavigate()
    const close = () => cancel();

    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [userName, setUserName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [emailEdited, setEmailEdited] = React.useState(false)
    const [passwordMatch, setPasswordMatch] = React.useState(false);
    const [passwordEdited, setPasswordEdited] = React.useState(false);
    const [confirmEdited, setConfirmEdited] = React.useState(false);
    const [activeConfirm, setActiveConfirm] = React.useState(false);
    const [emailValid, setEmailValid] = React.useState(true);
    const [submit, setSubmit] = React.useState('');


    async function createAccount() {
        console.log("createAccount called");
        const response = await fetch("/api/user", {
            method: 'post',
            body: JSON.stringify({name: userName, email: email, password: password}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        if (response?.status === 200) {
            localStorage.setItem('currentUser', userName);
            setLoggedIn(true);
            cancel();
            // navigate('/docs')
        } else {
            const body = await response.json();
            setDisplayError(`⚠ Error: ${body.msg}`);
        }
    }

    function handleSubmit(e) {
        console.log(e);
        e.preventDefault();
        createAccount();
    }

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

    function fieldsValid() {
        return (password === confirmPassword && validator.isEmail(email) && userName !='')
    }

    React.useEffect(() => 
        setActiveConfirm(passwordEdited && confirmEdited && !passwordMatch && userName != "" && email != ''), [passwordMatch, userName, email])

    React.useEffect(() => 
        setEmailValid(validator.isEmail(email) && emailEdited || !emailEdited), [email, emailEdited])
    
    React.useEffect(() =>
        fieldsValid() ? setSubmit('submit') : setSubmit(''), [userName, email, password, confirmPassword])
    return (
        <Modal show={show} centered aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header>
                <Modal.Title>Create a new account</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
            <Modal.Body>
                    <Form.Label>Name</Form.Label>
                    <Form.Control placeholder='Your Name' name='varName' type='text' onChange={updateUserName}/>
                    <Form.Label></Form.Label>
                    <br/>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' placeholder='email@example.com' name='varEmail' onChange={updateEmail} onBlur={()=> setEmailEdited(true)}/>
                    <div style={{height: '30px'}}>
                    <Form.Label style={{color: 'red'}} hidden={emailValid}>Invalid email</Form.Label>
                    </div>
                    <Form.Label>Password</Form.Label>
                    <Form.Control placeholder='password' type='password' name='varPassword' onFocus={()=>setPasswordEdited(true)} onBlur={updatePassword} onChange={checkPasswordMatches}/>
                    <br/>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control placeholder='confirm password' type='password' onFocus={()=>setConfirmEdited(true)} onBlur={updateConfirm} onChange={checkConfirmMatches}/>
                    <div style={{height: '30px'}}>
                    <Form.Label style={{color: 'red'}} hidden={!passwordMatch}>Passwords do not match</Form.Label>
                    </div>
            </Modal.Body>
            <Modal.Footer>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '15px'}}>
                    <Button onClick={handleSubmit} type='button' disabled={!activeConfirm}>Create Account</Button>
                    <Button variant={'secondary'} type='button' onClick={close}>Cancel</Button>
                    </div>
            </Modal.Footer>
            </Form>
        </Modal>
    )
}