import React, { useState } from 'react';

const CovidContext = React.createContext();

function ContextProvider({ children }) {
  const [searchCountry, setsearchCountry] = useState('');
  const [covidData, setCovidData] = useState([]);
  const [filteredData, setFiltered] = useState([]);
  const [cardData, setCardData] = useState({});

  const updateCovidData = (data) => {
    setCovidData(data);
  };

  return (
    <CovidContext.Provider
      value={{
        searchCountry,
        setsearchCountry,
        covidData,
        updateCovidData,
        filteredData,
        setFiltered,
        cardData,
        setCardData,
      }}
    >
      {children}
    </CovidContext.Provider>
  );
}

export { CovidContext, ContextProvider };
