import React from 'react';
import { Link } from 'react-router-dom';

export function About() {
  return (
    <main className='text-center'>
           <h2>What is Archive Lens?</h2>
           <p>Archive Lens is a platform to organize, retrieve, and share family history documents such as journals and letters. Documents are meant to be attributed to an author. This is a startup project authored by Ryan Gladden for CS 260: Web Programming class at Brigham Young University. Learn more about it <Link to="https://github.com/ryangladden/startup" target="_blank">on GitHub</Link>.</p>

    </main>
  );
}