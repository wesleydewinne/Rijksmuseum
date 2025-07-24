import { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <div className={`input-group ${query ? 'filled' : ''}`}>
                <input
                    type="text"
                    id="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    required
                />
                <label htmlFor="search">Zoek op kunstenaar of object</label>
            </div>
            <button type="submit">Zoeken</button>
        </form>
    );
}

export default SearchBar;
