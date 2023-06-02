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
        if (!search) return
        // update search term state variable to match search term from url
        setSearchTerm(search)
        const url = `https://swapi.dev/api/people/?search=${search}`
        console.log(searchTerm)

        axios.get(url)
            .then(res => {
                console.log(res.data.results[0])
                if (!res.data.results.length) {
                    setCharacter(null)
                    return
                }
                const fetchedCharacter = res.data.results[0]

                // define urls for homeworld, species, films, and starships
                const homeworldUrl = fetchedCharacter.homeworld
                const speciesUrl = fetchedCharacter.species
                const filmUrls = fetchedCharacter.films
                const starshipUrls = fetchedCharacter.starships

                // fetch data for homeworld, species, films, and starships
                const fetchedHomeworld = axios.get(homeworldUrl)
                // set species to 'Human' if speciesUrl is empty
                const fetchedSpecies = speciesUrl.length ? (
                    axios.get(speciesUrl)
                ) : Promise.resolve({ data: { name: 'Human' } })

                const fetchedFilms = filmUrls.map(url => axios.get(url))
                // set starships to 'None' if starshipUrls is empty
                const fetchedStarships = starshipUrls.length ? (
                    starshipUrls.map(url => axios.get(url))
                ) : [Promise.resolve({ data: { name: 'None' } })]

                // wait for all promises to resolve
                Promise.allSettled([
                    fetchedHomeworld,
                    fetchedSpecies,
                    ...fetchedFilms,
                    ...fetchedStarships
                ])
                    .then(res => {
                        console.log(res)
                        // update fetchedCharacter object with homeworld, species, films, and starships
                        fetchedCharacter.homeworld = res[0].value.data.name
                        fetchedCharacter.species = res[1].value.data.name
                        // slice res array to access only potential films
                        fetchedCharacter.films = res.slice(2, 2 + filmUrls.length).map(film => film.value.data.title)
                        // slice res array to only access potential starships
                        fetchedCharacter.starships = res.slice(2 + filmUrls.length).map(starship => starship.value.data.name)

                        console.log(fetchedCharacter)
                        // state variable is updated with all character data
                        setCharacter(fetchedCharacter || {})
                    })
            })
            .catch(err => {
                console.log(err)
            })

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
                    homeworld={character.homeworld}
                />
            ) : <h3>No character found, please try again!</h3>
            }
        </div>
    )
}