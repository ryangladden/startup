import React from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';


export default function Filter( { setQuery } ) {

    const [filter, setFilter] = React.useState({dates: [0,0], names: []});
    const [loaded, setLoaded] = React.useState(false);
    const [exclude, setExclude] = React.useState([]);
    const [dateRange, setDateRange] = React.useState(filter.dates);
    const [sortBy, setSortBy] = React.useState("title");

    async function getFilter() {
        const filter = await fetch("/api/docs/filter", {method: "get"});
        console.log("called /api/docs/filter");
        return await filter.json();
    }

    function sendFilter() {
        setQuery(generateQuery())

    }

    function generateQuery() {
        var query = "";
        query += "sortby=" + sortBy;
        query += "&daterange=" + dateRange[0] + "," + dateRange[1];
        query += "&exclude=";
        var excludeString = "";
        for (const name of exclude) {
            console.log(name);
            excludeString += name.replace(" ", "%20") + " ";
            console.log(excludeString);
        }
        query += excludeString.trim().replace(" ", ",")
        return query;
    }

    React.useEffect( () => {
        setDateRange(filter.dates);
    }, [filter])

    React.useEffect( () => {
        async function fetchFilter() {
            const filter = await getFilter();
            setFilter(filter);
            setLoaded(true);
        }
        fetchFilter();
    }, [])

    function handleAuthorListChange(e) {
        if (e.target.checked) {
            setExclude(exclude.filter(name => name != e.target.value));
            console.log("Checked")
            console.log(exclude);
        }
        else {
            setExclude([...exclude, e.target.value])
            console.log("Unchecked");
            console.log(exclude);
        }
    };

    function handleSortChange(e) {
        setSortBy(e.target.value);
        console.log(sortBy);
        console.log(generateQuery());
    }

    return (
        <div className="doc-list-filter">
            <h5>Filter document list</h5>
            <Form>
                <h6>Sort by:</h6>
                <Form.Group>
                <Form.Check type='radio' label='Document title' id='radio3' value='title' defaultChecked={true} name='order'  onChange={handleSortChange}/>
                <Form.Check type='radio' label='Author Name' id='radio2' value='author' name='order' onChange={handleSortChange} />
                <Form.Check type='radio' label='Date' id='radio1' value='date' name='order' onChange={handleSortChange} />
                </Form.Group>
            </Form>
            <br/>
            {loaded ? <>
            <h6>Authors:</h6>
            <div  className='name-filter'>
            {filter.authors.map((name) => <Form.Check type = 'checkbox' label={name} key={"filter_" + name} defaultChecked={true} onChange={handleAuthorListChange} value={name} />)}
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
                        placeholder={filter.dates[0]}
                        defaultValue={filter.dates[0]}
                        className='year-box'
                        size='sm'
                        name='year-lower'
                        onChange={(e) => setDateRange([e.target.value, dateRange[1]])}
                    />
                </Form.Group>
                <Form.Group className='year-input'>
                    <Form.Label>
                        To
                    </Form.Label>
                    <Form.Control
                        type='year'
                        placeholder={filter.dates[1]}
                        className='year-box'
                        size='sm'
                        defaultValue={filter.dates[1]}
                        name='year-upper'
                        onChange={(e) => setDateRange([dateRange[0], e.target.value])}
                    />
                </Form.Group>
            </Form>
            </> : <h4>Loading...</h4>}
            <br/>
            <Form.Group>
                <Button variant='primary' onClick={ sendFilter }>
                Filter
                </Button>
                </Form.Group>
        </div>
    );
};
