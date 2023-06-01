import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import CharacterCard from '../components/CharacterCard';

export default function CharacterSearch() {
    const [search, setSearch] = useState("")
    const [character, setCharacter] = useState({})

    // runs query for specific character search based on user input
    function handleSearch() {
        const url = `https://swapi.dev/api/people/?search=${search}`

        axios.get(url)
            .then(res => {
                const fetchedCharacter = res.data.results[0]
                // state variable is set to empty object if no character is found
                setCharacter(fetchedCharacter || {})
            })
            .catch(err => {
                console.log(err)
            })
    }

    function handleChange(event) {
        setSearch(event.target.value)
    }

    return (
        <div>
            {/* TODO: Set up routing logic */}
            <button>Back to Home</button> 
            <SearchBar
                onChange={handleChange}
                onSearch={handleSearch}
                search={search}
            />
            {character ? (
                <CharacterCard
                    name={character.name}
                    birthYear={character.birth_year}
                    height={character.height}
                    mass={character.mass}
                    hairColor={character.hair_color}
                    species={character.species}
                    films={character.films}
                    starships={character.starships}
                />
            ) : <h3>No character found, please try again!</h3>
            }
        </div>
    )
}