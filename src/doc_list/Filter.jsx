import React from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';


const dates = [
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

const names = [
    "Joe Mama", "John Doe", "Gary E. Stevenson", "Jane Smith", "Samuel Adams",
    "Rebecca Black", "Charles Montgomery", "Olivia Benson", "Ethan Hunt", "Margaret Thatcher",
    "Bruce Wayne", "Clark Kent", "Peter Parker", "Tony Stark", "Natasha Romanoff"
    // "Steve Rogers", "Diana Prince", "Barry Allen", "Wanda Maximoff", "Jean Grey",
    // "Bilbo Baggins", "Frodo Baggins", "Samwise Gamgee", "Gandalf the Grey", "Aragorn",
    // "Legolas Greenleaf", "Gimli", "Sauron", "Saruman", "Elrond",
    // "Obi-Wan Kenobi", "Anakin Skywalker", "Darth Vader", "Luke Skywalker", "Han Solo",
    // "Leia Organa", "Yoda", "Palpatine", "Kylo Ren", "Rey Skywalker",
    // "Homer Simpson", "Marge Simpson", "Bart Simpson", "Lisa Simpson", "Maggie Simpson",
    // "Walter White", "Jesse Pinkman", "Saul Goodman", "Gus Fring", "Mike Ehrmantraut",
    // "Sherlock Holmes", "John Watson", "James Moriarty"
];

const titles = [
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



export default function Filter( { sendFilterData, baseFilter } ) {

    const [filter, setFilter] = React.useState(baseFilter)

    function handleAuthorListChange(e) {
        var authors = filter.filterBy.author;
        var newAuthors = []
        if (e.target.checked) {
            authors.push(e.target.value);
            newAuthors = authors;
            console.log(e.target.value + " CHECKED");
        }
        else {
            newAuthors = authors.filter(name => name != e.target.value);
            console.log(e.target.value + " UNCHECKED")
        }
        console.log(newAuthors)
        setFilter({
            sortBy: filter.sortBy,
            filterBy: {
                author: newAuthors,
                date: filter.filterBy.date
            }
        })
    };
        
    function handleYearRangeChange(e) {
        console.log(e.target.name)
        if (e.target.name = 'year-lower') {
            setFilter({
                sortBy: filter.sortBy,
                filterBy: {
                    author: filter.filterBy.author,
                    date: [e.target.value, filter.filterBy.date[1]]
                }
            }) 
        }

        else {
            setFilter({
                sortBy: filter.sortBy,
                filterBy: {
                    author: filter.filterBy.author,
                    date: [filter.filterBy.date[0], e.target.value]
                }
            }) 
        }

    }

    function handleSortChange(e) {
        setFilter({
            sortBy: e.target.value,
            filterBy: {
                author: filter.filterBy.author,
                date: filter.filterBy.date
            }
        }) 
    }

    function handleClick() {
        sendFilterData(filter)
    }

    let nameFilter = [];

    for (const name in names.sort()) {
        nameFilter.push(<Form.Check
        type='checkbox'
        label={names[name]}
        key={'filter_' + name}
        defaultChecked={true}
        onChange={handleAuthorListChange}
        value={names[name]}
        />)
    }
    return (
        <div className="doc-list-filter">
            <h5>Filter document list</h5>
            <Form>
                <h6>Sort by:</h6>
                <Form.Group>
                <Form.Check
                    type='radio'
                    label='Date'
                    id='radio1'
                    value='date'
                    name='order'
                    onChange={handleSortChange}
                />
                <Form.Check
                    type='radio'
                    label='Author Name'
                    id='radio2'
                    value='author'
                    name='order'
                    onChange={handleSortChange}
                />
                <Form.Check
                    type='radio'
                    label='Document title'
                    id='radio3'
                    value='title'
                    defaultChecked={true}
                    name='order'
                    onChange={handleSortChange}
                />
                </Form.Group>
            </Form>
            <h6>Authors:</h6>
            <div  className='name-filter'>
            {nameFilter}
            </div>
            <h6>Year Range:</h6>
            <Form className='year-filter'>
                <Form.Group className='year-input'>
                    <Form.Label>
                        From
                    </Form.Label>
                    <Form.Control
                        type='year'
                        placeholder={baseFilter.filterBy.date[0]}
                        defaultValue={baseFilter.filterBy.date[0]}
                        className='year-box'
                        size='sm'
                        name='year-lower'
                        onChange={handleYearRangeChange}
                    />
                </Form.Group>
                <Form.Group className='year-input'>
                    <Form.Label>
                        To
                    </Form.Label>
                    <Form.Control
                        type='year'
                        placeholder={baseFilter.filterBy.date[1]}
                        className='year-box'
                        size='sm'
                        defaultValue={baseFilter.filterBy.date[1]}
                        name='year-upper'
                        onChange={handleYearRangeChange}
                    />
                </Form.Group>
            </Form>
            <br/>
            <Form.Group>
                <Button variant='primary' onClick={ handleClick }>
                Filter
                </Button>
                </Form.Group>
        </div>
    );
};
