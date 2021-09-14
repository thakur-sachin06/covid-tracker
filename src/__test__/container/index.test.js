import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Homepage from '../../container';
import { CovidContext } from '../../container/context/CovidContext';
import {
  covidData,
  cardData,
} from '../mockData/contextData';

const renderHomepage = () => {
  return render(
    <CovidContext.Provider value={{ covidData, cardData }}>
      <Homepage />
    </CovidContext.Provider>
  );
};

describe('<Homepage />', () => {
  it('should renders the task checkbox', () => {
    renderHomepage();
  });
});
