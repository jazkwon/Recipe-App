import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { StyleSheet, View, ScrollView, Image, AsyncStorage, TouchableHighlight, FlatList, Linking, Alert } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { Container, Header, Content, Card, Title, CardItem, Thumbnail, Text, Button, Icon, Right, Left, Body } from 'native-base';

import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillUpdate is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
]);

export default class ShoppingList extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Shopping List',
    drawerIcon: (
      <Entypo name="shopping-basket" size={23} color="#000" />
    )
  }
  constructor(props) {
    super(props);
    this.state = {
      fetchError: '',
      shopping_list: [],
    }
    this.getData = this.getData.bind(this);
    this.getData();
  }
  /*grabs saved shopping list items*/
  getData(){
    AsyncStorage.getItem('shopping_list', (err, result) => {
      console.log(JSON.parse(result));
      this.setState({
        shopping_list: JSON.parse(result),
          })
        });
  }
  /*deletes shopping list item from list*/
  removeItemFromShoppingList(e, idx) {
    AsyncStorage.getItem('shopping_list', (err, result) => {
      console.log(JSON.parse(result));
      var updated_array = JSON.parse(result);
      if (idx > -1) {
        updated_array.splice(idx, 1);
      }
      AsyncStorage.setItem("shopping_list", JSON.stringify(updated_array), () => {
      })
    })

    Alert.alert(e + ' has been removed from your shopping list.');

  }
  /*render shopping list in card list format*/
  renderShoppingList(){
     return this.state.shopping_list.map((item, i) => { return(
       <CardItem key={i} button onPress={() => Alert.alert('button has been pressed')}>
         <Left>
            <Text>{item}</Text>
         </Left>

         <Right>
           <Icon name="remove-circle"
             onPress={() => this.removeItemFromShoppingList(item, i)}
            />
         </Right>
       </CardItem> )
    })
  }
  /*clears shopping list of all items*/
  clearList(){
    AsyncStorage.setItem("shopping_list", JSON.stringify([]), () => {
    });
    Alert.alert('List has been cleared.');
  }
  render() {
    return (
        <Container>
          <Header>
            <Left></Left>
            <Body>
              <Title>My List</Title>
            </Body>
            <Right>
              <Button transparent danger onPress={()=> this.clearList()}>
                <Text>Clear</Text>
              </Button>
            </Right>
          </Header>
          <Content>
            <Card style={{flex: 0}}>
              {this.renderShoppingList()}
            </Card>
          </Content>
        </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
