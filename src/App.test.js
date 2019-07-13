import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

Enzyme.configure ({adapter: new Adapter ()});

it ('renders without crashing', () => {
  const div = document.createElement ('div');
  ReactDOM.render (<App />, div);
  ReactDOM.unmountComponentAtNode (div);
});

test ('App should render correctly', () => {
  const wrapper = Enzyme.shallow (<App />);
  expect (toJson (wrapper)).toMatchSnapshot ();
});
