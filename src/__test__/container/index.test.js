import React from 'react';
import {
  render,
  cleanup,
  fireEvent,
} from '@testing-library/react';
import Homepage from '../../container';
import { CovidContext } from '../../container/context/CovidContext';
import {
  covidData,
  cardData,
  covidDataTest,
  covidDataWithoutNew,
} from '../mockData/contextData';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

beforeEach(cleanup);

const renderHomepage = () => {
  const updateCovidData = jest.fn();
  const setFiltered = jest.fn();
  const setCardData = jest.fn();
  return render(
    <CovidContext.Provider
      value={{
        covidData,
        cardData,
        updateCovidData,
        setFiltered,
        setCardData,
      }}
    >
      <Homepage />
    </CovidContext.Provider>
  );
};

beforeEach(() => {
  fetch.mockClear();
});

describe('<Homepage />', () => {
  it('should renders the homepage', () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => covidData,
      })
    );
    renderHomepage();
  });

  it('is to cover branch when not new test cases is there', () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => covidDataTest,
      })
    );
    renderHomepage();
  });

  it('is to cover branch', () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => covidDataWithoutNew,
      })
    );
    renderHomepage();
  });

  it('should not show info card when no all data is there', () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => covidDataWithoutNew,
      })
    );
    renderHomepage();
  });
});
