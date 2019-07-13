export default function setCurrencies (data) {
  let arr = [];
  Object.keys (data).forEach (key => {
    arr.push ({[key]: data[key]});
  });
  return arr;
}
