import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { StyleSheet, View, ScrollView, Image, AsyncStorage, TouchableOpacity, TouchableHighlight, FlatList, Linking, Alert } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Container, Header, Content, Card, Title, CardItem, Thumbnail, Text, Button, Icon, Right, Left, Body } from 'native-base';
import Octicon from 'react-native-vector-icons/Octicons';
import { YellowBox } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillUpdate is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
]);

export default class PersonalRecipe extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Personal Recipe',
    drawerIcon: (
      <MaterialCommunityIcon name="food-croissant" size={23} color="#000" />
    )
  }
  constructor(props) {
    super(props);
    this.state = {
      fetchError: '',
      url: '',
      recipe_data: '',
      image: '../Assets/food_icon.png',
      link: "N/A",
      logo: "N/A",
      ingredients_array: [],
      flavors_array: [],
      name: "N/A",
      yield: "N/A",
      totalTime: "N/A",
      rating: "N/A",
      numServings: "N/A",
      id: "N/A",
      courses_array: [],
      cusines_array: [],
      images_array: [],

    }
    this.getUrl = this.getUrl.bind(this);
    this.getData = this.getData.bind(this);
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
    /*Makes the API get Request to get the recipe data information for input query*/
    getData(url){
      AsyncStorage.getItem('chosen_recipe')
        .then((value) => {
          const result = value;
          console.log(JSON.parse(result)[0].name);
          this.setState({ "name" : JSON.parse(result)[0].name })
      });
      if(url == "N/A") {
        AsyncStorage.getItem('favorites_list_personal')
          .then((value) => {
            const result = value;
            console.log(result);
            this.setState({
                recipe_data: JSON.parse(result)
            });
            var data = JSON.parse(result);
            for(var i = 0; i < data.length; i++){
              console.log(data[i].name);
              console.log(data[i].ingredientLines);
              if(data[i].name == this.state.name){
                this.setState({
                  ingredients_array: data[i].ingredientLines,
                  name: data[i].name,
                  yield: data[i].yield,
                  totalTime: data[i].totalTime,
                  numServings: data[i].servings,
                  id: data[i].id,
                  main_image: data[i].image,
                  small_image: data[i].image,
                })
              }
            }
        });

      }
      else{
      //console.log(url);
      axios.get(url, {
      }).then((response) => {
        this.setState({ recipe_data: response.data});
        let data = response.data;
        //console.log(response.data.attribution.url)
        //console.log(response.data.ingredientLines)
        //console.log(response.data.name)
        //console.log(response.data.yield)
        //console.log(response.data.totalTime)
        //console.log(response.data.numberOfServings)
        //console.log(response.data.rating)


        AsyncStorage.setItem("recipe_data", JSON.stringify(data), () => {
          AsyncStorage.getItem('recipe_data', (err, result) => {
            //console.log(JSON.parse(result).name);
            this.setState({
              link: JSON.parse(result).attribution.url,
              logo: JSON.parse(result).attribution.logo,
              ingredients_array: JSON.parse(result).ingredientLines,
              flavors_array: JSON.parse(result).flavors,
              name: JSON.parse(result).name,
              yield: JSON.parse(result).yield,
              totalTime: JSON.parse(result).totalTime,
              rating: JSON.parse(result).rating,
              numServings: JSON.parse(result).numberOfServings,
              id: JSON.parse(result).id,
              courses_array: JSON.parse(result).attributes.course,
              cusines_array: JSON.parse(result).attributes.cuisine,
              main_image: JSON.parse(result).images[0].hostedLargeUrl,
              small_image: JSON.parse(result).images[0].hostedSmallUrl,
              nutrition_data: JSON.parse(result).nutritionEstimates,


            })
          });
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing recipe data', error);
        this.setState({ fetchError: error});
      })
    }
  }
  /*function that adds ingredient item to shopping list*/
  addItemToShoppingList(e) {
    AsyncStorage.getItem('shopping_list', (err, result) => {
      //console.log(JSON.parse(result));
      var updated_array = JSON.parse(result);
      updated_array.push(e);
      AsyncStorage.setItem("shopping_list", JSON.stringify(updated_array), () => {
      })
    })

    Alert.alert(e + ' has been added to your shopping list.');

  }
  /*method that renders ingredients list in list (card list) format*/
  renderIngredientsList(){
     return this.state.ingredients_array.map((item, i) => { return(
       <CardItem key={i} button onPress={() => Alert.alert('button has been pressed')}>
         <Left>
            <Text>{item.ingredient}</Text>
         </Left>

         <Right>
           <Icon name="add-circle"
             onPress={() => this.addItemToShoppingList(item.ingredient)}
            />
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
              <Title>My Recipe</Title>
            </Body>
          </Header>
          <Content>
            <Card style={{flex: 0}}>
              <CardItem>
                <Left>
                  <Thumbnail source={{uri: '../Assets/default_food_icon.png'}} />
                  <Body>
                    <Text>{this.state.name}</Text>
                    <Text note>......</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem>
                <Left>
                  <MaterialCommunityIcon name="clock" size={20} color="#000" />
                  <Text>
                    {'\n'}Total Time: {this.state.totalTime}
                  </Text>
                </Left>
                <Right></Right>
              </CardItem>
              <CardItem>
                <Body>
                  <Text>
                      Number Of Servings: {this.state.numServings}
                  </Text>
                  <Text>
                    Yield: {this.state.yield}
                  </Text>
                </Body>
              </CardItem>
              <CardItem>
                <Body>
                </Body>
              </CardItem>
            </Card>
              <Card>
                <CardItem>
                  <Left>
                    <Body>
                      <Text>Ingredients:</Text>
                    </Body>
                  </Left>
                </CardItem>
                  {this.renderIngredientsList()}
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
