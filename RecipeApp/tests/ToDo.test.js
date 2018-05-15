import React from 'react';
import ToDo from '../Pages/ToDo';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const rendered = renderer.create(<ToDo />).toJSON();
  expect(rendered).toMatchSnapshot();
});

it('renders without crashing', () => {
  const rendered = renderer.create(<ToDo />).toJSON();
  expect(rendered).toBeTruthy();
});
