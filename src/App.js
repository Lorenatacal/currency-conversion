import React from 'react';
import CurrencyConversion from './CurrencyConversion';
import styled from 'styled-components';

const Title = styled.h2`
  text-align: center;
`;
function App () {
  return (
    <div className="App">
      <Title>Currency Conversion</Title>
      <CurrencyConversion />
    </div>
  );
}

export default App;
