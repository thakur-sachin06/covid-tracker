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

  return render(
    <CovidContext.Provider value={{ covidData, cardData }}>
      <Header
        setSearchText={setSearchText}
        debounceSearch={debounceSearch}
      />
    </CovidContext.Provider>
  );
};

describe('<Header />', () => {
  it('should renders header and search input', () => {
    const { queryByTestId, getByText } = renderHeader();
    expect(getByText('Covid 19 Tracker')).toBeTruthy();
    expect(queryByTestId('search-input')).toBeTruthy();
  });

  it('should call the search', () => {
    const { queryByTestId } = renderHeader();
    const searchInput = queryByTestId('search-input');
    fireEvent.change(searchInput, {
      target: {
        value: 'India',
      },
    });
  });
});
