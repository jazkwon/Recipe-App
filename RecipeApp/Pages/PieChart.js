import { View } from 'react-native'
//import { BarChart, Grid, YAxis } from 'react-native-svg-charts'
import * as scale from 'd3-scale'
import {Title} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerNavigator } from 'react-navigation';
import { StyleSheet, Text, Image, AsyncStorage, ScrollView, Dimensions } from 'react-native';
import React from 'react';
import { Pie } from 'react-native-pathjs-charts'

/*renders Pie chart - takes in vitamin data retreived from stored nutrition data*/
export default class PieChart extends React.Component {
  constructor(props){
    super(props);
    var data_array = [];
    AsyncStorage.getItem('nutrition_data', (err, result) => {
      var parsedResult = JSON.parse(result);
      console.log(JSON.parse(result));
      console.log(JSON.parse(result).length);
      for(var i = 0; i < parsedResult.length; i++){
        if(parsedResult[i].attribute == "VITD-"){
          data_array.push([{
            "name": "Vitamin D",
            "value": parsedResult[i].value}])
        }
        else if(parsedResult[i].attribute == "VITC"){
          data_array.push([{
            "name": "Vitamin C",
            "value": parsedResult[i].value}])
        }
        else if(parsedResult[i].attribute == "VITA_IU"){
          data_array.push([{
            "name": "Vitamin A",
            "value": parsedResult[i].value}])
        }
        else if(parsedResult[i].attribute == "TOCPHA"){
          data_array.push([{
            "name": "Vitamin E",
            "value": parsedResult[i].value}])
        }
        else if(parsedResult[i].attribute == "VITK"){
          data_array.push([{
            "name": "Vitamin K",
            "value": parsedResult[i].value}])
        }
        else if(parsedResult[i].attribute == "PROCNT"){
          data_array.push([{
            "name": "Protein",
            "value": parsedResult[i].value}])
        }
      }
      console.log(data_array);
    });
    this.state = {
      data: data_array,
    }
  }
render() {
    let options = {
      margin: {
        top: 20,
        left: 20,
        right: 20,
        bottom: 20
      },
      width: 350,
      height: 350,
      color: '#2980B9',
      r: 50,
      R: 150,
      legendPosition: 'topLeft',
      animate: {
        type: 'oneByOne',
        duration: 200,
        fillTransition: 3
      },
      label: {
        fontFamily: 'Arial',
        fontSize: 8,
        fontWeight: true,
        color: '#ECF0F1'
      }
    }

    return (
      <View style={styles.container}>
        <Text style={styles.text}>Dose of Vitamins</Text>
        <Pie
          data={this.state.data}
          options={options}
          accessorKey="value" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  text:{
    fontSize: 16,
    fontWeight: 'bold',
  },
});
