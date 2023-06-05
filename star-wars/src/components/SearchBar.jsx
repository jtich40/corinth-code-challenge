import React from 'react';

export default function SearchBar({ onSearch, onChange, search }) {

    return (
        <form onSubmit={onSearch}>
            <label>
                <input
                    type="text"
                    placeholder="Enter search here..."
                    name="search"
                    value={search}
                    onChange={onChange}
                    className="input input-bordered w-full max-w-xs text-primary"
                />
            </label>
            <button type="submit" className="btn btn-primary ml-2">Search</button>
        </form>
    )
}