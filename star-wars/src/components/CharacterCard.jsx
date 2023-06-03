import React from 'react';

export default function CharacterCard({
    name,
    birthYear,
    height,
    mass,
    hairColor,
    species,
    films,
    starships,
    homeworld
}) {

    return (
        <div>
            <h1>{name}</h1>
            <img src="" alt="character" />
            <div>
                <h3>Height: {height} cm </h3>
                <h3>Weight: {mass} kg </h3>
                <h3>Hair Color: {hairColor} </h3>
                <h3>Date of Birth: {birthYear} </h3>
                <h3>Species: {species} </h3>
                <h3>Appearances: {films} </h3>
                <h3>Starships Piloted: {starships} </h3>
                <h3>Homeworld: {homeworld} </h3>
            </div>
        </div>
    )
}