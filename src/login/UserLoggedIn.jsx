import React from 'react';
import {Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

export default function UserLoggedIn( { setLoggedIn } ) {

    const navigate = useNavigate()

    async function logout() {
        const response = await fetch("/api/session", {
            method: 'delete',
        })
        if (response?.status === 200) {
            localStorage.setItem('currentUser', '');
            setLoggedIn(false);
        }
    }

    return (
        <>
            <form className="form-group">
                <h4>Hey, {localStorage.getItem("currentUser")}!</h4>
            
                <div className="form-actions">
                    <Button type="button" onClick={() => navigate("/docs")} variant={'primary'}>See your documents</Button>
                    <Button type='button' onClick={logout} variant={'secondary'}>Logout</Button>
                    </div>
            </form>
        </>
    )
}