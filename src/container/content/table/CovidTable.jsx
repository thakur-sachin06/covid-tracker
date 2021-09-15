import React, { useContext } from 'react';
import './CovidTable.css';
import { CovidContext } from '../../context/CovidContext';

function Table() {
  const { filteredData, setFiltered, covidData } =
    useContext(CovidContext);

  const sorting = (column) => {
    const sortedData = filteredData.sort((a, b) => {
      const elt1 =
        a && a[column] && a[column]['1M_pop']
          ? a[column]['1M_pop']
          : '0';
      const elt2 =
        b && b[column] && b[column]['1M_pop']
          ? b[column]['1M_pop']
          : '0';
      return Number(elt1) < Number(elt2) ? 1 : -1;
    });
    return sortedData;
  };

  const sortData = (selectedValue) => {
    if (selectedValue === 'Deaths per 1MP') {
      const sortedArr = sorting('deaths');
      setFiltered([...sortedArr]);
    } else if (selectedValue === 'Cases per 1MP') {
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
        <option defaultValue data-testid='select-option'>
          Default...
        </option>
        <option data-testid='select-option'>
          Deaths per 1MP
        </option>
        <option data-testid='select-option'>
          Cases per 1MP
        </option>
      </select>
      <table className='table'>
        <thead>
          <tr>
            <th>
              <button type='button'>Country</button>
            </th>
            <th>
              <button type='button'>New Cases</button>
            </th>
            <th>
              <button type='button'>Total Cases</button>
            </th>
            <th>
              <button type='button'>Active Cases</button>
            </th>
            <th>
              <button type='button'>Recovered</button>
            </th>
            <th>
              <button type='button'>Total Deaths</button>
            </th>
            <th>
              <button type='button'>Deaths 1MP</button>
            </th>
            <th>
              <button type='button'>Cases 1MP</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData && filteredData.length ? (
            filteredData.map((data, index) => (
              <tr key={index}>
                <td className='country-name'>
                  {data.country}
                </td>
                <td className='new-cases-text'>
                  {data.cases.new || '-'}
                </td>
                <td>{data.cases.total || '-'}</td>
                <td>{data.cases.active || '-'}</td>
                <td className='recovered-text'>
                  {data.cases.recovered || '-'}
                </td>
                <td>{data.deaths.total || '-'}</td>
                <td>{data.deaths['1M_pop'] || '-'}</td>
                <td>{data.cases['1M_pop'] || '-'}</td>
              </tr>
            ))
          ) : (
            <div className='no-data-text'>
              No data found
            </div>
          )}
        </tbody>
      </table>
    </>
  );
}

export default Table;
