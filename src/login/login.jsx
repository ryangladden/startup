import React from 'react';
import "./login.css";
import CreateAccount from "./CreateAccount";
import LoginForm from "./LoginForm";
import UserLoggedIn from './UserLoggedIn';
import ModalMessage from './ModalMessage'



export function Login( {setAuthState, authState } ) {



    const [show, setShow] = React.useState(false);
    const [showError, setShowError] = React.useState(false);

    const cancel = () => setShow(false);


  return (
    <main>
        <ModalMessage show={showError} setShow={setShowError} message={"Error: unauthorized"} />
        <CreateAccount cancel={cancel} show={show} setLoggedIn={(state) => setAuthState(state)}/>
            <div className="welcome">
                <h2>Welcome to</h2>
                <h2 className="logo typing" >Archive Lens</h2>
                <p>Your archive for letters, journals, and other family history documents</p>
            </div>
            <div className="login">
            <br/>
            {authState ? <UserLoggedIn setLoggedIn={(state) => setAuthState(state)} /> : <LoginForm showModal={setShow} showError={setShowError} setLoggedIn={(state) => setAuthState(state)}/> }
        </div>
    </main>
  );
}