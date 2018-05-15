import renderer from 'react-test-renderer';
import ShoppingList from '../Pages/ShoppingList';
import React from 'react';

test('renders correctly', () => {
  const tree = renderer.create(<ShoppingList />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders without crashing', () => {
  const rendered = renderer.create(<ShoppingList />).toJSON();
  expect(rendered).toBeTruthy();
});
