import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { StyleSheet, View, ScrollView, Image, AsyncStorage, TouchableOpacity, TouchableHighlight, FlatList, Linking, Alert } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Container, Header, Content, Card, Title, CardItem, Thumbnail, Text, Button, Icon, Right, Left, Body } from 'native-base';
import Octicon from 'react-native-vector-icons/Octicons';
import { YellowBox } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { Rating } from 'react-native-elements';
import StarRating from 'react-native-star-rating';



YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillUpdate is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
]);

export default class Recipe extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Recipe',
    drawerIcon: (
      <MaterialCommunityIcon name="cookie" size={23} color="#000" />
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
            <Text>{item}</Text>
         </Left>

         <Right>
           <Icon name="add-circle"
             onPress={() => this.addItemToShoppingList(item)}
            />
         </Right>
       </CardItem> )
    })
  }
  saveToFavorites(id, name, image){
    AsyncStorage.getItem('favorites_list', (err, result) => {
      //console.log(JSON.parse(result));
      var fave_array = JSON.parse(result);
      if(fave_array == null){
        AsyncStorage.setItem("favorites_list", (JSON.stringify([])), () => {});
      }
      fave_array.push({
        "name": name,
        "id": id,
        "image": image
      });
      AsyncStorage.setItem("favorites_list", JSON.stringify(fave_array), () => {
      })
    })

    Alert.alert(name + ' has been added to your favorites list.');
    //const { navigate } = this.props.navigation;
    //navigate('Favorites')
    return;
  }
  render() {
    const { navigate } = this.props.navigation;
    const { rating } = this.props;
    return (
        <Container>
          <Header>
            <Left></Left>
            <Body>
              <Title>Recipe</Title>
            </Body>
            <Right>
              <Button transparent danger onPress={()=> this.saveToFavorites(this.state.id, this.state.name, this.state.small_image)}>
                <Ionicon name="md-star-outline" size={25} color="#000" />
              </Button>
            </Right>
          </Header>
          <Content>
            <Card style={{flex: 0}}>
              <CardItem>
                <Left>
                  <Thumbnail source={{uri: this.state.small_image}} />
                  <Body>
                    <Text>{this.state.name}</Text>
                    <Text note>......</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem>
                <Body>
                  <Image source={{uri: this.state.main_image}} style={{height: 200, width: 200, flex: 1}}/>
                </Body>
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
                </Body>
              </CardItem>
              <CardItem>
                <Body>
                  <Text>
                    Yield: {this.state.yield}
                  </Text>
                </Body>
              </CardItem>
              <CardItem>
                <Body>
                  <Text>Rating: {this.state.rating}</Text>
                </Body>
                  <StarRating
                    disabled={false}
                    emptyStar={'ios-star-outline'}
                    fullStar={'ios-star'}
                    halfStar={'ios-star-half'}
                    iconSet={'Ionicons'}
                    maxStars={5}
                    rating={parseInt(this.state.rating)}
                    fullStarColor={'#f1c40f'}
                    starSize={20}
                  />
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
          <TouchableOpacity onPress={() => navigate('Nutrition')} style={styles.addButton}>
            <Ionicon name="ios-nutrition" size={26} color="#fff" />
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
