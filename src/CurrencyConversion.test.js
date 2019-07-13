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
        amount: '',
      },
    });
    await waait ();
    expect (toJson (wrapper)).toMatchSnapshot ();
  });
});
