import React from 'react';
import AddMyRecipe from '../Pages/AddMyRecipe';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const rendered = renderer.create(<AddMyRecipe />).toJSON();
  expect(rendered).toMatchSnapshot();
});

it('renders without crashing', () => {
  const rendered = renderer.create(<AddMyRecipe />).toJSON();
  expect(rendered).toBeTruthy();
});
