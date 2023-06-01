import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import CharacterCard from '../components/CharacterCard';

export default function AllCharacters() {
    const [search, setSearch] = useState("")
    const [characters, setCharacters] = useState([])
    const navigate = useNavigate()

    // fetches data for all characters once component mounts
    useEffect(() => {
        handleAllCharacters()
    }, [])

    function handleChange(event) {
        setSearch(event.target.value)
    }

    // redirect to character search page if user searches for a character
    function handleSearch(event) {
        event.preventDefault()
        if (search) {
            navigate(`/character/${search}`)
        }
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
                    key={character.name}
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