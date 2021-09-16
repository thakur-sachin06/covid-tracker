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

function Homepage() {
  const {
    updateCovidData,
    setFiltered,
    setCardData,
    covidData,
  } = useContext(CovidContext);

  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function searchData(text, data) {
    if (!text.length) {
      setFiltered(covidData);
      return;
    }
    const filteredData = data.filter((elt) => {
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
    setFiltered([...filteredData]);
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
    const searchValue =
      window.localStorage.getItem('searchValue');
    if (searchValue && searchValue.length) {
      searchData(searchValue, sortedData);
      setSearchText(searchValue);
    } else {
      setFiltered([...sortedData]);
    }
    updateCovidData([...sortedData]);
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
      sortData(covidData.response);
      createCardData(covidData.response);
    } catch (err) {}
  }

  useEffect(() => {
    fetchCovidData();
  }, []);

  return (
    <div>
      <Header
        searchText={searchText}
        setSearchText={setSearchText}
        setFiltered={setFiltered}
      />
      {isLoading ? (
        <div className='loader'></div>
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
