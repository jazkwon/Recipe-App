import renderer from 'react-test-renderer';
import Nutrition from '../Pages/Nutrition';
import React from 'react';

test('renders correctly', () => {
  const tree = renderer.create(<Nutrition />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders without crashing', () => {
  const rendered = renderer.create(<Nutrition />).toJSON();
  expect(rendered).toBeTruthy();
});
