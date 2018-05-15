import React from 'react';
import Recipe from '../Pages/Recipe';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const rendered = renderer.create(<Recipe />).toJSON();
  expect(rendered).toMatchSnapshot();
});

it('renders without crashing', () => {
  const rendered = renderer.create(<Recipe />).toJSON();
  expect(rendered).toBeTruthy();
});
