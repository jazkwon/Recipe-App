import React from 'react';
import { StyleSheet, Text, View, Image, AsyncStorage, ScrollView, Dimensions } from 'react-native';
import BarChart from './BarChart';
import PieChart from './PieChart';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import App from '../App.js';
import { DrawerNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { Container,Body,  Header, Content, Title, Tab, Tabs } from 'native-base';

/*Renders Visualization Page with 2 tabs showing 2 bar charts*/
export default class Graph extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Visualization',
    drawerIcon: (
      <MaterialCommunityIcons name="chart-bar" size={23} color="#000" />
    )
  }
  constructor(props) {
    super(props);
    this.state = {
      data: '',
    }
  };
  render() {
    return(
      <Container>
        <Header>
          <Body>
            <Title>Visualization</Title>
          </Body>
        </Header>
        <Tabs initialPage={1}>
          <Tab heading="Minerals">
            <BarChart/>
          </Tab>
          <Tab heading="Vitamins">
            <PieChart />
          </Tab>
        </Tabs>
      </Container>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(52, 152, 219, 0.8)',
  },
  infoContainer: {
    alignItems: 'center',
    top: 50,
    justifyContent: 'center',
  },
  scroll: {
    backgroundColor: '#273c75',
    flex: 1
  },
});
