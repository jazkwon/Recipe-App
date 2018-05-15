import React from 'react';
import { StyleSheet, Text, View, Alert, TextInput, Button, Image, ScrollView, AsyncStorage, TouchableHighlight, ImageBackground} from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import Octicon from 'react-native-vector-icons/Octicons';
import { SearchBar, CheckBox } from 'react-native-elements';
import { Container, Header, Left, Body, Right, Icon, Title, Picker, Form, Item as FormItem } from 'native-base';
import MultiSelect from 'react-native-multiple-select';
import SelectMultiple from 'react-native-select-multiple';
const Item = Picker.Item;


const API_ID = '514c1c11';
const API_KEY = '04ca29129e7bb094692b9af1530793b4';

export default class Search extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Search',
    drawerIcon: (
      <Octicon name="search" size={23} color="#000" />
    )
  }
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      url: '',
      error: '',
      dairy: '&allowedAllergy[]=396^Dairy-Free',
      gluten: '&allowedAllergy[]=393^Gluten-Free',
      seafood: '&allowedAllergy[]=393^Seafood-Free',
      peanut: '&allowedAllergy[]=393^Peanut-Free',
      american: '&allowedCuisine[]=cuisine^cuisine-american',
      italian: '&allowedCuisine[]=cuisine^cuisine-italian',
      mexican: '&allowedCuisine[]=cuisine^cuisine-mexican',
      indian: '&allowedCuisine[]=cuisine^cuisine-indian',
      chinese: '&allowedCuisine[]=cuisine^cuisine-chinese',
      japanese: '&allowedCuisine[]=cuisine^cuisine-japanese',
      selectedOptions: '',

    }
    this.handlePress = this.handlePress.bind(this);
  };
  /*once sumbit button is pressed, the text input is added as a query paremeter to url for the API Get Request*/
  handlePress() {
    const { text } = this.state ;
    this.setState({ text: this.state.text});
    this.setState({ url: 'http://api.yummly.com/v1/api/recipes?_app_id=' + API_ID + '&_app_key=' + API_KEY + '&q=' + text.replace(" ", "+")+'&maxResult=50&start=20'});
    AsyncStorage.setItem("search_text", (this.state.text), () => {
    });
    AsyncStorage.setItem("search_url", ('http://api.yummly.com/v1/api/recipes?_app_id=' + API_ID + '&_app_key=' + API_KEY + '&q=' + text.replace(" ", "+")+ this.state.selectedOptions+'&maxResult=50&start=20'), () => {
    });
  }
  /*method that updates chosen filter value*/
  onValueChangeSort(value: string) {
    this.setState({
      selectedOptions: value
    });
    console.log(value);
  }
  render() {
    const { selectedItems } = this.state;
    const { navigate } = this.props.navigation;
    return (
      <ImageBackground source={require('../Assets/food2.jpg')}style={styles.headerContainer}>
        <ScrollView>
          <Header>
            <Left>
              <Title style={styles.headerTitle}>Yummly</Title>
            </Left>
            <Body>
              <Title>Recipe App</Title>
            </Body>
            <Right>
            </Right>
          </Header>
        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            value={this.state.text}
            placeholder='Enter a Recipe'
            autoCapitalize = 'none'
            onChangeText={(text) => this.setState({text})}
            />
            <Button
              onPress={() => { this.handlePress()}}
              color='black'
              title='Submit'
            />
        </View>
        <Form style={styles.form}>
          <Picker
            style={styles.item}
            mode="dropdown"
            headerStyle={{ backgroundColor: 'orange' }}
            headerBackButtonTextStyle={{ color: "#fff" }}
            headerTitleStyle={{ color: "#fff" }}
            selectedValue={this.state.selectedOptions}
            onValueChange={this.onValueChangeSort.bind(this)}
          >
            <Item label="No Filter..." value="" />
            <Item label="Dairy-Free" value="&allowedAllergy[]=396^Dairy-Free" />
            <Item label="Gluten-Free" value="&allowedAllergy[]=393^Gluten-Free" />
            <Item label="Seafood-Free date" value="&allowedAllergy[]=393^Seafood-Free" />
            <Item label="Peanut-Free" value="&allowedAllergy[]=393^Peanut-Free" />
            <Item label="American" value="&allowedCuisine[]=cuisine^cuisine-american" />
            <Item label="Italian" value="&allowedCuisine[]=cuisine^cuisine-italian" />
            <Item label="Mexican" value="&allowedCuisine[]=cuisine^cuisine-mexican" />
            <Item label="Indian" value="&allowedCuisine[]=cuisine^cuisine-indian" />
            <Item label="Chinese" value="&allowedCuisine[]=cuisine^cuisine-chinese" />
            <Item label="Japanese" value="&allowedCuisine[]=cuisine^cuisine-japanase" />
          </Picker>
        </Form>
        <View style={styles.inner}>
          <View style={styles.logoContainer}>
            <TouchableHighlight onPress={() =>  navigate('Results')}>
              <Image
                style={styles.logo}
                source={require('../Assets/yummly_app_icon.png')}
                />
            </TouchableHighlight>
          </View>
        </View>

        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: '#999',
  alignItems: 'center',
  justifyContent: 'center',
  },
  headerContainer: {
    flex: 1,
    backgroundColor: '#ECE2D8'
  },
  inputText: {
    color: '#000',
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#E36428'
  },
  searchInput: {
    height: 40,
    padding: 4,
    marginRight: 5,
    flexGrow: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#E36428',
    borderRadius: 8,
    color: 'black',
    backgroundColor: 'white',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
    margin: 50,
  },
  logo: {
    width: 200,
    height: 200,
  },
  headerTitle: {
    color: '#E0601D',
    fontWeight: 'bold',
    fontStyle: 'italic'
  },
  title: {
    color: '#FFF',
    marginTop: 10,
    width: 160,
    textAlign: 'center',
    opacity: 0.9,
    fontSize: 30,
  },
  inner: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
    margin: 50,
    width: '80%',
    height: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  form: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: 'black',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
});
