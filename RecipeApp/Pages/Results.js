import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import _ from 'lodash';
import { StyleSheet, Text, View, ScrollView, AsyncStorage, TouchableOpacity, TouchableHighlight, FlatList, Linking, Alert} from 'react-native';
import { List, ListItem, Button } from 'react-native-elements';
import { DrawerNavigator } from 'react-navigation';
import Ionicon from 'react-native-vector-icons/Ionicons';


import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillUpdate is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
]);

const API_ID = '514c1c11';
const API_KEY = '04ca29129e7bb094692b9af1530793b4';
export default class Results extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Results',
    drawerIcon: (
      <MaterialIcon name="list" size={23} color="#000" />
    )
  }
  constructor(props) {
    super(props);

    this.state = {
      fetchError: '',
      url: '',
      results_data: '',
      image: '../Assets/food_icon.png'

    }
    this.getUrl = this.getUrl.bind(this);
    this.getData = this.getData.bind(this);
    this.getUrl();
  }
/*Grabs the saved search url from the search page*/
  getUrl() {
    AsyncStorage.getItem('search_url')
      .then((value) => {
        const data = value;
        console.log(data);
        this.setState({
            url: data
        });
        this.getData(data);
    });
  }
  /*Makes the API get Request to get the search result information for input query*/
  getData(url){
    //console.log(url);
    axios.get(url, {
    }).then((response) => {
      this.setState({ results_data: response.data});
      let data = response.data;
      AsyncStorage.setItem("results_data", JSON.stringify(data), () => {
        AsyncStorage.getItem('results_data', (err, result) => {
          //console.log(result);
        });
      });
    })
    .catch(error => {
      console.log('Error fetching and parsing results data', error);
      this.setState({ fetchError: error});
    })
  }
  saveRecipe(e) {
    var current_url = 'http://api.yummly.com/v1/api/recipe/' + e + '?_app_id=' + API_ID + '&_app_key=' + API_KEY
    AsyncStorage.setItem("current_recipe_id", e, () => {
      //console.log(e)
    });
    AsyncStorage.setItem("current_recipe_url", current_url, () => {
      //console.log(current_url)
    });
    const { navigate } = this.props.navigation;
    //console.log(e)
    navigate('Recipe')
  }
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };
  saveToFavorites(id, name, image){
    AsyncStorage.getItem('favorites_list_personal', (err, result) => {
      //console.log(JSON.parse(result));
      var fave_array = JSON.parse(result);
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
    return (
      <View style={{flex: 1}}>
        <List containerStyle={styles.listContainer}>
          <FlatList
            data={this.state.results_data.matches}
            renderItem={({ item }) => (
              <TouchableHighlight
                style={styles.highlight}>
                <ListItem
                  avatarStyle={styles.avatarStyle}
                  title={`${' '}${item.recipeName}`}
                  subtitleNumberOfLines={7}
                  subtitle={`${'   '}${'Rating: '}${item.rating}${'\n'}${'   '}${"Item-Id: "}${item.id}`}
                  avatar={{uri: item.smallImageUrls[0]}}
                  rightIcon={{name: 'keyboard-arrow-right', color: 'black'}}
                  onPress={() => this.saveRecipe(item.id) }
                  leftIcon={{name: 'star', color: 'gray'}}
                  leftIconOnPress={() => this.saveToFavorites(item.id, item.recipeName, item.smallImageUrls[0])}


                />
              </TouchableHighlight>
            )}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={this.renderSeparator}
          />
        <TouchableOpacity onPress={() => navigate('Favorites')} style={styles.addButton}>
            <Ionicon name="ios-star" size={26} color="#fff" />
          </TouchableOpacity>
        </List>
      </View>
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
  avatarStyle: {
    height: 40,
    width: 40,
    borderRadius: 10,
  },
  highlight: {
    backgroundColor: 'rgba(211,211,211, 0.2)',
  },
  listContainer: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
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
