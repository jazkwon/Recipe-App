import React from 'react';
import Favorites from '../Pages/Favorites';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const rendered = renderer.create(<Favorites />).toJSON();
  expect(rendered).toMatchSnapshot();
});

it('renders without crashing', () => {
  const rendered = renderer.create(<Favorites />).toJSON();
  expect(rendered).toBeTruthy();
});
