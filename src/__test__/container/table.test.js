import React from 'react';
import {
  render,
  cleanup,
  fireEvent,
} from '@testing-library/react';
import CovidTable from '../../container/content/table/CovidTable';
import { CovidContext } from '../../container/context/CovidContext';
import {
  covidData,
  cardData,
} from '../mockData/contextData';

beforeEach(cleanup);

const renderHeader = (data) => {
  const setFiltered = jest.fn();

  return render(
    <CovidContext.Provider
      value={{ filteredData: data, setFiltered }}
    >
      <CovidTable />
    </CovidContext.Provider>
  );
};

describe('<Header />', () => {
  it('should renders empty table', () => {
    const data = [];
    const { queryByTestId, getByText } = renderHeader(data);
    expect(
      getByText('No data found for this search')
    ).toBeTruthy();
    expect(queryByTestId('select')).toBeTruthy();
    // checking the columns name
    expect(getByText('Country')).toBeTruthy();
    expect(getByText('Total Cases')).toBeTruthy();
    expect(getByText('Active Cases')).toBeTruthy();
    expect(getByText('Total Deaths')).toBeTruthy();
    expect(getByText('Recovered')).toBeTruthy();
  });

  it('should renders table with data', async () => {
    const { queryByTestId, getByText } = renderHeader(
      covidData.response
    );
    expect(() =>
      getByText('No data found for this search')
    ).toThrowError();

    expect(getByText('India')).toBeTruthy();
    expect(queryByTestId('select')).toBeTruthy();
    // checking the columns name
    expect(getByText('Country')).toBeTruthy();
    expect(getByText('Total Cases')).toBeTruthy();
    expect(getByText('Active Cases')).toBeTruthy();
    expect(getByText('Total Deaths')).toBeTruthy();
    expect(getByText('Recovered')).toBeTruthy();
  });

  it('should sort data with Deaths per 1MP', async () => {
    const {
      queryByTestId,
      getByText,
      getByTestId,
      getAllByTestId,
    } = renderHeader(covidData.response);
    expect(() =>
      getByText('No data found for this search')
    ).toThrowError();
    expect(queryByTestId('select')).toBeTruthy();

    fireEvent.change(getByTestId('select'), {
      target: { value: 'Deaths per 1MP' },
    });

    let options = getAllByTestId('select-option');
    expect(options[0].selected).toBeFalsy();
    expect(options[1].selected).toBeTruthy();
    expect(options[2].selected).toBeFalsy();
  });

  it('should sort data with Cases per 1MP', async () => {
    const {
      queryByTestId,
      getByText,
      getByTestId,
      getAllByTestId,
    } = renderHeader(covidData.response);
    expect(() =>
      getByText('No data found for this search')
    ).toThrowError();
    expect(queryByTestId('select')).toBeTruthy();

    fireEvent.change(getByTestId('select'), {
      target: { value: 'Cases per 1MP' },
    });

    let options = getAllByTestId('select-option');
    expect(options[0].selected).toBeFalsy();
    expect(options[1].selected).toBeFalsy();
    expect(options[2].selected).toBeTruthy();
  });
});
