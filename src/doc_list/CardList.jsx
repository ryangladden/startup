import React from 'react';
import DocCard from './DocCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InfiniteScroll from 'react-infinite-scroll-component';


export default function CardList() {
    const initialCards = []
    for (let i = 0; i < 15; i++) {
        initialCards.push(
        <Col> 
            <DocCard key={i}/>
        </Col>
        );
    };
    const [cards, setCards] = React.useState(initialCards)


    

    function generateCards() {

        console.log("YOU MADE IT TO THE BOTTOM BRO")
        const newCards = [];
        for (let i = cards.length; i < cards.length + 15; i++) {
            newCards.push(
            <Col> 
                <DocCard key={i}/>
            </Col>
            );
        };
        setCards(cards.concat(newCards))
    }

    function delayGeneration() {
        setTimeout(() => generateCards(), 1000)
    }

    return (
    <div className="doc-list-cards">
    <InfiniteScroll
        dataLength={cards.length}
        next={delayGeneration}
        hasMore={cards.length <= 150}
        loader={<p>Loading more documents</p>}
        height={700}
        endMessage={<p>End list</p>}>
            <Row xs={1} sm={2} md={3} lg={4} className='g-4'>
                {cards}
            </Row>
            </InfiniteScroll>
        </div>
    );
}