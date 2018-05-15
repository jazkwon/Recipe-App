import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { StyleSheet, View, ScrollView, Image, AsyncStorage, TouchableHighlight, FlatList, Linking, Alert } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { Container, Header, Content, Card, Title, CardItem, Thumbnail, Text, Button, Icon, Right, Left, Body } from 'native-base';
import { DrawerNavigator } from 'react-navigation';

import { YellowBox } from 'react-native';
const API_ID = '514c1c11';
const API_KEY = '04ca29129e7bb094692b9af1530793b4';
YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillUpdate is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
]);

export default class Favorites extends React.Component {
  static navigationOptions = {
    drawerLabel: 'My Favorites',
    drawerIcon: (
      <Entypo name="star" size={23} color="#000" />
    )
  }
  constructor(props) {
    super(props);
    this.state = {
      fetchError: '',
      favorites_list: [],
      favorites_list_personal: [],
      name: "",
    }
    this.getData = this.getData.bind(this);
    this.getData();
  }
  /*grabs saved favorites list items*/
  getData(){
    AsyncStorage.getItem('favorites_list', (err, result) => {
      console.log(JSON.parse(result));
      this.setState({
        favorites_list: JSON.parse(result),
          })
        });
    AsyncStorage.getItem('favorites_list_personal', (err, result) => {
      console.log(JSON.parse(result));
        this.setState({
          favorites_list_personal: JSON.parse(result),
        })
    });
  }
  /*deletes favorites list item from list*/
  removeItemFromFavoritesList(e, idx) {
    AsyncStorage.getItem('favorites_list', (err, result) => {
      console.log(JSON.parse(result));
      var updated_array = JSON.parse(result);
      if (idx > -1) {
        updated_array.splice(idx, 1);
      }
      AsyncStorage.setItem("favorites_list", JSON.stringify(updated_array), () => {
      })
    })

    Alert.alert(e.name + ' has been removed from your favorites list.');

  }
  removeItemFromFavoritesListPersonal(e, idx) {
    AsyncStorage.getItem('favorites_list', (err, result) => {
      console.log(JSON.parse(result));
      var updated_array = JSON.parse(result);
      if (idx > -1) {
        updated_array.splice(idx, 1);
      }
      AsyncStorage.setItem("favorites_list_personal", JSON.stringify(updated_array), () => {
      })
    })

    Alert.alert(e.name + ' has been removed from your favorites list.');

  }
  removeItemFromFavoritesListPersonal(e, idx) {
    AsyncStorage.getItem('favorites_list_personal', (err, result) => {
      //console.log(JSON.parse(result));
      var updated_array = JSON.parse(result);
      if (idx > -1) {
        updated_array.splice(idx, 1);
      }
      AsyncStorage.setItem("favorites_list_personal", JSON.stringify(updated_array), () => {
      })
    })

    Alert.alert(e.name + ' has been removed from your favorites list.');

  }
  seeRecipe(e, name) {
    const { navigate } = this.props.navigation;
    AsyncStorage.setItem("chosen_recipe", (JSON.stringify([])), () => {
    });
    if(e == "N/A") {
      var current_url = "N/A";
      AsyncStorage.setItem("current_recipe_url", current_url , () => {
        //console.log(current_url)
      });
      AsyncStorage.getItem('chosen_recipe', (err, result) => {
        //console.log(JSON.parse(result));
        var recipe_name_array = JSON.parse(result);
        recipe_name_array.push({
          "name": name,
        });
        AsyncStorage.setItem("chosen_recipe", JSON.stringify(recipe_name_array), () => {
        })
      })

    navigate('PersonalRecipe')
    }
    else {
      var current_url = 'http://api.yummly.com/v1/api/recipe/' + e + '?_app_id=' + API_ID + '&_app_key=' + API_KEY
      AsyncStorage.setItem("current_recipe_url", current_url, () => {
        //console.log(current_url)
      });
      navigate('Recipe')
    }

  }
  /*render favorites list in card list format*/
  renderFavoritesList(){
     return this.state.favorites_list.map((item, i) => { return(
       <CardItem key={i} button onPress={() => this.seeRecipe(item.id, item.name)}>
         <Left>
          <Thumbnail source={{uri: item.image}} />
         </Left>
         <Body>
            <Text>{item.name}</Text>
         </Body>

         <Right>
           <Icon name="star"
             onPress={() => this.removeItemFromFavoritesList(item, i)}
            />
         </Right>
       </CardItem> )
    })
  }
  renderFavoritesListPersonal(){
     return this.state.favorites_list_personal.map((item, i) => { return(
       <CardItem key={i} button onPress={() => this.seeRecipe(item.id, item.name)}>
         <Left>
          <Thumbnail source={require('../Assets/default_food_icon.png')} />
         </Left>
         <Body>
            <Text>{item.name}</Text>
         </Body>

         <Right>
           <Icon name="star"
             onPress={() => this.removeItemFromFavoritesListPersonal(item, i)}
            />
         </Right>
       </CardItem> )
    })
  }
  /*clears favorites list of all items*/
  clearList(){
    AsyncStorage.setItem("favorites_list", JSON.stringify([]), () => {
    });
    Alert.alert('List has been cleared.');
  }
  render() {
    return (
        <Container>
          <Header>
            <Left></Left>
            <Body>
              <Title>Favorites</Title>
            </Body>
            <Right>
              <Button transparent danger onPress={()=> this.clearList()}>
                <Text>Clear</Text>
              </Button>
            </Right>
          </Header>
          <Content>
            <Card style={{flex: 0}}>
              {this.renderFavoritesListPersonal()}
            </Card>
            <Card style={{flex: 0}}>
              {this.renderFavoritesList()}
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
