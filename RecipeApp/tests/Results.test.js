import React from 'react';
import Results from '../Pages/Results';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const rendered = renderer.create(<Results />).toJSON();
  expect(rendered).toMatchSnapshot();
});

it('renders without crashing', () => {
  const rendered = renderer.create(<Results />).toJSON();
  expect(rendered).toBeTruthy();
});
