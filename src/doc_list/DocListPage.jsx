import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import './DocListPage.css'
import CardList from './CardList'
import Filter from './Filter'
import SearchBar from './SearchBar'
import PopUp from './PopUp'


const covers = [
    "journal.png",
    "letter.png",
    "letter2.png"
]

// const dates = [
//     "12 July 1958",
//     "29 January 1981",
//     "04 March 2000"
// ]

// const names = [
//     "Joe Mama",
//     "John Doe",
//     "Gary E. Stevenson"
// ]

// const titles = [
//     "Mission Letter",
//     "First day at college journal",
//     "Really sad letter"
// ]

var dates = [
    "12 July 1958", "29 January 1981", "04 March 2000", "15 August 1975", "22 November 1995",
    "30 September 1963", "10 June 1988", "05 April 2010", "18 December 1947", "01 February 2022",
    "08 May 1990", "14 July 2015", "19 October 1983", "03 June 1971", "27 March 1969",
    "09 September 2005", "11 November 2011", "25 December 1999", "07 February 2020", "16 April 1986",
    "01 August 1967", "21 October 1978", "13 March 2016", "06 January 2002", "28 February 1992",
    "12 December 1955", "30 July 2017", "17 June 2003", "02 November 2019", "04 May 1984",
    "18 September 2012", "23 April 1961", "29 October 1974", "15 February 1997", "09 August 2008",
    "05 March 2021", "26 December 1989", "31 January 1952", "20 July 1976", "11 June 2007",
    "07 September 1960", "22 May 1993", "08 April 2014", "14 October 1959", "03 March 1980",
    "16 August 2009", "28 November 1973", "19 December 1964", "24 January 1998", "10 October 1985",
    "27 July 2013", "06 June 2006", "09 April 1954"
];

var names = [
    "Joe Mama", "John Doe", "Gary E. Stevenson", "Jane Smith", "Samuel Adams",
    "Rebecca Black", "Charles Montgomery", "Olivia Benson", "Ethan Hunt", "Margaret Thatcher",
    "Bruce Wayne", "Clark Kent", "Peter Parker", "Tony Stark", "Natasha Romanoff",
    "Steve Rogers", "Diana Prince", "Barry Allen", "Wanda Maximoff", "Jean Grey",
    "Bilbo Baggins", "Frodo Baggins", "Samwise Gamgee", "Gandalf the Grey", "Aragorn",
    "Legolas Greenleaf", "Gimli", "Sauron", "Saruman", "Elrond",
    "Obi-Wan Kenobi", "Anakin Skywalker", "Darth Vader", "Luke Skywalker", "Han Solo",
    "Leia Organa", "Yoda", "Palpatine", "Kylo Ren", "Rey Skywalker",
    "Homer Simpson", "Marge Simpson", "Bart Simpson", "Lisa Simpson", "Maggie Simpson",
    "Walter White", "Jesse Pinkman", "Saul Goodman", "Gus Fring", "Mike Ehrmantraut",
    "Sherlock Holmes", "John Watson", "James Moriarty"
];

var titles = [
    "Mission Letter", "First day at college journal", "Really sad letter", "Lost in New York Diary", "The Day I Got a Dog",
    "Reflections on a Rainy Day", "A Letter to My Future Self", "Grandma's Secret Recipe", "Surviving the Apocalypse", "A Love Letter to Pizza",
    "That Time I Got Lost in Walmart", "The Mystery of the Missing Socks", "Confessions of a Procrastinator", "The One That Got Away", "How I Met Your Mother (Not the Show)",
    "My 30-Day Social Media Detox", "The Great Spaghetti Incident", "My Summer Abroad", "The Haunted House on Elm Street", "Why Pineapple Belongs on Pizza",
    "Midnight Thoughts", "The Most Embarrassing Moment of My Life", "A Letter to My Future Children", "Memoirs of a Coffee Addict", "Adventures in Babysitting",
    "How to Fail at Cooking", "The Case of the Missing Homework", "That One Time I Saw a UFO", "The Secret Life of a House Cat", "Confessions of a Night Owl",
    "The Worst First Date Ever", "A Day in the Life of a Professional Napper", "The Science Behind Procrastination", "I Tried Meditation for a Week", "The Chronicles of My Broken Phone",
    "A Week Without Caffeine", "The Legend of the Lost Remote", "Tales from the Drive-Thru", "How I Accidentally Joined a Cult", "The Art of Doing Nothing",
    "Lessons I Learned from My Dog", "The Story of My First Car", "How I Survived High School", "That One Time I Met a Celebrity", "The Tale of the Missing WiFi",
    "Why I’ll Never Go Camping Again", "How I Became a Morning Person", "The Day My Alarm Betrayed Me", "Why You Should Never Trust AutoCorrect", "How to Win an Argument with Yourself",
    "The Struggles of Being Left-Handed", "The Curse of the Unfinished Book", "The Joy of Canceling Plans", "How to Survive a Family Road Trip"
];



const cards = []
for (let i = 0; i < 105; i++) {
    const metadata = {};
    metadata.date = dates[Math.floor(Math.random() * dates.length)];
    metadata.author = names[Math.floor(Math.random() * names.length)];
    metadata.title = titles[Math.floor(Math.random() * titles.length)];
    metadata.cover = covers[Math.floor(Math.random() * covers.length)];
    metadata.id = i
    cards.push(metadata);
};


function getYearFromDate(date) {
    return Number(date.slice(date.length - 4));
}

function dateMaxMin(dates) {
    const years = dates.map(date => getYearFromDate(date))
    return [Math.min(...years), Math.max(...years)]
}

const baseFilter = {
    sortBy: 'title',
    filterBy: {
        author: names,
        date: [
            Number(dateMaxMin(dates)[0]),
            Number(dateMaxMin(dates)[1])
        ]
    },
    stats: {
        total: cards.length,
        display: cards.length
    }
}

export function DocList() {

    const [filter, setFilter] = React.useState(baseFilter);
    const [cardList, setCardList] = React.useState(sortCards(cards, filter));
    const [modalShow, setModalShow] = React.useState(false);

    function handleUpload(data) {
        setCardList([...cardList, {
            title: data.title, author: data.author, date: data.date, id: 10000, cover: null} ])
    titles.push(data.title); names.push(data.author); dates.push(data.date);
    }

    function handleFilterData(data) {
        setFilter(data);
    }

    React.useEffect(() =>
        setCardList(filterAndSort(cards, filter)), [filter])


    function filterCards(cardList, filter) {
        var filteredCardList = cardList.filter(card =>
            filter.filterBy.author.includes(card.author)
            && getYearFromDate(card.date) <= Number(filter.filterBy.date[1])
            && getYearFromDate(card.date) >= Number(filter.filterBy.date[0])
        )
        return filteredCardList;
    }

    function sortCards(cardList, filter) {
        var newCards = cardList.map(card => card)
        if (filter.sortBy === 'date') {
            newCards.sort(
                function(a,b) {
                    let x = Number(a.date.slice(a.date.length - 5));
                    let y = Number(b.date.slice(b.date.length - 5));
                    return (x - y)
                }
            )
        }
        else {
        newCards.sort(
            function(a,b) {
                let x = a[filter.sortBy];
                let y = b[filter.sortBy];
                if (x < y) { return -1; }
                if (x > y) { return 1; }
                return 0
            }
        )
    }
        return newCards;
    }

    function filterAndSort(cardList, filter) {
        var newCardList = cardList.map(card => card);
        newCardList = sortCards(newCardList, filter);
        newCardList = filterCards(newCardList, filter);
        return newCardList;
    }



    return (
        <main className='container-fluid'>

            <SearchBar />
            <button className= 'btn btn-secondary' onClick={() => setModalShow(true)}>Upload new Document</button>
            <PopUp show={modalShow} cancel={() => setModalShow(false)} uploadData={handleUpload}/>
            <div className="container-fluid doc-list">
                <Filter sendFilterData={handleFilterData} baseFilter={baseFilter}/>
                <CardList cards={cardList}/>
            </div>
        </main>
    );
}