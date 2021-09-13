import React, { useContext } from 'react';
import './CovidTable.css';
import { CovidContext } from '../../context/CovidContext';

function Table() {
  const { filteredData } = useContext(CovidContext);
  return (
    <table className='table'>
      <thead>
        <tr>
          <th>
            <button type='button'>Country</button>
          </th>
          <th>
            <button type='button'>Total Cases</button>
          </th>
          <th>
            <button type='button'>Active Cases</button>
          </th>
          <th>
            <button type='button'>Total Deaths</button>
          </th>
          <th>
            <button type='button'>Recovered</button>
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
              <td>{data.cases.total}</td>
              <td>{data.cases.active}</td>
              <td>{data.cases.recovered}</td>
              <td>{data.deaths.total}</td>
            </tr>
          ))
        ) : (
          <div className='no-data-text'>No data found </div>
        )}
      </tbody>
    </table>
  );
}

export default Table;
