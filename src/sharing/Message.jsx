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

       function formatDate(dateObj) {
            const date = new Date(dateObj);
            const today = Date.now()
            if (datesAreOnSameDay(Date.now(), date)) {
                return `${date.getHours()}:${date.getMinutes()}`
            } else if (datesAreInSameWeek(date, today)) {
                return `${date.toLocaleDateString([], { weekday: "long"})} ${date.getHours()}:${date.getMinutes()}`
            } 
            return `${date.toLocaleDateString([], { year: "numeric", month: "long", day: "numeric" })} ${date.getHours()}:${date.getMinutes()}`
    
        }
    
        function datesAreOnSameDay(day1, day2) {
            const a = new Date(day1);
            const b = new Date(day2)
            return a.getFullYear() === b.getFullYear() 
            && a.getMonth() === b.getMonth()
            && a.getDate() === b.getDate()
        }
    
        function datesAreInSameWeek(day1, day2) {
            return Number(day1) - Number(day2) <= 604800000;
        }


    return (
        <div  style={{display: 'flex', justifyContent: margins}}>
            <Card bg={cardColor} text='light' style={{maxWidth: '75%', margin: '5px', padding: '0'}}>
                <Card.Header style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', }}>
                        {/* <Image roundedCircle src="icon.webp" height='35px'></Image> */}
                        <Card.Title style={{fontSize: '12pt'}}>{sender}</Card.Title>
                    </div>
                    <Card.Subtitle style={{fontSize: '10pt'}}>{formatDate(time)}</Card.Subtitle>

                </Card.Header>
                <Card.Body>
                {share ? shareMessage : <Card.Text style={{fontSize: '12pt'}}>{message}</Card.Text>}
                </Card.Body>
            </Card>
        </div>
    )
}