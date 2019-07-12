import React from 'react';
import axios from 'axios';

function setCurrencies (data) {
  let arr = [];
  Object.keys (data).forEach (key => {
    arr.push ({[key]: data[key]});
  });
  return arr;
}

class CurrencyConvertor extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      amount: '',
      currencies: [],
      sort: false,
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
        console.log (Object.keys (response.data), 'key');
        this.setState ({
          currencies: setCurrencies (response.data),
        });
      })
      .catch (function (error) {
        return error;
      })
      .finally (function () {});
    e.preventDefault ();
  }

  render () {
    function sortList () {
      // currencies.sort (function (a, b) {
      //   var x = Object.keys (a);
      //   var y = Object.keys (b);
      //   if (x < y) {
      //     return -1;
      //   }
      //   if (x > y) {
      //     return 1;
      //   }
      //   return 0;
      // });
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <span>Enter GBP amount: </span>
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
          {this.state.currencies.map ((elem, index) => {
            return (
              <li key={index}>
                <span>{Object.keys (elem)}:</span>
                <span> {Object.values (elem)}</span>
              </li>
            );
          })}
        </ul>
        <button
          onClick={() => {
            sortList ();
            this.setState ({sort: true});
          }}
        >
          Sort
        </button>
      </div>
    );
  }
}

export default CurrencyConvertor;
