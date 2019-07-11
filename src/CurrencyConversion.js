import React from 'react';
import axios from 'axios';

class CurrencyConvertor extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      response: false,
      amount: '',
      USD: '',
      EUR: '',
    };
  }

  render () {
    axios
      .get ('/front-end-test-api', {
        headers: {
          accept: 'application/json',
        },
        params: {
          amount: '20',
        },
      })
      .then (response => {
        this.setState ({
          response: true,
          amount: '20',
          USD: response.data.USD,
          EUR: response.data.EUR,
        });
      })
      .catch (function (error) {
        return error;
      })
      .finally (function () {});
    return (
      <div>
        <input type="number" min="10" max="10000" />
        <p>{this.state.amount} GBP</p>
        <p>{this.state.USD} USD</p>
        <p>{this.state.EUR} EUR</p>
      </div>
    );
  }
}

export default CurrencyConvertor;
