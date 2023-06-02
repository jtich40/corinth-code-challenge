import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CharacterList({ name }) {
    const navigate = useNavigate()
    
    function handleClick() {
        navigate(`/character/${name}`)
    }


    return (
        <div>
            <div>
                <h1>{name}</h1>
                <img src="" alt="character" />
            </div>
            <button onClick={handleClick} >View Profile</button>
        </div>
    )
}