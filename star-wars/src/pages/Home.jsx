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
        <div className="home-root" >
            <div className="hero home min-h-screen" style={{ backgroundImage: `url("/images/hyperspace.gif")` }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-6xl text-primary ">May the Search Be with You!</h1>
                        <p className="mb-5 text-2xl text-primary ">Knowledge is the path to the Force. Type a Star Wars character's name and begin your quest!</p>
                        <SearchBar
                            onChange={handleChange}
                            onSearch={handleSearch}
                            search={search}
                        />
                        <button onClick={handleClick} className="btn btn-primary mt-5" >View All Characters</button>
                    </div>
                </div>
            </div>
        </div>
    )
}