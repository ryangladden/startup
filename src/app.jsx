import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./app.css";
import { Link } from 'react-router-dom';

export default function App() {
    return (
      <div className='body bg-dark text-light'>
        <header className="sticky-top container-fluid">
            <nav className="navbar">
                <img src="/logo-colorful.webp" width='50' /><p to="/doc_lis" className="navbar-brand logo">rchive Lens</p>
                <menu className="navbar-nav">
                    <li className="nav-item"><a className="nav-link active" href="index.html">Login</a></li>
                    <li className="nav-item"><a className="nav-link" href="docs.html">Documents</a></li>
                    <li className="nav-item"><a className="nav-link" href="sharing.html">Sharing</a></li>
                    <li className="nav-item"><a className="nav-link" href="about.html">About</a></li>
                </menu>
            </nav>
        </header>
        <footer class="container-fluid sticky-bottom">
        <div>
            <a href="https://github.com/ryangladden/startup" target="_blank">
                <img src="github-mark.svg" height="30"/>Find Archive Lens on GitHub</a>
            <p>Favicon and logo produced by DALL-E</p>
        </div>
    </footer>
      </div> 
);
}