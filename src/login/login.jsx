import React from 'react';
import "./login.css";
import CreateAccount from "./CreateAccount";
import { Button } from 'react-bootstrap'

export function Login() {

    const [show, setShow] = React.useState(false);

    const cancel = () => setShow(false);

  return (
    <main>
        <CreateAccount cancel={cancel} show={show}/>
            <div className="welcome">
                <h2>Welcome to</h2>
                <h2 className="logo typing" >Archive Lens</h2>
                <p>Your archive for letters, journals, and other family history documents</p>
            </div>
            <div className="login">
            <br/>
            <form id="login" className="form-group" method="get" action="docs">
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
                    <Button type="submit" to='docs' variant={'primary'}>Login</Button>
                    <Button onClick={()=>setShow(true)} variant={'secondary'}>New? Create an account</Button>
                </div>
            </form>
        </div>
    </main>
  );
}