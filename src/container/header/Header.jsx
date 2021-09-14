import React, { useContext } from 'react';
import './Header.css';
import { CovidContext } from '../context/CovidContext';

let debounceTimer;

function Header({ searchText, setSearchText }) {
  const { covidData, setFiltered } =
    useContext(CovidContext);

  function searchData(text) {
    if (!text.length) {
      setFiltered(covidData);
      return;
    }
    const filteredData = covidData.filter((elt) => {
      if (
        elt &&
        elt.continent &&
        elt.continent.toLowerCase().includes(text)
      ) {
        return elt;
      } else if (
        elt &&
        elt.country &&
        elt.country.toLowerCase().includes(text)
      ) {
        return elt;
      }
    });
    setFiltered(filteredData);
  }

  function debounceSearch(text) {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    debounceTimer = setTimeout(searchData, 1000, text);
  }

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
          debounceSearch(e.target.value.toLowerCase());
        }}
        data-testid='search-input'
      />
    </div>
  );
}

export default Header;
