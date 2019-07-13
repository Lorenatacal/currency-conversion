import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import CurrencyConvertor from './CurrencyConversion';
import waait from 'waait';

Enzyme.configure ({adapter: new Adapter ()});
jest.mock ('axios');

describe ('CurrencyConvertor()', () => {
  test ('should render correctly without data', () => {
    const wrapper = Enzyme.shallow (<CurrencyConvertor />);
    expect (toJson (wrapper)).toMatchSnapshot ();
  });

  test ('should render correctly with data', async () => {
    const mockedResponse = {
      data: {
        USD: 3.81,
        EUR: 3.36,
      },
    };
    axios.get.mockResolvedValue (mockedResponse);

    const handleSubmitSpy = jest.spyOn (
      CurrencyConvertor.prototype,
      'handleSubmit'
    );
    const wrapper = Enzyme.shallow (<CurrencyConvertor />);

    const userInput = wrapper.find ('[data-name="user-input"]');
    userInput.simulate ('change', {target: {value: '20'}});

    const form = wrapper.find ('[data-name="submit"]');
    form.simulate ('submit', {
      preventDefault: () => {},
    });

    expect (handleSubmitSpy).toHaveBeenCalled ();
    expect (axios.get).toHaveBeenCalledWith ('/front-end-test-api', {
      headers: {
        accept: 'application/json',
      },
      params: {
        amount: '20',
      },
    });
    await waait ();
    expect (toJson (wrapper)).toMatchSnapshot ();
  });
});

test ('sortList()', () => {
  const wrapper = Enzyme.shallow (<CurrencyConvertor />);
  wrapper.setState ({
    currencies: [{USD: 1.98}, {EUR: 1.43}],
  });

  const sortListSpy = jest.spyOn (CurrencyConvertor.prototype, 'sortList');

  const button = wrapper.find ('[data-name="sort-button"]');
  button.simulate ('click');
  expect (sortListSpy).toHaveBeenCalled ();
  expect (wrapper.state ().currencies).toEqual ([{EUR: 1.43}, {USD: 1.98}]);
});
