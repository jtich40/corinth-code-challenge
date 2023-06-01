import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import CharacterCard from '../components/CharacterCard';

export default function CharacterSearch() {
    // grabs search term from url
    const { search } = useParams()
    console.log(search)
    const [searchTerm, setSearchTerm] = useState(search || "")
    const [character, setCharacter] = useState({})
    console.log(searchTerm)
    const navigate = useNavigate()

    // runs data fetch for initial query and new query if search term changes
    useEffect(() => {
        if (search) {
            // update search term state variable to match search term from url
            setSearchTerm(search)
            const url = `https://swapi.dev/api/people/?search=${search}`
            console.log(searchTerm)

            axios.get(url)
                .then(res => {
                    console.log(res.data.results[0])
                    const fetchedCharacter = res.data.results[0]
                    console.log(fetchedCharacter)
                    // state variable is updated with character data
                    setCharacter(fetchedCharacter || {})
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [search])

    // runs query for specific character search based on user input
    function handleSearch(event) {
        event.preventDefault()
        // update url to match search term
        navigate(`/character/${searchTerm}`)
    }

    function handleChange(event) {
        setSearchTerm(event.target.value)
    }

    function handleClick() {
        navigate("/")
    }

    return (
        <div>
            <button onClick={handleClick} >Back to Home</button>
            <SearchBar
                onChange={handleChange}
                onSearch={handleSearch}
                search={searchTerm}
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