import React, { useContext } from 'react';
import './CovidInfo.css';
import { CovidContext } from '../../context/CovidContext';

function CovidInfo() {
  const { cardData } = useContext(CovidContext);

  function numFormatter(num) {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million
    } else if (num > 1000000) {
      return (num / 1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million
    } else if (num < 900) {
      return num; // if value < 1000, nothing to do
    }
  }

  return (
    <div className='covidInfo'>
      <div className='card'>
        <div className='card-heading'>
          Coronavirus Cases
        </div>
        <p className='infoBox__cases'>
          + {numFormatter(cardData.newCases)}
        </p>
        <p className='infoBox__total'>
          {numFormatter(cardData.total)} total
        </p>
      </div>

      <div className='card'>
        <div className='card-heading'>Recovered</div>
        <p className='infoBox__cases infoBox__cases--green'>
          + 4.3K
        </p>
        <p className='infoBox__total'>
          {numFormatter(cardData.recovered)} total
        </p>
      </div>

      <div className='card'>
        <div className='card-heading'>Deaths</div>
        <p className='infoBox__cases'>
          + {numFormatter(cardData.newDeaths)}
        </p>
        <p className='infoBox__total'>
          {numFormatter(cardData.deaths)} total
        </p>
      </div>
    </div>
  );
}

export default CovidInfo;
