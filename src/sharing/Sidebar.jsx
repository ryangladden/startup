import React from 'react';
import { Tab, Tabs, TabPane } from 'react-bootstrap';
import Collaborators from './Collaborators';
import Requests from './Requests'
import Post from './Post';

export default function Sidebar({webSocket}) {

    const [notificationTab, setNotificationTab] = React.useState(false);
    const [docList, setDocList] = React.useState([]);

    async function getDocList() {
        const response = await fetch("/api/docs/list", {
            method: "get"
        })
        return await response.json();
    }

    React.useEffect(() => {
        async function fetchData() {
            const response = await getDocList();
            console.log(response);
            setDocList(response);
        }
        fetchData();
    }
    , [])

    React.useEffect(() => {
        webSocket.addObserver((e) => { 
            if (e.event == "received") {
            setNotificationTab(true);
            setTimeout(() => setNotificationTab(false), 5000)}}) 
    }, [])

    return (
        <aside>
            <Tabs  defaultActiveKey="collaborators" className="mb-3">
                <Tab eventKey="post" title="Post" ><Post documents={docList}/></Tab>
                <Tab eventKey="collaborators" documents={docList} tabClassName={(notificationTab && "notification-tab")} title="Collaborators"><Collaborators documents={docList} webSocket={webSocket}/></Tab>
                <Tab eventKey="requests" title="Requests"><Requests /></Tab>
            </Tabs>
        </aside>
    )
}