import { useEffect, useState } from 'react';

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

    useEffect(() => {
        console.log('mounting')
    }
    )

    return <div className='find-matches'>
        <h1>Tribu matching!</h1>
        {matches.map((match) =>
            <div key={match.id}>
                <pre>
                    <span>{match.name}</span>
                    <span>{match.age}</span>
                </pre>
            </div>
        )}
    </div>

}

export default FindMatches