import React from 'react';
import Search from '../Pages/Search';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const rendered = renderer.create(<Search />).toJSON();
  expect(rendered).toMatchSnapshot();
});

it('renders without crashing', () => {
  const rendered = renderer.create(<Search />).toJSON();
  expect(rendered).toBeTruthy();
});
