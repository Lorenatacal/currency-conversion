import React from 'react';
import axios from 'axios';

class CurrencyConvertor extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      amount: '',
      data: '',
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
          data: response.data,
        });
      })
      .catch (function (error) {
        return error;
      })
      .finally (function () {});
    e.preventDefault ();
  }

  render () {
    const currencies = [
      {GBP: this.state.amount},
      {USD: this.state.data.USD},
      {EUR: this.state.data.EUR},
    ];

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
        <ul>
          {currencies.map ((elem, index) => {
            return (
              <li key={index}>
                <span>elem thekeyValue</span>
                <span> elem the value</span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default CurrencyConvertor;
