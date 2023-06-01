import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

export default function Home() {
    const [search, setSearch] = useState("")
    const navigate = useNavigate()

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

    // redirect to all characters page
    function handleClick() {
        navigate("/characters")
    }

    return (
        <div>
            <h1>Star Wars Search</h1>
            <div>Hero here</div>
            <h3>Search for your favorite Star Wars character below!</h3>
            <SearchBar
                onChange={handleChange}
                onSearch={handleSearch}
                search={search}
            />
            <button onClick={handleClick} >View All Characters</button>
        </div>
    )
}