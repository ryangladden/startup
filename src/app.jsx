import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./app.css";
import { NavLink, BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { DocList } from './doc_list/doc_list';
import { DocViewer } from './doc_viewer/doc_viewer';
import { About } from './about/about';
import { Sharing } from './sharing/sharing';

export default function App() {
    return (
    <BrowserRouter>
      <div className='body bg-dark text-light'>
        <header className="sticky-top container-fluid">
            <nav className="navbar">
                <img src="/logo-colorful.webp" width='50' /><p to="/doc_lis" className="navbar-brand logo">rchive Lens</p>
                <menu className="navbar-nav">
                    <li className="nav-item"><NavLink className="nav-link" to="login">Login</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="doc_list">Documents</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="sharing">Sharing</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="about">About</NavLink></li>
                </menu>
            </nav>
        </header>
        <div>
        <Routes>
            <Route path='/' element={<Login />} exact />
            <Route path='/docs' element={<DocList />} />
            <Route path='/about' element={<About />} />
            <Route path='/Sharing' element={<Sharing />} />
        </Routes>
        </div>
        <footer class="container-fluid sticky-bottom">
        <div>
            <a to="https://github.com/ryangladden/startup" target="_blank">
                <img src="github-mark.svg" height="30"/>Find Archive Lens on GitHub</a>
            <p>Favicon and logo produced by DALL-E</p>
        </div>
    </footer>
      </div> 
      </BrowserRouter>
);
}