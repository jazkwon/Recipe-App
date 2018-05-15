import React from 'react';
import Home from '../Pages/Home';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const rendered = renderer.create(<Home />).toJSON();
  expect(rendered).toMatchSnapshot();
});

it('renders without crashing', () => {
  const rendered = renderer.create(<Home />).toJSON();
  expect(rendered).toBeTruthy();
});
