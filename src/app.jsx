import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./app.css";
import { NavLink, BrowserRouter, Route, Routes, } from 'react-router-dom';
import { Login } from './login/Login'
import { DocList } from './doc_list/DocListPage';
import { DocViewer } from './doc_viewer/doc_viewer';
import { About } from './about/about';
import { Sharing } from './sharing/sharing';

export default function App() {

    async function isAuthenticated() {
        const response = await fetch("/api/session", {
            method: "get"
        })
        const authenticate = await response.json()
        const authed = await authenticate.authenticated
        setAuthentication(authed)
    }

    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const [authenticated, setAuthentication] = React.useState(false);
    
    React.useEffect( () => {
        isAuthenticated()}, []);

    return (
    <BrowserRouter>
      <div className='body'>
        <header className="sticky-top container-fluid">
            <nav className="navbar">
                <NavLink to="docs" className="navbar-brand logo"><img src="/logo-colorful.webp" width='50' className="logo"/>rchive Lens</NavLink>
                <menu className="navbar-nav">
                    <li className="nav-item"><NavLink className="nav-link" to="">Login</NavLink></li>
                    {authenticated && <li className="nav-item"><NavLink className="nav-link" to="docs">Documents</NavLink></li>}
                    {authenticated && <li className="nav-item"><NavLink className="nav-link" to="sharing">Sharing</NavLink></li>}
                    <li className="nav-item"><NavLink className="nav-link" to="about">About</NavLink></li>
                </menu>
            </nav>
        </header>
        <div>
        <Routes>
            <Route path='/' element={<Login userName={userName} authState={authenticated} setAuthState={(state)=>setAuthentication(state)}/>} />
            {authenticated && <Route path='/docs' element={<DocList />} />}
            <Route path='/about' element={<About />} />
            {authenticated && <Route path='/sharing' element={<Sharing />} />}
            {authenticated && <Route path='/docs/:id' element={<DocViewer />} />}
        </Routes>
        </div>
        <footer className="container-fluid ">
        <div>
            <a href="https://github.com/ryangladden/startup" target="_blank">
                <img src="github-mark.svg" height="30"/>Find Archive Lens on GitHub</a>
            <p>Favicon and logo produced by DALL-E</p>
        </div>
    </footer>
      </div> 
      </BrowserRouter>
);
}