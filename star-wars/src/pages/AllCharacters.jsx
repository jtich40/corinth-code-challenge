import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import CharacterList from '../components/CharacterList';

export default function AllCharacters() {
    const [search, setSearch] = useState("")
    const [characters, setCharacters] = useState([])
    const [nextUrl, setNextUrl] = useState("")
    const navigate = useNavigate()
    const allCharactersUrl = "https://swapi.dev/api/people/"

    // fetches data for all characters once component mounts
    useEffect(() => {
        console.log("useEffect is being called")
        handleAllCharacters(allCharactersUrl)
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
    function handleAllCharacters(url) {
        axios.get(url)
            .then(res => {
                console.log(res.data)
                const fetchedCharacters = res.data.results
                // only 
                setCharacters(prevCharacters => ( 
                    prevCharacters.length === 0 ? fetchedCharacters : [...prevCharacters, ...fetchedCharacters]
                    ))
                // update state variable nextUrl to include new url of characters
                setNextUrl(res.data.next)
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
                <CharacterList
                    key={character.name}
                    name={character.name}
                />
            ))}
            {nextUrl && <button onClick={() => handleAllCharacters(nextUrl)}>Show More</button>}
        </div>
    )
}