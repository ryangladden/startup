import React from 'react';
import { Navbar, Button, Tab, Tabs, TabPane, Nav } from 'react-bootstrap';
import Collaborators from './Collaborators';
import Requests from './Requests'

export default function Sidebar({webSocket}) {

    const [notificationTab, setNotificationTab] = React.useState(false);

    React.useEffect(() => {
        webSocket.addObserver((e) => { 
            if (e.event == "received") {
            setNotificationTab(true);
            setTimeout(() => setNotificationTab(false), 5000)}}) 
    }, [])

    return (
        <aside>
            <Tabs  defaultActiveKey="collaborators" className="mb-3">
                <Tab eventKey="post" title="Post">Post Here</Tab>
                <Tab eventKey="collaborators" tabClassName={(notificationTab && "notification-tab")} title="Collaborators"><TabPane>HDSFSD</TabPane><Collaborators webSocket={webSocket}/></Tab>
                <Tab eventKey="requests" title="Requests"><Requests /></Tab>
            </Tabs>
        </aside>
    )
}