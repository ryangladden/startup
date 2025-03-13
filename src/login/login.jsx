import React from 'react';
import "./login.css";
import CreateAccount from "./CreateAccount";
import LoginForm from "./LoginForm";
import UserLoggedIn from './UserLoggedIn';
import { useNavigate } from 'react-router-dom';



export function Login( {userName, authenticated, setAuthState }) {

    const navigate = useNavigate()

    const [show, setShow] = React.useState(false);
    const [currentUserName, setUserName] = React.useState(userName);
    const [loggedIn, setLoggedIn] = React.useState(userName !== '');

    const cancel = () => setShow(false);

    async function createAccount(e) {
        console.log("createAccount called");
        const response = await fetch("/api/user", {
            method: 'post',
            body: JSON.stringify({name: varName, email: varEmail, password, varPassword}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(() => console.log("Account created"))
        if (response?.status === 200) {
            localStorage.setItem('userName', varName);
        } else {
            const body = await response.json();
            setDisplayError(`⚠ Error: ${body.msg}`);
        }
    }


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
            {authenticated ? <LoginForm showModal={setShow}/> : <UserLoggedIn />}
        </div>
    </main>
  );
}