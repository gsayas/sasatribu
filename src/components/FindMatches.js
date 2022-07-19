import './FindMatches.css';
import { useEffect, useState } from 'react';
import Hammer from 'hammerjs'
import data from '../mocks/matches.json';
import {
    ThemeProvider,
    DefaultTheme,
    StyleReset,
    Button,
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
                <img src={match.picture} />
                <span>{match.name}</span>
                <span>{match.age}</span>
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
            brandRadius: "20px"
        }
    };

    return <div className='find-matches'>
        <ThemeProvider theme={theme}>
            <StyleReset />
            <h1>Tribu matching!</h1>
            <div className='current-match'>{renderMatch(matches.at(currentMatch))}</div>
            <Button bg="brand800" rounded="brandRadius">
                Submit
            </Button>
        </ThemeProvider>
    </div>

}

export default FindMatches