import React from 'react';
import DocCard from './DocCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import InfiniteScroll from 'react-infinite-scroll-component';


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

    const [collabList, setCollabList] = React.useState([])

    React.useEffect(() => {
        async function getCollabs() {
        const collaborators = await getCollaborators()
        console.log(collaborators)
        setCollabList(collaborators);
        }
        getCollabs();
    }, [])

    async function getCollaborators() {
        const response = await fetch("/api/share/collaborators", {
            method: "get"
        })
        return await response.json();
    }

    return (
    <div className="doc-list-cards">
    {loaded ? (<Row xs={1} sm={2} md={3} lg={4} className='g-4'>
                {cardList.map(
                    (card) =>
                    (
                        <Col key={card._id}>
                            <DocCard data={card} collaborators={collabList} />
                        </Col>
                    )
                )
            }
            </Row>) : <h4>Loading...</h4>}
        </div>
    );
}