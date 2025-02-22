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

const randomCards = []
for (let i = 0; i < 105; i++) {
    const metadata = {};
    metadata.date = dates[Math.floor(Math.random() * 3)];
    metadata.author = names[Math.floor(Math.random() * 3)];
    metadata.title = titles[Math.floor(Math.random() * 3)];
    metadata.cover = covers[Math.floor(Math.random() * 3)];
    randomCards.push(
    <Col> 
        <DocCard key={metadata.title + "_" + i} data={metadata}/>
    </Col>
    );
};


export default function CardList(props) {

    const [cards, setCardList] = React.useState(props.cards.slice(0,15));

    function handleScrollEnd() {
        const currentSize = cards.length
        setCardList(props.cards.slice(0, currentSize + 15))
    }

    function delayGeneration() {
        setTimeout(() => handleScrollEnd(), 1000)
    }

    React.useEffect(() => {
        setCardList(props.cards.slice(0, cards.length))}, [props.cards]);  

    return (
    <div className="doc-list-cards">
    <InfiniteScroll
        dataLength={cards.length}
        next={delayGeneration}
        hasMore={cards.length < props.cards.length}
        loader={<p>Loading more documents</p>}
        height={700}
        endMessage={<p>End list</p>}>
            <Row xs={1} sm={2} md={3} lg={4} className='g-4'>
                {cards.map(
                    card =>
                    (
                        <Col key={card.id}>
                            <DocCard data={card} />
                        </Col>
                    )
                )
            }
            </Row>
            </InfiniteScroll>
        </div>
    );
}