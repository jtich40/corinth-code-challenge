import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CharacterList({ name }) {
    const navigate = useNavigate()

    function handleClick() {
        navigate(`/character/${name}`)
    }


    return (
<div className="mt-20 flex flex-col items-center">
            <div className="bg-white shadow-xl rounded-3xl px-8 py-8 mb-4">
            <div className="overflow-ellipsis">
                    <h2 className="text-xl">{name}</h2>
                </div>
                <div>
                    <img 
                    src={`images/${name}.jpg`} 
                    alt={name}
                    className="my-10 rounded-xl drop-shadow-xl w-64 object-cover"
                    />
                </div>
                <button
                    onClick={handleClick}
                    className="btn btn-warning w-full"
                >
                    View Profile
                </button>
            </div>
        </div>
    )
}