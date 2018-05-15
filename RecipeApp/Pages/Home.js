import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import Octicon from 'react-native-vector-icons/Octicons';
import { ScrollView, AsyncStorage, TouchableOpacity, TouchableHighlight, FlatList, Linking, Alert, ImageBackground } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { DrawerNavigator } from 'react-navigation';

export default class Home extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: (
      <Octicon name="home" size={23} color="#000" />
    )
  }
  constructor(props){
    super(props);
//    AsyncStorage.setItem("favorites_list", (JSON.stringify([])), () => {
//    });
//    AsyncStorage.setItem("favorites_list_personal", (JSON.stringify([])), () => {
//    });
//    AsyncStorage.setItem("shopping_list", (JSON.stringify([])), () => {
//    });
//    let context = this;
    this.checkListsExists();

  }

  async checkListsExists(){
    try {
      let fav_list = await AsyncStorage.getItem('favorites_list');
      let fav_list_personal = await AsyncStorage.getItem('favorites_list_personal');
      let shop_list = await AsyncStorage.getItem('shopping_list');
      if (fav_list != null){
        AsyncStorage.setItem("favorites_list", (JSON.stringify([])), () => {});
      }
      else if(fav_list_personal != null){
        AsyncStorage.setItem("favorites_list_personal", (JSON.stringify([])), () => {});

      }
      else if(shop_list != null){
        AsyncStorage.setItem("shopping_list", (JSON.stringify([])), () => {});

      }
      else {
        console.log("All lists exist.")
      }
    }
    catch (error) {
        console.log("Error: Cannot check existing lists.")

      }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ImageBackground source={require('../Assets/food3.jpg')}style={styles.headerContainer}>
        <View style={styles.container}>
          <View style={styles.CircleShapeView}>
          <Text style={styles.text}>Welcome to the Recipe App</Text>
          </View>
          <Text style={styles.miniText}>Powered By</Text>
            <Image
              style={styles.logo}
              source={require('../Assets/Yummly_logo.png')}
            />
          <View style={styles.myButtons}>
            <TouchableOpacity onPress={() => navigate('Search')} style={styles.addButton}>
                <Octicon name="search" size={23} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate('ToDo')} style={styles.addButton}>
              <Octicon name="list-unordered" size={23} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate('Favorites')} style={styles.addButton}>
              <Octicon name="star" size={23} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate('ShoppingList')} style={styles.addButton}>
              <Entypo name="shopping-basket" size={23} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  CircleShapeView: {
  width: 250,
  height: 250,
  borderRadius: 250/2,
  backgroundColor: '#E0602D',
  justifyContent: 'center',
  alignItems: 'center'
  },
  text: {
    fontSize: 35,
    color: 'white',
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
    fontFamily: 'Marker Felt'
  },
  miniText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#E36428',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
    margin: 50,
  },
  logo: {
    width: 165,
    height: 60,
  },
  headerContainer: {
    flex: 1,
    backgroundColor: '#ECE2D8'
  },
  addButton: {
    marginTop: 20,
    margin: 20,
    backgroundColor: '#E0602D',
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
  },
  myButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
