import React from 'react';
import './sharing.css'

export function Sharing() {
  return (
    <main className='sharing'>
    <section class="sharing">
        <h3>Sharing</h3>
        <div class="scrollbox">
        <div class="card card-body post">
            <img src="letter2.png" class="card-img-top"/>
            <h4 class="card-title">Posted by: Username</h4>
            <h5 class="card-subtitle">Letter from my grandpa</h5>
            <p class="card-text text-muted">4 hours ago</p>
            <p>User adds a caption about how this document is super special. This letter was written by such and
                such. Check it out!</p>
        </div>
        <div class="card card-body post">
            <img src="journal.png" class="card-img-top"/>
            <h4 class="card-title">Posted by: Joe Mama</h4>
            <h5 class="card-subtitle">Missionary journal entry</h5>
            <p class="card-text text-muted">4 hours ago</p>
            <p>This is a journal entry from my uncle's first day as a missionary. It was a pretty crazy day!</p>
        </div>
        </div>
    </section>
<aside>
    <h3>Your Collaborators</h3>
    <div class="card">
        <div class="card-body">
            <h5>Collaborator 1</h5>
            <a class="card-link">Send a message</a>
            <a class="card-link">Share a document</a>
        </div>
    </div>
    <div class="card">
        <div class="card-body">
            <h5>Joe Mama</h5>
            <a class="card-link">Send a message</a>
            <a class="card-link">Share a document</a>
        </div>
    </div>
    <div class="card">
        <div class="card-body">
            <h5>Ryan Gladden</h5>
            <a class="card-link">Send a message</a>
            <a class="card-link">Share a document</a>
        </div>
    </div>
    <button class="btn btn-primary">Search for more collaborators</button>
</aside>
</main>
  );
}