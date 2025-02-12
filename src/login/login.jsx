import React from 'react';
import "./login.css";

export function Login() {
  return (
    <main>
            <section className="welcome">
                <h2>Welcome to</h2>
                <h2 className="logo typing" >Archive Lens</h2>
                <p>Your archive for letters, journals, and other family history documents</p>
            </section>
            <section className="login">
            <form id="login" className="form-group" method="get" action="docs.html">
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
                    <button type="submit" className="btn btn-primary">Login</button>
                    <a href="create-account.html" className="btn btn-secondary">New? Create an account</a>
                </div>
            </form>
        </section>
    </main>
  );
}