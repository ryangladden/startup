import React from 'react';
import { Button } from 'react-bootstrap';

export default function LoginForm( { showModal, setLoggedIn, showError } ) {
    

        const showCreateAccount = () => showModal(true);

        const [email, setEmail] = React.useState('');
        const [password, setPassword] = React.useState('');

        async function login(e) {
            const response = await fetch("/api/session", {
                method: 'post',
                body: JSON.stringify({email: email, password: password}),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })
            const data = await response.json()
            if (response.status === 200) {
                localStorage.setItem('currentUser', data.name);
                setLoggedIn(true);
            } else {
                console.log("Broooo")
                showError(true);
            }
        }

    return (
        <form onSubmit={(e) => e.preventDefault}id="login" className="form-group">
            <h3>Log in to share documents</h3>
            <div className="email input-group">
                <label className="input-group-text" for="email">Email</label>
                <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} placeholder="joemama@example.com"/>
            </div>
            <div className="password input-group">
                <label for="password" className="input-group-text">Password</label>
                <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} placeholder="password"/>
            </div>
            <div className="form-actions">
                <Button type="button" onClick={login} variant={'primary'}>Login</Button>
                <Button type='button' onClick={showCreateAccount} variant={'secondary'}>New? Create an account</Button>
            </div>
        </form>
    )
}