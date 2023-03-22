import './FindMatches.scss';
import { useEffect, useState } from 'react';
import Hammer from 'hammerjs'
import data from '../mocks/matches.json';
import {Card, Button} from 'react-bootstrap';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';


console.log(data)

const FindMatches = () => {
    const [matches, setMatches] = useState(JSON.parse(JSON.stringify(data)).mocks)
    const [currentMatch, setCurrentMatch] = useState(0)

    useEffect(() => {
        const currentMatchContainer = document.querySelector('.current-match');
        let xDown = null;
      
        currentMatchContainer.addEventListener('touchstart', handleTouchStart);
        currentMatchContainer.addEventListener('touchmove', handleTouchMove);
        currentMatchContainer.addEventListener('touchend', handleTouchEnd);
      
        function handleTouchStart(evt) {
          xDown = evt.touches[0].clientX;
        }
      
        function handleTouchMove(evt) {
          if (!xDown) {
            return;
          }
      
          const xDiff = xDown - evt.touches[0].clientX;
      
          if (xDiff > 0) {
            // Swipe left
            currentMatchContainer.classList.add('swipe-left');
          } else {
            // Swipe right
            currentMatchContainer.classList.add('swipe-right');
          }
        }
      
        function handleTouchEnd(evt) {
          if (!xDown) {
            return;
          }
      
          const xDiff = xDown - evt.changedTouches[0].clientX;
      
          if (xDiff > 0) {
            // Swipe left
            showNextMatch('left');
          } else {
            // Swipe right
            showNextMatch('right');
          }
      
          // Reset the swipe classes
          currentMatchContainer.classList.remove('swipe-left', 'swipe-right');
          xDown = null;
        }
      
        return () => {
          currentMatchContainer.removeEventListener('touchstart', handleTouchStart);
          currentMatchContainer.removeEventListener('touchmove', handleTouchMove);
          currentMatchContainer.removeEventListener('touchend', handleTouchEnd);
        };
      }, [currentMatch, matches]);
      

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

    const showNextMatch = (direction) => {
        const currentMatchContainer = document.querySelector('.current-match');
        const matchCard = currentMatchContainer.querySelector('.match-card');
      
        // Add the appropriate transform value based on the swipe direction
        if (direction === 'left') {
          matchCard.style.transform = 'translateX(-100%)';
        } else if (direction === 'right') {
          matchCard.style.transform = 'translateX(100%)';
        }
      
        // Wait for the transition to complete before updating the current match
        setTimeout(() => {
          if (currentMatch !== matches.length - 1) {
            setCurrentMatch(currentMatch + 1);
          } else {
            setCurrentMatch(0);
          }
      
          // Reset the transform value to 0 after the transition completes
          matchCard.style.transform = 'translateX(0)';
        }, 300); // This value should match the transition duration in your CSS
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
            <Stack direction="horizontal" className='main-menu' gap={3}>
                <div className="bg-light border">First item</div>
                <Button variant="link" className="play-button" onClick={() => {alert('click!')}}>
                    <img alt="discover" src="../../horse.svg" />
                    <span>Discover</span>
                </Button>
                <div className="bg-light border">Third item</div>
            </Stack>
        </Row>
        </Container>

}

export default FindMatches