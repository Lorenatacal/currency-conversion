import React from 'react';
import axios from 'axios';

class CurrencyConvertor extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      amount: '',
      USD: '',
      EUR: '',
    };
    this.handleChange = this.handleChange.bind (this);
    this.handleSubmit = this.handleSubmit.bind (this);
  }

  handleChange (e) {
    this.setState ({amount: e.target.value});
  }

  handleSubmit (e) {
    axios
      .get ('/front-end-test-api', {
        headers: {
          accept: 'application/json',
        },
        params: {
          amount: this.state.amount,
        },
      })
      .then (response => {
        this.setState ({
          USD: response.data.USD,
          EUR: response.data.EUR,
        });
      })
      .catch (function (error) {
        return error;
      })
      .finally (function () {});
    e.preventDefault ();
  }

  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="number"
            min="1"
            max="10000"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <input type="submit" value="Submit" />
        </form>
        <p>{this.state.amount} GBP</p>
        <p>{this.state.USD} USD</p>
        <p>{this.state.EUR} EUR</p>
      </div>
    );
  }
}

export default CurrencyConvertor;
