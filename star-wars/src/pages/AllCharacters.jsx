import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';

import SearchBar from '../components/SearchBar';
import CharacterList from '../components/CharacterList';

export default function AllCharacters() {
    const [search, setSearch] = useState("")
    const navigate = useNavigate()
    const url = "https://swapi.dev/api/people/"

    // fetches data for all characters by starting at root url and paginating
    const findCharacters = async ({ pageParam = url }) => {
        const res = await axios.get(pageParam)
        console.log(res.data)
        return res.data
    }

    // define infinite query to add characters from new pages to existing characters
    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['characters'],
        queryFn: findCharacters,
        // use getNextPageParam to get next url from previous page
        getNextPageParam: (lastPage, pages) => lastPage.next || undefined,
    })
    // use flatMap to flatten array of arrays of characters into single array
    const characters = data?.pages.flatMap(page => page.results) || []

    if (isLoading) {
        return <h3>Using the Force to search the galaxy...</h3>
    }

    if (isError) {
        return <h3>A disturbance in the Force there has been...</h3>
    }

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

    function handleClick() {
        navigate("/")
    }

    return (
        <div>
            <div className="flex justify-start">
                <button onClick={handleClick} className="btn btn-warning mb-10" >Back to Home</button>
            </div>
            <h1 className="mb-5" >Search your feelings. You know the character to type below.</h1>
            <SearchBar
                onChange={handleChange}
                onSearch={handleSearch}
                search={search}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {characters.map(character => (
                <CharacterList
                    key={character.name}
                    name={character.name}
                />
            ))}
            </div>
            <button
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
                className="btn btn-warning mt-8"
            >
                {isFetchingNextPage ? 'Loading more...' : 'Show More'}
            </button>
        </div>
    )
}