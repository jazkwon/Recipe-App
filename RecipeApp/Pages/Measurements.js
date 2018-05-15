import React from 'react';
import { StyleSheet, Text, View, Image, AsyncStorage, ScrollView, Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import App from '../App.js';
import Dry from './Dry.js';
import Liquid from './Liquid.js';
import { DrawerNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { Container,Body,  Header, Content, Title, Tab, Tabs } from 'native-base';

export default class Measurements extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Measurements Conversion',
    drawerIcon: (
      <MaterialCommunityIcons name="table" size={23} color="#000" />
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
            <Title>Measurements Conversion Charts</Title>
          </Body>
        </Header>
        <Tabs initialPage={1}>
          <Tab heading="Dry/Weight Measurements">
            <Dry />
          </Tab>
          <Tab heading="Liquid/Volume Measurements">
            <Liquid />
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
