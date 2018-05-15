import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import Search from './Pages/Search';
import Results from './Pages/Results';
import Recipe from './Pages/Recipe';
import Home from './Pages/Home';
import Nutrition from './Pages/Nutrition';
import ShoppingList from './Pages/ShoppingList';
import Favorites from './Pages/Favorites';
import ToDo from './Pages/ToDo';
import Graph from './Pages/Graph';
import BarChart from './Pages/BarChart';
import PieChart from './Pages/PieChart';
import Measurements from './Pages/Measurements';
import AddMyRecipe from './Pages/AddMyRecipe';
import PersonalRecipe from './Pages/PersonalRecipe';


import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
]);

export default class App extends React.Component {
  render() {
    return (
      <AppDrawerNavigator/>
    );
  }
}

const AppDrawerNavigator = DrawerNavigator({
  Home: {
    screen: Home,
  },
  Search: {
    screen: Search,
  },
  Results: {
    screen: Results,
  },
  Recipe: {
    screen: Recipe,
  },
  PersonalRecipe: {
    screen: PersonalRecipe,
  },
  Nutrition: {
    screen: Nutrition,
  },
  Measurements: {
    screen: Measurements,
  },
  ShoppingList: {
    screen: ShoppingList,
  },
  Favorites: {
    screen: Favorites,
  },
  ToDo: {
    screen: ToDo,
  },
  AddMyRecipe: {
    screen: AddMyRecipe,
  },
});
