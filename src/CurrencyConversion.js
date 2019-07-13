import React from 'react';
import axios from 'axios';
import setCurrencies from './utils/setCurrencies';
import styled from 'styled-components';

const Wrapper = styled.section`
  padding: 1em;
  text-align: center;
  margin-left:10%;
  margin-right:10%;
  border: 0.5px solid gray;
  box-shadow: 2px -2px #CCC;
  border-radius: 20px;
  font-family: 'Notable', sans-serif;
`;
const List = styled.ul`
  list-style-type: none;
  text-align: center;
  margin-left: -6%
`;
const Button = styled.button`
  font-size: 0.8em;
  margin: 1em;
  padding: 0.25em 0.25em;
  border: 1px solid gray;
  border-radius: 1px;
`;
const Input = styled.input`
  font-size: 0.8em;
  margin: 1em;
  padding: 0.25em 0.25em;
  border: 1px solid gray;
  border-radius: 1px;
`;

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
        this.setState ({
          currencies: setCurrencies (response.data),
        });
      })
      .catch (function (error) {
        return error;
      });
    e.preventDefault ();
  }

  sortList () {
    this.setState ({
      currencies: this.state.currencies.sort (function (a, b) {
        var x = Object.keys (a);
        var y = Object.keys (b);
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      }),
    });
  }

  render () {
    return (
      <Wrapper>
        <form data-name="submit" onSubmit={this.handleSubmit}>
          <span>Enter GBP amount: </span>
          <input
            data-name="user-input"
            type="number"
            min="1"
            max="10000"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <Input type="submit" value="Submit" />
        </form>
        <List>
          {this.state.currencies.map ((elem, index) => {
            return (
              <li key={index}>
                <span>{Object.keys (elem)}:</span>
                <span> {Object.values (elem)}</span>
              </li>
            );
          })}
        </List>
        <Button
          data-name="sort-button"
          onClick={() => {
            this.sortList ();
            this.setState ({sort: true});
          }}
        >
          Sort A-Z
        </Button>
      </Wrapper>
    );
  }
}

export default CurrencyConvertor;
