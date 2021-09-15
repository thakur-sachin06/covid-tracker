import React from 'react';
import {
  render,
  cleanup,
  fireEvent,
} from '@testing-library/react';
import Header from '../../container/header/Header';
import { CovidContext } from '../../container/context/CovidContext';
import {
  covidData,
  cardData,
} from '../mockData/contextData';

beforeEach(cleanup);

const renderHeader = () => {
  const setSearchText = jest.fn();
  const debounceSearch = jest.fn();
  const setFiltered = jest.fn();

  return render(
    <CovidContext.Provider
      value={{
        covidData: covidData.response,
        cardData,
        setFiltered,
      }}
    >
      <Header
        setSearchText={setSearchText}
        debounceSearch={debounceSearch}
      />
    </CovidContext.Provider>
  );
};

jest.setTimeout(30000);

describe('<Header />', () => {
  it('should renders header and search input', () => {
    const { queryByTestId, getByText } = renderHeader();
    expect(getByText('Covid 19 Tracker')).toBeTruthy();
    expect(queryByTestId('search-input')).toBeTruthy();
  });

  it('should call the search', async () => {
    const { queryByTestId } = renderHeader();
    const searchInput = queryByTestId('search-input');
    fireEvent.change(searchInput, {
      target: {
        value: 'India',
      },
    });
    await new Promise((r) => setTimeout(r, 1000));
    fireEvent.change(searchInput, {
      target: {
        value: '',
      },
    });
    await new Promise((r) => setTimeout(r, 1000));
  });
});
