import './FindMatches.scss';
import { useEffect, useState } from 'react';
import Hammer from 'hammerjs'
import data from '../mocks/matches.json';
import {Card, Button} from 'react-bootstrap';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


console.log(data)

const FindMatches = () => {
    const [matches, setMatches] = useState(JSON.parse(JSON.stringify(data)).mocks)
    const [currentMatch, setCurrentMatch] = useState(0)

    useEffect(() => {
        const currentMatchContainer = document.querySelector('.current-match');

        const mc = new Hammer(currentMatchContainer);
        mc.on("panleft panright", function (ev) {

            if (ev.type === 'panleft') {
                console.log('rejected!')
            }

            if (ev.type === 'panright') {
                console.log('liked!')
            }

            showNextMatch();
        });
    })

    const renderMatch = (match) => {
        return <div key={match.id} className='match-card'>
            <Card>
                <Card.Img variant="top" src={match.picture} />
                <Card.Body>
                    <Card.Title>{match.name}</Card.Title>
                    <Card.Text>{match.age}</Card.Text>
                </Card.Body>
            </Card>
        </div>
    }

    const showNextMatch = () => {
        if (currentMatch !== matches.length - 1) {
            setCurrentMatch(currentMatch + 1)
        } else {
            setCurrentMatch(0)
        }
    }

    return <Container fluid>
        <Row>
            <Col>
                <h1>Tribu matching!</h1>
            </Col>
        </Row>
        <Row>    
            <Col>
                <div className='find-matches'>                    
                    <div className='current-match'>{renderMatch(matches.at(currentMatch))}</div>
                </div>
            </Col>
        </Row>
        <Row>
            <Col>
                <Button>
                    Discover
                </Button>
            </Col>    
        </Row>
        </Container>

}

export default FindMatches