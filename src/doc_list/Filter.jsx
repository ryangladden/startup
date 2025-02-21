import React from 'react';
import { Form } from 'react-bootstrap';

export default function Filter() {

    const [filter, setFilter] = React.useState(
        {
            sortBy: 'title',
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

    )

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
        console.log("changed sort")
        setFilter({
            sortBy: e.target.value,
            filterBy: {
                author: filter.filterBy.author,
                date: filter.filterBy.date
            }
        }) 
        console.log(filter)
    }


    const names = [
        "Joe Mama",
        "John Doe",
        "Gary E. Stevenson"
    ]

    let nameFilter = [];

    for (const name in names) {
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
                    name='order'
                    onChange={handleSortChange}
                />
                </Form.Group>
            </Form>
            <h6>Authors:</h6>
            {nameFilter}
            <h6>Year Range:</h6>
            <Form className='year-filter'>
                <Form.Group className='year-input'>
                    <Form.Label>
                        From
                    </Form.Label>
                    <Form.Control
                        type='year'
                        placeholder='1958'
                        defaultValue={1958}
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
                        placeholder='2000'
                        className='year-box'
                        size='sm'
                        defaultValue={2000}
                        name='year-upper'
                        onChange={handleYearRangeChange}
                    />
                </Form.Group>
            </Form>
        </div>
    );
};
