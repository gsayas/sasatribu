import './FindMatches.css';
import { useEffect, useState } from 'react';
import Hammer from 'hammerjs'
import data from '../mocks/matches.json';
import {
    ThemeProvider,
    DefaultTheme,
    StyleReset,
    Button,
    Image,
    Div,
    Text
  } from "react-atomize";

console.log(data)

const FindMatches = () => {
    const [matches, setMatches] = useState(JSON.parse(JSON.stringify(data)).mocks)
    const [currentMatch, setCurrentMatch] = useState(0)

    useEffect(() => {
        const currentMatchContainer = document.querySelector('.current-match');

        const mc = new Hammer(currentMatchContainer);
        mc.on("panleft panright", function (ev) {

            if (ev.type == 'panleft') {
                console.log('rejected!')
            }

            if (ev.type == 'panright') {
                console.log('liked!')
            }

            showNextMatch();
        });
    })

    const renderMatch = (match) => {
        return <div key={match.id} className='match-card'>
            <pre>
                <Image src={match.picture} h="11rem" w="11rem" />
                <Div>{match.name}</Div>
                <Div>{match.age}</Div>
            </pre>
        </div>
    }

    const showNextMatch = () => {
        if (currentMatch != matches.length - 1) {
            setCurrentMatch(currentMatch + 1)
        } else {
            setCurrentMatch(0)
        }
    }

    const theme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            brand800: "#671de1"
        },
        rounded: {
            ...DefaultTheme.rounded,
            brandRadius: "50%"
        }
    };

    return <div className='find-matches'>
        <ThemeProvider theme={theme}>
            <StyleReset />
            <Text tag="h1" textSize="display1" m={{ b: "4rem" }}>Tribu matching!</Text>
            <div className='current-match'>{renderMatch(matches.at(currentMatch))}</div>
            <Button 
                bg="brand800" 
                rounded="brandRadius" 
                h="4rem"
                w="4rem">
                Discover
            </Button>
        </ThemeProvider>
    </div>

}

export default FindMatches