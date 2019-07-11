import React from 'react';
import axios from 'axios';

class CurrencyConvertor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        response: false,
        amount: "",
        USB: "",
        EUR: ""
    };
  }

  render() {
    axios.get('/front-end-test-api', {
      headers: {
        'accept': 'application/json',
       },
       params: {
        "amount": "20",
       }
      })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
    });
    return(
      <div>
        <p>{this.state.amount}</p>
        <p>{this.state.USD}</p>
        <p>{this.state.EUR}</p>
      </div>
    )
  }
}

export default CurrencyConvertor;