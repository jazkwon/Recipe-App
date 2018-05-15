import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Alert,
    AsyncStorage
} from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Container, Content, Button, Input, Item, Header, Right, Left, Body } from 'native-base';
import { YellowBox } from 'react-native';

/*Source referenced for to do list: https://www.youtube.com/watch?v=xb8uTN3qiUI*/

import Ingredient from './AddIngredient';

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillUpdate is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Warning: Failed prop type',
]);

export default class AddMyRecipe extends Component {
    static navigationOptions = {
      drawerLabel: 'Add Recipe',
      drawerIcon: (
        <MaterialIcon name="note-add" size={23} color="#000" />
      )
    }
    constructor(props){
        super(props);
        this.state = {
            noteArray: [],
            noteText: '',
            recipeName: '',
            totalTime: '',
            servings: '',
            recipeYield: '',
            ingredients: [],
            recipeInfo: [],
            image: '../Assets/default_food_icon.png',
        };
    }

    addNote(){
        if(this.state.noteText){
            var d = new Date();
            this.state.noteArray.push({
                'ingredient': this.state.noteText
            });
            this.setState({ noteArray: this.state.noteArray });
            this.setState({noteText:''});
        }
    }

/* deletes note data from note array*/
    deleteNote(key){
        this.state.noteArray.splice(key, 1);
        this.setState({noteArray: this.state.noteArray});
    }
    addRecipe(){
      AsyncStorage.getItem('favorites_list_personal', (err, result) => {
        //console.log(JSON.parse(result));
        var fave_array = JSON.parse(result);
        fave_array.push({
          "name": this.state.recipeName,
          "id": "N/A",
          "image": this.state.image,
          "servings": this.state.servings,
          "totalTime": this.state.totalTime,
          "yield": this.state.recipeYield,
          "ingredientLines": this.state.noteArray,
        });
        AsyncStorage.setItem("favorites_list_personal", JSON.stringify(fave_array), () => {
        })
      })

      Alert.alert('Recipe has been added');
    }

    render() {
        let ingredients = this.state.noteArray.map((val, key)=>{
            return <Ingredient key={key} keyval={key} val={val}
                    deleteMethod={()=>this.deleteNote(key)}/>
        });
        return (
            <View style={styles.container}>
                <Header style={styles.header}>
                  <Left>
                  </Left>
                  <Body>
                    <Text style={styles.headerText}>New Recipe</Text>
                  </Body>
                  <Right>
                    <Button transparent dangerous onPress={()=> this.addRecipe()}>
                      <Text style={styles.submitButton}>Add</Text>
                    </Button>
                  </Right>
                </Header>
                <ScrollView style={styles.scrollContainer}>
                  <Content style={styles.content}>
                    <Item style={styles.textBoxContainer} regular>
                      <Input
                      placeholder='Enter Recipe Name...'
                      onChangeText={(recipeName)=> this.setState({recipeName})}
                      value={this.state.recipeName} />
                    </Item>
                  </Content>
                  <Content style={styles.content}>
                    <Item style={styles.textBoxContainer} regular>
                      <Input
                      placeholder='Enter Total Time...'
                      onChangeText={(totalTime)=> this.setState({totalTime})}
                      value={this.state.totalTime} />
                    </Item>
                  </Content>
                  <Content style={styles.content}>
                    <Item style={styles.textBoxContainer} regular>
                      <Input
                      placeholder='Enter Serving Size...'
                      onChangeText={(servings)=> this.setState({servings})}
                      value={this.state.servings} />
                    </Item>
                  </Content>
                  <Content style={styles.content}>
                    <Item style={styles.textBoxContainer} regular>
                      <Input
                      placeholder='Enter Yield Size'
                      onChangeText={(recipeYield)=> this.setState({recipeYield})}
                      value={this.state.recipeYield} />
                    </Item>
                  </Content>
                    {ingredients}
                </ScrollView>

                <View style={styles.footer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder='...Add Note here'
                        onChangeText={(noteText)=> this.setState({noteText})}
                        value={this.state.noteText}
                        placeholderTextColor='gray'
                        multiline={true}
                        underlineColorAndroid='transparent'>
                    </TextInput>
                </View>
                <TouchableOpacity onPress={ this.addNote.bind(this) } style={styles.addButton}>
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#ff793f',
        borderBottomWidth: 10,
        borderBottomColor: '#ddd'
    },
    headerText: {
        color: 'black',
        fontSize: 20,
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 100
    },
    footer: {
        padding: 10,
        margin: 10,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10
    },
    textInput: {
        alignSelf: 'stretch',
        color: 'black',
        padding: 30,
        borderColor: 'black',
        borderRadius: 4,
        borderWidth: 1,
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
    },
    textBoxContainer: {
      color: '#000',
      borderColor: 'black',
      borderRadius: 4,
      borderWidth: 1,
    },
    content: {
      padding: 5,
      margin: 5,
    },
    submitButton: {
      color: '#d63031',
      fontSize: 15,
    },
});
