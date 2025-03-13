import React from 'react';

export default function UserLoggedIn() {

    return (
        <h1>{localStorage.getItem("currentUser")}</h1>
    )
}