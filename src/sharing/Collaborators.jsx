import React from 'react';
import { Button } from 'react-bootstrap'
import CollaboratorCard from './CollaboratorCard';

export default function Collaborators({enableChat}) {
    return (
    <aside>
    <h3>Your Collaborators</h3>
    <CollaboratorCard collaborator='Joe Mama' enableChat={enableChat}/>
    <CollaboratorCard collaborator='Ryan Gladden' enableChat={enableChat}/>
    <CollaboratorCard collaborator='Catherine de Burg' enableChat={enableChat}/>
    <CollaboratorCard collaborator='Captain Jack Sparrow' enableChat={enableChat}/>
    <button className="btn btn-primary">Search for more collaborators</button>
    </aside>
    )
}