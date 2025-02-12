import React from 'react';

export function Login() {
  return (
    <main className='container-fluid bg-secondary text-center'>
      <main>
            <section class="welcome">
                <h2>Welcome to</h2>
                <h2 class="logo typing" >Archive Lens</h2>
                <p>Your archive for letters, journals, and other family history documents</p>
            </section>
            <section class="login">
            <form id="login" class="form-group" method="get" action="docs.html">
                <h3>Log in to share documents</h3>
                <div class="email input-group">
                    {/* <label class="input-group-text for="email">Email</label>
                    <input type="email" class="form-control" id="email" name="varEmail" placeholder="joemama@example.com"/> */}
                </div>
                <div class="password input-group">
                    <label for="password" class="input-group-text">Password</label>
                    <input type="password" class="form-control" id="password" name="varPassword" placeholder="password"/>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">Login</button>
                    <a href="create-account.html" class="btn btn-secondary">New? Create an account</a>
                </div>
            </form>
        </section>
        </main>
    </main>
  );
}