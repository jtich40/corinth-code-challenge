import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';

export default function Home() {
    const [search, setSearch] = useState("")
    
    function handleChange(event) {
        setSearch(event.target.value)
    }

    // runs query for specific character search based on user input
    function handleSearch() {
        const url = `https://swapi.dev/api/people/?search=${search}`

        axios.get(url)
        .then(res => {
            const character = res.data.results[0]
            console.log(character)
        })
        .catch(err => {
            console.log(err)
        })
    }

    // redirect to all characters page
    function handleClick() {
    // TODO: set up redirect with routing logic   
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