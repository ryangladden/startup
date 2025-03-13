import React from 'react';
import { Button } from 'react-bootstrap';

export default function LoginForm( { showModal } ) {
    

        const showCreateAccount = () => showModal(true);

        async function login(e) {
            console.log("Logging in");
            const response = await fetch("/api/user", {
                method: "get",
                body: JSON.stringify({name: varName, password: varPassword}),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
        }

    return (
        <form onSubmit={(e) => e.preventDefault}id="login" className="form-group">
            <h3>Log in to share documents</h3>
            <div className="email input-group">
                <label className="input-group-text" for="email">Email</label>
                <input type="email" className="form-control" id="email" name="varEmail" placeholder="joemama@example.com"/>
            </div>
            <div className="password input-group">
                <label for="password" className="input-group-text">Password</label>
                <input type="password" className="form-control" id="password" name="varPassword" placeholder="password"/>
            </div>
            <div className="form-actions">
                <Button type="button" onClick={login} variant={'primary'}>Login</Button>
                <Button type='button' onClick={showCreateAccount} variant={'secondary'}>New? Create an account</Button>
            </div>
        </form>
    )
}