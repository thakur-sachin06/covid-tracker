import React, {
  useState,
  useEffect,
  useContext,
} from 'react';
import './styles/styles.css';
import Header from './header/Header';
import CovidInfo from './content/covid-info/CovidInfo';
import Table from './content/table/CovidTable';
import { CovidContext } from '../container/context/CovidContext';

let debounceTimer;

function Homepage() {
  const {
    covidData,
    updateCovidData,
    setFiltered,
    setCardData,
  } = useContext(CovidContext);

  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  function sortData(data) {
    const sortedData = data.sort((a, b) => {
      const elt1 =
        a && a.cases && a.cases.new
          ? a.cases.new.replace('+', '')
          : '0';
      const elt2 =
        b && b.cases && b.cases.new
          ? b.cases.new.replace('+', '')
          : '0';
      return Number(elt1) < Number(elt2) ? 1 : -1;
    });
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
    setIsLoading(true);
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
      setIsLoading(false);
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
    <div>
      <Header
        searchText={searchText}
        setSearchText={setSearchText}
        debounceSearch={debounceSearch}
      />
      {isLoading ? (
        <div class='loader'></div>
      ) : (
        <>
          <CovidInfo />
          <Table />
        </>
      )}
    </div>
  );
}

export default Homepage;