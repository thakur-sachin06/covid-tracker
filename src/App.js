import React, {
  useState,
  useEffect,
  useContext,
} from 'react';
import './App.css';
import Header from './container/header/Header';
import CovidInfo from './container/content/covid-info/CovidInfo';
import Table from './container/content/table/CovidTable';
import { CovidContext } from './container/context/CovidContext';

function App() {
  const {
    covidData,
    updateCovidData,
    setFiltered,
    setCardData,
  } = useContext(CovidContext);

  const [searchText, setSearchText] = useState('');

  function searchData(text) {
    if (!text.length) {
      setFiltered(covidData);
      return;
    }
    const filteredData = covidData.filter((elt) => {
      if (
        elt &&
        elt.continent &&
        elt.continent.toLowerCase() === text
      ) {
        return elt;
      } else if (
        elt &&
        elt.country &&
        elt.country.toLowerCase() === text
      ) {
        return elt;
      }
    });
    setFiltered(filteredData);
  }

  function sortData(data) {
    const sortedData = data.sort((a, b) =>
      a.cases.recovered > b.cases.recovered ? -1 : 1
    );
    setFiltered(sortedData);
    updateCovidData(sortedData);
  }

  function createCardData(data) {
    const allCovidData = data.filter(
      (elt) => elt.continent === 'All'
    );
    const allInfo = allCovidData.length
      ? allCovidData[0]
      : {};
    const { cases, deaths } = allInfo;
    const cardData = {
      newCases: cases.new,
      activeCases: cases.active,
      total: cases.total,
      recovered: cases.recovered,
      deaths: deaths.total,
      newDeaths: deaths.new,
    };
    setCardData(cardData);
  }

  async function fetchCovidData() {
    try {
      const data = await fetch(
        'https://covid-193.p.rapidapi.com/statistics',
        {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'covid-193.p.rapidapi.com',
            'x-rapidapi-key':
              '010f080e20mshccc6f1c0245a4d9p1e9334jsn61fe6502343e',
          },
        }
      );
      const covidData = await data.json();
      createCardData(covidData.response);
      sortData(covidData.response);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchCovidData();
  }, []);

  return (
    <div className='app'>
      <Header
        searchText={searchText}
        setSearchText={setSearchText}
        searchData={searchData}
      />
      <CovidInfo />
      <Table />
    </div>
  );
}

export default App;
