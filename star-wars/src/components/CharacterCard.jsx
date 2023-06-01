import React from 'react';

export default function CharacterCard({
    name,
    birthYear,
    height,
    mass,
    hairColor,
    species,
    films,
    starships
}) {
    console.log(name)
    return (
        <div>
            <h1>{name}</h1>
            <img src="" alt="character" />
            <div>
                <h3>Height: {height} cm </h3>
                <h3>Mass: {mass} kg </h3>
                <h3>Hair Color: {hairColor} </h3>
                <h3>DOB: {birthYear} </h3>
                <h3>Species: {species} </h3>
                <h3>Cameos: {films} </h3>
                <h3>Starships: {starships} </h3>
            </div>
        </div>
    )
}