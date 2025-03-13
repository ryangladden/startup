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


export function DocList() {

    const [cardList, setCardList] = React.useState([]);
    const [loaded, setLoaded] = React.useState(false);
    const [modalShow, setModalShow] = React.useState(false);
    const [query, setQuery] = React.useState("");

    React.useEffect( () => {
        async function fetchData() {
            const cards = await getCards("");
            setCardList(cards);
            setLoaded(true)
        }
        fetchData()
    }, []
    )


    React.useEffect( () => {
        async function fetchData() {
            const cards = await getCards(query);
            setCardList(cards);
        }
        fetchData()
    }, [query])

    async function getCards(query) {
        const cards = await fetch("/api/docs/list?" + query, {method: "get"});
        console.log("called /api/docs/list");
        return await cards.json();
    }

    function toggleModal() {
        setModalShow(true);
    }

    return (
        <main className='container-fluid'>

            <SearchBar upload={toggleModal}/>
            
            <PopUp show={modalShow} cancel={() => setModalShow(false)}/>
            <div className="container-fluid doc-list">
                <Filter setQuery={(query) => setQuery(query)}/>
                <CardList cardList={cardList} loaded={loaded}/>
            </div>
        </main>
    );
}