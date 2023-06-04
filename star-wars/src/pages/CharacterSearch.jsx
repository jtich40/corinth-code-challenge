import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import SearchBar from '../components/SearchBar';
import CharacterCard from '../components/CharacterCard';

export default function CharacterSearch() {
    // grabs search term from url
    const { search } = useParams()
    const [searchTerm, setSearchTerm] = useState(search || "")
    const [queryTerm, setQueryTerm] = useState(search || "")
    const navigate = useNavigate()

    const findCharacter = async (search) => {
        if (!search) return
        const url = `https://swapi.dev/api/people/?search=${search}`
        const res = await axios.get(url)
        // if character is not found, throw error
        if (res.data.results.length === 0) {
            throw new Error("The dark side clouds everything. Impossible to see, the character is...")
        }
        return res.data.results[0]
    }

    const findDataByUrl = async (url) => {
        const res = await axios.get(url)
        return res.data
    }

    // query to fetch data for a single character based on search
    const {
        data: character,
        error: characterError,
        isLoading: characterLoading,
        isError,
        status: characterStatus
    } = useQuery({
        queryKey: ['character', queryTerm],
        queryFn: () => findCharacter(queryTerm),
        enabled: !!queryTerm,
    })
    // query to fetch data for character's homeworld
    const {
        data: homeworld,
        isLoading: homeworldLoading,
        status: homeworldStatus,
    } = useQuery({
        queryKey: ['homeworld', character?.homeworld],
        queryFn: () => findDataByUrl(character.homeworld),
        // transform data to only return name
        select: data => data.name,
        enabled: !!character
    })
    // only run query if character has species
    const {
        data: species,
        isLoading: speciesLoading,
        status: speciesStatus,
    } = useQuery({
        queryKey: ['species', character?.species[0]],
        queryFn: () => findDataByUrl(character.species[0]),
        // transform data to only return name
        select: data => data.name,
        enabled: !!character && !!character.species.length
    })
    // query to fetch data for character's films
    const {
        data: films,
        isLoading: filmsLoading,
        status: filmsStatus,
    } = useQuery({
        queryKey: ['films', character?.films],
        queryFn: () => Promise.all(character.films.map(findDataByUrl)),
        // transform data to map over films and return each film title
        select: data => data.map(film => film.title).join(", "),
        enabled: !!character
    })
    // only run query if character has starships
    const {
        data: starships,
        isLoading: starshipsLoading,
        status: starshipsStatus,
    } = useQuery({
        queryKey: ['starships', character?.starships],
        queryFn: () => Promise.all(character.starships.map(findDataByUrl)),
        // transform data to map over starships and return each starship name
        select: data => data.map(starship => starship.name).join(", "),
        enabled: !!character && !!character.starships.length
    })
    // loading state for all queries
    const dataLoading = (
        characterLoading ||
        homeworldLoading ||
        (character?.species.length > 0 && speciesLoading) ||
        filmsLoading ||
        (character?.starships.length > 0 && starshipsLoading)
    )
    // success state for all queries
    const characterData = (
        characterStatus === 'success' &&
        homeworldStatus === 'success' &&
        (!character.species.length || speciesStatus === 'success') &&
        (!character.starships.length || starshipsStatus === 'success') &&
        filmsStatus === 'success'
    )

    // runs query for specific character search based on user input
    function handleSearch(event) {
        event.preventDefault()
        // update url to match search term
        navigate(`/character/${searchTerm}`)
        // update query to match search term for new searches
        setQueryTerm(searchTerm)
    }

    function handleChange(event) {
        setSearchTerm(event.target.value)
    }

    function handleClick() {
        navigate("/")
    }

    return (
        <div>
           
            {isError ? (
                <h3>{characterError.message}</h3>
            ) : dataLoading ? (
                <h3>Using the Force to search the galaxy...</h3>
            ) : characterData && (
                <div>
                    <div className="flex justify-start">
                        <button onClick={handleClick} className="btn btn-warning mb-10" >Back to Home</button>
                    </div>
                    <h1 className="mb-5" >Much to learn, you still have. Search again, you must.</h1>
                    <SearchBar
                        onChange={handleChange}
                        onSearch={handleSearch}
                        search={searchTerm}
                    />
                    <CharacterCard
                        name={character.name}
                        birthYear={character.birth_year}
                        height={character.height}
                        mass={character.mass}
                        hairColor={character.hair_color}
                        species={species || 'Human'}
                        films={films}
                        starships={starships || 'None'}
                        homeworld={homeworld}
                    />
                    </div>
                        )
            }
                    </div>
                    )
}