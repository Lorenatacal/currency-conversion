import setCurrencies from './setCurrencies';

test ('setCurrencies (data)', () => {
  let data = {
    USD: 1.83,
    EUR: 1.12,
  };
  expect (setCurrencies (data)).toEqual ([{USD: 1.83}, {EUR: 1.12}]);
});
