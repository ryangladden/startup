import React from 'react';
import DocCard from './DocCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InfiniteScroll from 'react-infinite-scroll-component';


export default function CardList() {

    const [cards, setCards] = useState([])

    

    function generateCards() {
        
        const newCards = [];
        
        for (let i = 0; i < 15; i++) {
            cards.push(
            <Col> 
                <DocCard />
            </Col>   );
        };
        return;
    }
    generateCards();

    return (
    <div className="doc-list-cards">
    <InfiniteScroll
        dataLength={cards.length}
        next={generateCards}
        hasMore={cards.length <= 45}
        loader={<p>Loading more documents</p>}
        endMessage={<p>End list</p>}>
            <Row xs={1} sm={2} md={3} lg={4} className='g-4'>
                {cards}
            </Row>
            </InfiniteScroll>
        </div>
    );
}