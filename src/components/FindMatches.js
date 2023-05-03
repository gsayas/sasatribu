import './FindMatches.scss';
import { useEffect, useState } from 'react';
// import Hammer from 'hammerjs'
import data from '../mocks/matches.json';
import {Button, Accordion, Card} from 'react-bootstrap';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';


console.log(data)

const FindMatches = () => {
    const [matches, setMatches] = useState(JSON.parse(JSON.stringify(data)).mocks)
    const [currentMatch, setCurrentMatch] = useState(0)
    const [expandedGalleryText, setExpandedGalleryText] = useState(false)



    useEffect(() => {
        const currentMatchContainer = document.querySelector('.current-match img');
        let xDown = null;
      
        currentMatchContainer.addEventListener('touchstart', handleTouchStart);
        currentMatchContainer.addEventListener('touchmove', handleTouchMove);
        currentMatchContainer.addEventListener('touchend', handleTouchEnd);

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

    function CustomToggle({ children, eventKey }) {
      const decoratedOnClick = useAccordionButton(eventKey, () => 
        setExpandedGalleryText(!expandedGalleryText)
      );
    
      return (
        <button
          type="button"
          onClick={decoratedOnClick}
          className={'rounded-circle expand-collapse-button'}
        >
          {children}
        </button>
      );
    }  
      

    const renderMatch = (match) => {
        return <div key={match.id} className='match-card'>
            <div className='gallery-container'>
              <div className='gallery'>
                  <div className='gallery-item'>
                    <img className='gallery-item-img' src={match.picture} alt='gallery item' />
                  </div>
                  <Accordion className='gallery-text'>
                    <Card>    
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <div>{`Link Address: extra`}</div>
                          <div>{`community board: extra`}</div>
                          <div>{`lat: extra`}</div>
                          <div>{`lon: extra`}</div>
                        </Card.Body>
                      </Accordion.Collapse>
                      <Card.Header>
                        <div>
                          <span>{match.name}, </span>
                          <span className='gallery-text-age'>{match.age} yo</span>
                          <div className='gallery-text-description'>
                            {match.description}                      
                          </div>
                        </div>
                        <CustomToggle eventKey="0">
                          {!expandedGalleryText ? <img src="../../arrow-up.svg" /> : <img src="../../arrow-down.svg" />}
                        </CustomToggle>
                      </Card.Header>
                    </Card>
                  </Accordion>
              </div>             
            </div>            
          </div>
    }     

    return <div className='background'>
        <Container>
            <Row className='header justify-content-md-center'>
                <Col xs lg="2">
                  <Button variant="link" className="profile" onClick={() => {alert('click!')}}>
                    <img 
                      alt="profile" 
                      src="../../profile-picture.jpg"
                      className='profile-picture'
                    />
                  </Button>
                </Col>
                <Col xs lg="4">
                    <h1>
                      <span className='section-title'>Discover</span>
                    </h1>
                </Col>
                <Col xs lg="2">
                    <Button variant="link" className="notifications" onClick={() => {alert('click!')}}>
                        <img alt="notifications" src="../../notification-icon.svg" />
                    </Button>
                </Col>
            </Row>

            <Row className='justify-content-md-center'>    
                <Col>
                    <div className='find-matches'>                    
                        <div className='current-match'>{renderMatch(matches.at(currentMatch))}</div>
                    </div>
                </Col>
            </Row>

            <Row className='footer justify-content-md-center'>
              <Col>
                <Stack direction="horizontal" className='main-menu' gap={3}>
                    <div className="bg-light border"></div>
                    <Button variant="link" className="play-button" onClick={() => {alert('click!')}}>
                        <img alt="discover" src="../../horse.svg" />
                        <span>Discover</span>
                    </Button>
                    <div className="bg-light border"></div>
                </Stack>
              </Col>
            </Row>
          </Container>
        </div>

}

export default FindMatches