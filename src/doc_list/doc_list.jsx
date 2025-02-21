import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import './doc_list.css'
import CardList from './CardList'
import Filter from './Filter'
import SearchBar from './SearchBar'


const covers = [
    "journal.png",
    "letter.png",
    "letter2.png"
]

const dates = [
    "12 July 1958",
    "29 January 1981",
    "04 March 2000"
]

const names = [
    "Joe Mama",
    "John Doe",
    "Gary E. Stevenson"
]

const titles = [
    "Mission Letter",
    "First day at college journal",
    "Really sad letter"
]

const cards = []
for (let i = 0; i < 105; i++) {
    const metadata = {};
    metadata.date = dates[Math.floor(Math.random() * 3)];
    metadata.author = names[Math.floor(Math.random() * 3)];
    metadata.title = titles[Math.floor(Math.random() * 3)];
    metadata.cover = covers[Math.floor(Math.random() * 3)];
    cards.push(metadata);
};




const filters = {
    sortBy: 'date',
    filterBy: {
        author: [
            "Joe Mama",
            "John Doe",
            "Gary E. Stevenson"
        ],
        date: [
            1960,
            2000
        ]
    }
}



export function DocList() {

    function filterCards(cardList, filter) {
        console.log("START cardList")
        console.log(cardList.length)
        const filteredCardList = cardList.filter(card =>
            filter.filterBy.author.includes(card.author)
            && Number(card.date.slice(card.date.length - 5) <= Number(filter.filterBy.date[1]))
            && Number(card.date.slice(card.date.length - 5) >= Number(filter.filterBy.date[0]))
        )
        console.log("START cardList FILTERED")
        console.log(filteredCardList.length)
    }

    filterCards(cards, filters)

    return (
        <main className='container-fluid'>
            <SearchBar />
            <div className="container-fluid doc-list">
                <Filter />
                <CardList />
            </div>
        </main>
    );
}