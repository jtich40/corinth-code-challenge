import React from 'react';

export default function SearchBar({ onSearch, onChange, search }) {

    return (
        <form onSubmit={onSearch}>
            <label>
                <input
                    type="text"
                    placeholder="Enter Star Wars character here"
                    name="search"
                    value={search}
                    onChange={onChange}
                />
            </label>
            <button type="submit">Search</button>
        </form>
    )
}