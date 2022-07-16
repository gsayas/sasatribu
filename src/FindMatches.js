import { useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom';
import Hammer from 'hammerjs'

const FindMatches = () => {
    const [matches, setMatches] = useState([
        {
            id: 1,
            name: 'Anakasha',
            lastName: 'Lopez',
            age: '6',
            languages: ['en', 'es'],
            country: 'ES'
        },
        {
            id: 2,
            name: 'Antonia',
            lastName: 'Messi',
            age: '2',
            languages: ['es'],
            country: 'AR'
        },
        {
            id: 3,
            name: 'Illan',
            lastName: 'Perez',
            age: '3',
            languages: ['es'],
            country: 'ES'
        }
    ])
    const [currentMatch, setCurrentMatch] = useState(0)

    useEffect(() => {
        console.log('mounting')
        const currentMatchContainer = document.querySelector('.current-match');
        const root = ReactDOM.createRoot(currentMatchContainer);

        root.render(renderMatch(matches.at(currentMatch)))
        
        
        var mc = new Hammer(currentMatchContainer);
        mc.on("panleft panright", function(ev) {

            if(ev.type == 'panleft'){
                console.log('reject!')
            }

            showNextMatch();
        });
    })

    const renderMatch = (match) => {
        console.log(match)
        return <div key={match.id}>
                    <pre>
                        <span>{match.name}</span>
                        <span>{match.age}</span>
                    </pre>
                </div>
    }

    const showNextMatch = () => {
        if(currentMatch != matches.length-1){
            setCurrentMatch(currentMatch + 1)
        }else{
            setCurrentMatch(0)
        }
    }

    return <div className='find-matches'>
        <h1>Tribu matching!</h1>
        <div className='current-match'></div>
    </div>

}

export default FindMatches