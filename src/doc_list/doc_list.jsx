import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import './doc_list.css'
import CardList from './CardList'

export function DocList() {
    return (
        <main className='container-fluid'>
            <div className="doc-list-header">
                <h3>Username's Documents</h3>
                <input type="text" className="form-control search-input" placeholder="search by author, document type, date..." />
                <button className="btn btn-secondary">Search</button>
            </div>
            <div className="container-fluid doc-list">
                <div className="doc-list-filter">
                    <p>filterstuff</p>
                </div>
                <CardList />
                {/* <div className="doc-list-cards">
                    <Row xs={1} sm={2} md={3} lg={4} className='g-4'>
                        <Col>

                                <Card>
                                    <Link to='/doc-viewer'>
                                    <Card.Img variant="top" src="journal.png" className='card-img' style={{ height: '200px', objectFit: 'cover' }} />
                                    </Link>
                                    <Card.Body>
                                        <Card.Title>Document 1</Card.Title>
                                        <Card.Subtitle>Journal</Card.Subtitle>
                                        <Card.Text>
                                            <div>Author: John Doe</div>
                                            <div>12 July 1968</div>
                                        </Card.Text>
                                        <Card.Link to="/doc-viewer">View</Card.Link>
                                        <Card.Link to="/sharing">Share</Card.Link>
                                    </Card.Body>
                                </Card>
                        </Col>
                            <Col>
                                <Card>
                                    <Card.Img variant="top" src="letter.png" className='card-img' style={{ height: '200px', objectFit: 'cover' }} />
                                    <Card.Body>
                                        <Card.Title>Document 2</Card.Title>
                                        <Card.Subtitle>Letter</Card.Subtitle>
                                        <Card.Text>
                                            <div>Author: Sharon Nelson</div>
                                            <div>1 September 1973</div>
                                        </Card.Text>
                                        <Card.Link to="/doc-viewer">View</Card.Link>
                                        <Card.Link to="/sharing">Share</Card.Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>

<Card>
    <Link to='/doc-viewer'>
    <Card.Img variant="top" src="journal.png" className='card-img' style={{ height: '200px', objectFit: 'cover' }} />
    </Link>
    <Card.Body>
        <Card.Title>Document 1</Card.Title>
        <Card.Subtitle>Journal</Card.Subtitle>
        <Card.Text>
            <div>Author: John Doe</div>
            <div>12 July 1968</div>
        </Card.Text>
        <Card.Link to="/doc-viewer">View</Card.Link>
        <Card.Link to="/sharing">Share</Card.Link>
    </Card.Body>
</Card>
</Col>
<Col>
<Card>
    <Card.Img variant="top" src="letter.png" className='card-img' style={{ height: '200px', objectFit: 'cover' }} />
    <Card.Body>
        <Card.Title>Document 2</Card.Title>
        <Card.Subtitle>Letter</Card.Subtitle>
        <Card.Text>
            <div>Author: Sharon Nelson</div>
            <div>1 September 1973</div>
        </Card.Text>
        <Card.Link to="/doc-viewer">View</Card.Link>
        <Card.Link to="/sharing">Share</Card.Link>
    </Card.Body>
</Card>
</Col>
<Col>

<Card>
    <Link to='/doc-viewer'>
    <Card.Img variant="top" src="journal.png" className='card-img' style={{ height: '200px', objectFit: 'cover' }} />
    </Link>
    <Card.Body>
        <Card.Title>Document 1</Card.Title>
        <Card.Subtitle>Journal</Card.Subtitle>
        <Card.Text>
            <div>Author: John Doe</div>
            <div>12 July 1968</div>
        </Card.Text>
        <Card.Link to="/doc-viewer">View</Card.Link>
        <Card.Link to="/sharing">Share</Card.Link>
    </Card.Body>
</Card>
</Col>
<Col>
<Card>
    <Card.Img variant="top" src="letter.png" className='card-img' style={{ height: '200px', objectFit: 'cover' }} />
    <Card.Body>
        <Card.Title>Document 2</Card.Title>
        <Card.Subtitle>Letter</Card.Subtitle>
        <Card.Text>
            <div>Author: Sharon Nelson</div>
            <div>1 September 1973</div>
        </Card.Text>
        <Card.Link to="/doc-viewer">View</Card.Link>
        <Card.Link to="/sharing">Share</Card.Link>
    </Card.Body>
</Card>
</Col>
<Col>

<Card>
    <Link to='/doc-viewer'>
    <Card.Img variant="top" src="journal.png" className='card-img' style={{ height: '200px', objectFit: 'cover' }} />
    </Link>
    <Card.Body>
        <Card.Title>Document 1</Card.Title>
        <Card.Subtitle>Journal</Card.Subtitle>
        <Card.Text>
            <div>Author: John Doe</div>
            <div>12 July 1968</div>
        </Card.Text>
        <Card.Link to="/doc-viewer">View</Card.Link>
        <Card.Link to="/sharing">Share</Card.Link>
    </Card.Body>
</Card>
</Col>
<Col>
<Card>
    <Card.Img variant="top" src="letter.png" className='card-img' style={{ height: '200px', objectFit: 'cover' }} />
    <Card.Body>
        <Card.Title>Document 2</Card.Title>
        <Card.Subtitle>Letter</Card.Subtitle>
        <Card.Text>
            <div>Author: Sharon Nelson</div>
            <div>1 September 1973</div>
        </Card.Text>
        <Card.Link to="/doc-viewer">View</Card.Link>
        <Card.Link to="/sharing">Share</Card.Link>
    </Card.Body>
</Card>
</Col>
<Col>

<Card>
    <Link to='/doc-viewer'>
    <Card.Img variant="top" src="journal.png" className='card-img' style={{ height: '200px', objectFit: 'cover' }} />
    </Link>
    <Card.Body>
        <Card.Title>Document 1</Card.Title>
        <Card.Subtitle>Journal</Card.Subtitle>
        <Card.Text>
            <div>Author: John Doe</div>
            <div>12 July 1968</div>
        </Card.Text>
        <Card.Link to="/doc-viewer">View</Card.Link>
        <Card.Link to="/sharing">Share</Card.Link>
    </Card.Body>
</Card>
</Col>
<Col>
<Card>
    <Card.Img variant="top" src="letter.png" className='card-img' style={{ height: '200px', objectFit: 'cover' }} />
    <Card.Body>
        <Card.Title>Document 2</Card.Title>
        <Card.Subtitle>Letter</Card.Subtitle>
        <Card.Text>
            <div>Author: Sharon Nelson</div>
            <div>1 September 1973</div>
        </Card.Text>
        <Card.Link to="/doc-viewer">View</Card.Link>
        <Card.Link to="/sharing">Share</Card.Link>
    </Card.Body>
</Card>
</Col>
<Col>

<Card>
    <Link to='/doc-viewer'>
    <Card.Img variant="top" src="journal.png" className='card-img' style={{ height: '200px', objectFit: 'cover' }} />
    </Link>
    <Card.Body>
        <Card.Title>Document 1</Card.Title>
        <Card.Subtitle>Journal</Card.Subtitle>
        <Card.Text>
            <div>Author: John Doe</div>
            <div>12 July 1968</div>
        </Card.Text>
        <Card.Link to="/doc-viewer">View</Card.Link>
        <Card.Link to="/sharing">Share</Card.Link>
    </Card.Body>
</Card>
</Col>
<Col>
<Card>
    <Card.Img variant="top" src="letter.png" className='card-img' style={{ height: '200px', objectFit: 'cover' }} />
    <Card.Body>
        <Card.Title>Document 2</Card.Title>
        <Card.Subtitle>Letter</Card.Subtitle>
        <Card.Text>
            <div>Author: Sharon Nelson</div>
            <div>1 September 1973</div>
        </Card.Text>
        <Card.Link to="/doc-viewer">View</Card.Link>
        <Card.Link to="/sharing">Share</Card.Link>
    </Card.Body>
</Card>
</Col>
                        <Col>

                                <Card>
                                    <Link to='/doc-viewer'>
                                    <Card.Img variant="top" src="journal.png" className='card-img' style={{ height: '200px', objectFit: 'cover' }} />
                                    </Link>
                                    <Card.Body>
                                        <Card.Title>Document 1</Card.Title>
                                        <Card.Subtitle>Journal</Card.Subtitle>
                                        <Card.Text>
                                            <div>Author: John Doe</div>
                                            <div>12 July 1968</div>
                                        </Card.Text>
                                        <Card.Link to="/doc-viewer">View</Card.Link>
                                        <Card.Link to="/sharing">Share</Card.Link>
                                    </Card.Body>
                                </Card>
                        </Col>
                            <Col>
                                <Card>
                                    <Card.Img variant="top" src="letter.png" className='card-img' style={{ height: '200px', objectFit: 'cover' }} />
                                    <Card.Body>
                                        <Card.Title>Document 2</Card.Title>
                                        <Card.Subtitle>Letter</Card.Subtitle>
                                        <Card.Text>
                                            <div>Author: Sharon Nelson</div>
                                            <div>1 September 1973</div>
                                        </Card.Text>
                                        <Card.Link to="/doc-viewer">View</Card.Link>
                                        <Card.Link to="/sharing">Share</Card.Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                    </Row>

                </div> */}
            </div>
        </main>
    );
}