import React, {
  useContext,
  useState,
  useEffect,
} from 'react';
import './CovidTable.css';
import { CovidContext } from '../../context/CovidContext';
import {
  DROPDOWN_OPTIONS,
  DEATHS_1MP,
  CASES_1MP,
} from '../../../utils/constants';

const MP = '1M_pop';

function Dropdown() {
  const [filter, setFilter] = useState('New Cases');
  const { filteredData, setFiltered, covidData } =
    useContext(CovidContext);

  useEffect(() => {
    const filter = window.localStorage.getItem('filter');
    debugger;
    if (filter && filter.length) {
      setFilter(filter);
      if (filter === DEATHS_1MP) {
        sorting('deaths');
      } else if (filter === CASES_1MP) {
        sorting('cases');
      } else if (filter === 'New Cases') {
        return;
      }
    }
  }, [filteredData]);

  const sorting = (column) => {
    const sortedData = filteredData.sort((a, b) => {
      const elt1 =
        a && a[column] && a[column][MP]
          ? a[column][MP]
          : '0';
      const elt2 =
        b && b[column] && b[column][MP]
          ? b[column][MP]
          : '0';
      return Number(elt1) < Number(elt2) ? 1 : -1;
    });
    return sortedData;
  };

  const sortData = (selectedValue) => {
    window.localStorage.setItem('filter', selectedValue);
    if (selectedValue === DEATHS_1MP) {
      const sortedArr = sorting('deaths');
      setFiltered([...sortedArr]);
    } else if (selectedValue === CASES_1MP) {
      const sortedArr = sorting('cases');
      setFiltered([...sortedArr]);
    } else {
      setFiltered([...covidData]);
    }
  };
  return (
    <>
      <span className='sort-text'>Sort Data</span>
      <select
        className='sort-dropdown'
        onChange={(e) => sortData(e.target.value)}
        data-testid='select'
      >
        {DROPDOWN_OPTIONS.map((elt) => {
          return (
            <option
              defaultValue={filter}
              data-testid='select-option'
              selected={elt === filter}
              key={elt.toLowerCase()}
            >
              {elt}
            </option>
          );
        })}
      </select>
    </>
  );
}

export default Dropdown;
