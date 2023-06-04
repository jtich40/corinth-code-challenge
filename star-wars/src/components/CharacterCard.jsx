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
        <div className="mt-14">
            <h1 className=" mb-8 text-4xl">{name}</h1>
            <div className="flex flex-col lg:flex-row justify-between items-center" >
                <img
                    src={`/images/${name}.jpg`}
                    alt={name}
                    className="my-10 rounded-xl shadow-xl"
                />
                <div>
                    <h3 className="text-2xl mb-5">Height: {height} cm </h3>
                    <h3 className="text-2xl mb-5">Weight: {mass} kg </h3>
                    <h3 className="text-2xl mb-5">Hair Color: {hairColor} </h3>
                    <h3 className="text-2xl mb-5">Date of Birth: {birthYear} </h3>
                    <h3 className="text-2xl mb-5">Species: {species} </h3>
                    <h3 className="text-2xl mb-5">Appearances: {films} </h3>
                    <h3 className="text-2xl mb-5">Starships Piloted: {starships} </h3>
                    <h3 className="text-2xl mb-5">Homeworld: {homeworld} </h3>
                </div>
            </div>
        </div>
    )
}