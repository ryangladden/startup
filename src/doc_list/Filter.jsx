import React from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';


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

    for (const name in Array.from(new Set(baseFilter.filterBy.author.sort()))) {
        const current = Array.from(new Set(baseFilter.filterBy.author.sort()))[name];
        nameFilter.push(<Form.Check
        type='checkbox'
        label={current}
        key={'filter_' + name}
        defaultChecked={true}
        onChange={handleAuthorListChange}
        value={current}
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
                    label='Document title'
                    id='radio3'
                    value='title'
                    defaultChecked={true}
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
                    label='Date'
                    id='radio1'
                    value='date'
                    name='order'
                    onChange={handleSortChange}
                />
                </Form.Group>
            </Form>
            <br/>
            <h6>Authors:</h6>
            <div  className='name-filter'>
            {nameFilter}
            </div>
            <br/>
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
