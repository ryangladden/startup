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

const cards = []
for (let i = 0; i < 105; i++) {
    const metadata = {};
    metadata.date = dates[Math.floor(Math.random() * 3)];
    metadata.author = names[Math.floor(Math.random() * 3)];
    metadata.title = titles[Math.floor(Math.random() * 3)];
    metadata.cover = covers[Math.floor(Math.random() * 3)];
    cards.push(
    <Col> 
        <DocCard key={metadata.title + "_" + i} data={metadata}/>
    </Col>
    );
};


export default function CardList() {
    const initialCards = []
    for (let i = 0; i < 15; i++) {
        const metadata = {};
        metadata.date = dates[Math.floor(Math.random() * 3)];
        metadata.author = names[Math.floor(Math.random() * 3)];
        metadata.title = titles[Math.floor(Math.random() * 3)];
        metadata.cover = covers[Math.floor(Math.random() * 3)];
        initialCards.push(
        <Col  key={i}> 
            <DocCard data={metadata}/>
        </Col>
        );
    };
    const [cards, setCards] = React.useState(initialCards)


    

    function generateCards() {

        console.log("YOU MADE IT TO THE BOTTOM BRO")
        const newCards = [];
        for (let i = cards.length; i < cards.length + 15; i++) {

            const metadata = {};
            metadata.date = dates[Math.floor(Math.random() * 3)];
            metadata.author = names[Math.floor(Math.random() * 3)];
            metadata.title = titles[Math.floor(Math.random() * 3)];
            metadata.cover = covers[Math.floor(Math.random() * 3)];
            newCards.push(
            <Col> 
                <DocCard key={i} data={metadata}/>
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