import React from 'react';
import { Navbar, Button, Tab, Tabs } from 'react-bootstrap';
import Collaborators from './Collaborators';
import Requests from './Requests'

export default function Sidebar() {

    return (
        <aside>
            <Tabs  defaultActiveKey="collaborators" className="mb-3">
                <Tab eventKey="post" title="Post">Post Here</Tab>
                <Tab eventKey="collaborators" title="Collaborators"><Collaborators /></Tab>
                <Tab eventKey="requests" title="Requests"><Requests /></Tab>
            </Tabs>
        </aside>
    )
}