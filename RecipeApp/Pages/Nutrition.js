import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { StyleSheet, View, ScrollView, Image, AsyncStorage, TouchableOpacity, TouchableHighlight, FlatList, Linking, Alert } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Container, Header, Content, Card, Title, CardItem, Thumbnail, Text, Button, Icon, Right, Left, Body } from 'native-base';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillUpdate is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
]);

export default class Nutrition extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Nutrition',
    drawerIcon: (
      <Ionicon name="ios-nutrition" size={23} color="#000" />
    )
  }
  constructor(props) {
    super(props);
    this.state = {
      fetchError: '',
      url: '',
      recipe_data: '',
      image: '../Assets/food_icon.png',
      nutrition_data: [],
    }
    this.getUrl = this.getUrl.bind(this);
    this.getData = this.getData.bind(this);
    this.renderNutritionList = this.renderNutritionList.bind(this);
    this.getUrl();
  }
  /*Grabs the saved recipe url from the search page*/
    getUrl() {
      AsyncStorage.getItem('current_recipe_url')
        .then((value) => {
          const data = value;
          console.log(data);
          this.setState({
              url: data
          });
          this.getData(data);
      });
    }
    /*Makes the API get Request to get the recipe data information then parse to get nutrition info*/
    getData(url){
      console.log(url);
      axios.get(url, {
      }).then((response) => {
        this.setState({ recipe_data: response.data});
        let data = response.data;
        AsyncStorage.setItem("recipe_data", JSON.stringify(data), () => {
          AsyncStorage.getItem('recipe_data', (err, result) => {
            //console.log(JSON.parse(result).nutritionEstimates);
          //  JSON.parse(result).nutritionEstimates.map((item) => {
          //    console.log(item.value);
          //    console.log(item.description);
          //    console.log(item.unit.plural);
          //  })
            //console.log(JSON.parse(result).nutritionEstimates[1].value);
            //console.log(JSON.parse(result).nutritionEstimates[1].description);
            //console.log(JSON.parse(result).nutritionEstimates[1].unit.plural);
            console.log(JSON.parse(result).nutritionEstimates);
            this.setState({
              nutrition_data: JSON.parse(result).nutritionEstimates,
            })
          });
        });
        AsyncStorage.setItem("nutrition_data", JSON.stringify(data.nutritionEstimates), () => {
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing recipe data', error);
        this.setState({ fetchError: error});
      })
    }
  /*render nutrition information - using card list format*/
  renderNutritionList(){
//    console.log(this.state.nutrition_data);
//    this.state.nutrition_data.map((item) => {
//        console.log(item.value);
//        console.log(item.description);
//        console.log(item.unit.plural);
//    })
    return this.state.nutrition_data.map((item, i) => { return(
      <CardItem key={i} button onPress={() => Alert.alert('button has been pressed')}>
        <Left>
           <Text>{(item.description) ? (item.description) : (item.attribute)}</Text>
        </Left>
        <Right>
           <Text>{item.value}{' '}{item.unit.plural}</Text>
        </Right>
      </CardItem> )
   })

  }

  render() {
    const { navigate } = this.props.navigation;
    return (
        <Container>
          <Header>
            <Body>
              <Title>Nutrition</Title>
            </Body>
          </Header>
          <Content>
            <Card style={{flex: 0}}>
                <CardItem>
                  <Left>
                    <Body>
                      <Text>Nutrition Facts:</Text>
                    </Body>
                  </Left>
                </CardItem>
                  {this.renderNutritionList()}
               </Card>
          </Content>
          <TouchableOpacity onPress={() => navigate('Graph')} style={styles.addButton}>
            <MaterialCommunityIcon name="chart-bar" size={23} color="#000" />
          </TouchableOpacity>
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
  addButton: {
      position: 'absolute',
      zIndex: 11,
      right: 20,
      bottom: 90,
      backgroundColor: '#ff793f',
      width: 70,
      height: 70,
      borderRadius: 35,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 8,
  },
  addButtonText: {
      color: '#000',
      fontSize: 24
  }
});
