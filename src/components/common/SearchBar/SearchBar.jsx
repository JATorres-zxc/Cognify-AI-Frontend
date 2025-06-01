import React, { useState } from 'react';
import searchIcon from '../../../assets/icons/search.svg';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form className="search-container" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search Notes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-button">
        <img src={searchIcon} alt="Search" className='search-icon' />
      </button>
    </form>
  );
};

export default SearchBar;
