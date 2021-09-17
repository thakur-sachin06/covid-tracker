import React, { useContext, useEffect } from 'react';
import './CovidTable.css';
import { CovidContext } from '../../context/CovidContext';
import Dropdown from './Dropdown';
import { TABLE_ROWS } from '../../../utils/constants';

function Table() {
  const { filteredData } = useContext(CovidContext);

  return (
    <>
      <Dropdown />
      <table className='table'>
        <thead>
          <tr>
            {TABLE_ROWS.map((row) => {
              return (
                <th key={row.toLowerCase()}>
                  <button type='button'>{row}</button>
                </th>
              );
            })}
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
              No data found for this search
            </div>
          )}
        </tbody>
      </table>
    </>
  );
}

export default Table;
