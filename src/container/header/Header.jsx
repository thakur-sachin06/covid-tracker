import React from 'react';
import './Header.css';

function Header({ searchText, setSearchText, searchData }) {
  return (
    <div className='header'>
      <h1 className='header-text'>Covid 19 Tracker</h1>
      <input
        type='search'
        className='search'
        placeholder='Search Country or Continent...'
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          searchData(e.target.value.toLowerCase());
        }}
      />
    </div>
  );
}

export default Header;
