import React from 'react';
import { Card, Image, Button } from 'react-bootstrap';

export default function Message( {sender, time, message, share} ) {

    const margins = (sender != 'You' ? 'flex-start' : 'flex-end')
    const cardColor = (sender != 'You' ? 'primary' : 'dark')
    const textColor = (sender != 'You' ? 'dark' : 'light')
    const shareMessage = (
        <>
        <Card.Text style={{fontStyle: 'italic', fontSize: '12pt', paddingBottom: '5px'}}>shared a document with you</Card.Text>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}>
            <Button size='sm' variant='dark'>View document</Button>
        </div>
        </>
    )


    return (
        <div  style={{display: 'flex', justifyContent: margins}}>
            <Card bg={cardColor} text='light' style={{maxWidth: '75%', margin: '5px', padding: '0'}}>
                <Card.Header style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', }}>
                        <Image roundedCircle src="icon.webp" height='35px'></Image>
                        <Card.Title style={{fontSize: '12pt'}}>{sender}</Card.Title>
                    </div>
                    <Card.Subtitle style={{fontSize: '10pt'}}>{time}</Card.Subtitle>

                </Card.Header>
                <Card.Body>
                {share ? shareMessage : <Card.Text style={{fontSize: '12pt'}}>{message}</Card.Text>}
                </Card.Body>
            </Card>
        </div>
    )
}