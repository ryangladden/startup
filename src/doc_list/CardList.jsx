import React from 'react';
import DocCard from './DocCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InfiniteScroll from 'react-infinite-scroll-component';


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


export default function CardList( { cardList, loaded } ) {

    function delayGeneration() {
        setTimeout(() => handleScrollEnd(), 1000)
    }

    // React.useEffect(() => {
    //     setCardList(props.cards.slice(0, cards.length))}, [props.cards]);  

    return (
    <div className="doc-list-cards">
    {loaded ? (<Row xs={1} sm={2} md={3} lg={4} className='g-4'>
                {cardList.map(
                    (card) =>
                    (
                        <Col key={card._id}>
                            <DocCard data={card} />
                        </Col>
                    )
                )
            }
            </Row>) : <h4>Loading...</h4>}
        </div>
    );
}