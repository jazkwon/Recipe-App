import React from 'react';
import Measurements from '../Pages/Measurements';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const rendered = renderer.create(<Measurements />).toJSON();
  expect(rendered).toMatchSnapshot();
});

it('renders without crashing', () => {
  const rendered = renderer.create(<Measurements />).toJSON();
  expect(rendered).toBeTruthy();
});
