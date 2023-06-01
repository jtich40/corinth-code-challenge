import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import CharacterCard from '../components/CharacterCard';

export default function AllCharacters() {
    const [search, setSearch] = useState("")
    const [characters, setCharacters] = useState([])

    // fetches data for all characters once component mounts
    useEffect(() => {
        handleAllCharacters()
    }, [])

    function handleChange(event) {
        setSearch(event.target.value)
    }

    // runs query for specific character search based on user input
    function handleSearch() {
        const searchUrl = `https://swapi.dev/api/people/?search=${search}`

        axios.get(searchUrl)
            .then(res => {
                const character = res.data.results[0]
                console.log(character)
            })
            .catch(err => {
                console.log(err)
            })
    }

    // fetches data for all characters
    function handleAllCharacters() {
        const allCharactersUrl = "https://swapi.dev/api/people/"

        axios.get(allCharactersUrl)
            .then(res => {
                const fetchedCharacters = res.data.results
                // set state variable to array of all characters
                setCharacters(fetchedCharacters)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            <SearchBar
                onChange={handleChange}
                onSearch={handleSearch}
                search={search}
            />
            {characters.map(character => (
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
            ))}
            <button>Show More</button>
        </div>
    )
}