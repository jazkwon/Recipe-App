import { View } from 'react-native'
//import { BarChart, Grid, YAxis } from 'react-native-svg-charts'
import * as scale from 'd3-scale'
import {Title} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerNavigator } from 'react-navigation';
import { StyleSheet, Text, Image, AsyncStorage, ScrollView, Dimensions } from 'react-native';
import React from 'react';
import { Bar } from 'react-native-pathjs-charts'

/* renders bar chart - takes in mineral data from nutrition data stored previously*/
export default class BarChart extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Visualization',
    drawerIcon: (
      <MaterialCommunityIcons name="chart-bar" size={23} color="#000" />
    )
  }
  constructor(props){
    super(props);
    var data_array = [];
    AsyncStorage.getItem('nutrition_data', (err, result) => {
      var parsedResult = JSON.parse(result);
      console.log(JSON.parse(result));
      console.log(JSON.parse(result).length);
      for(var i = 0; i < parsedResult.length; i++){
        if(parsedResult[i].attribute == "NA"){
          data_array.push([{
            "name": "Sodium",
            "value": parsedResult[i].value}])
        }
        else if(parsedResult[i].attribute == "FAT"){
          data_array.push([{
            "name": "Total Fat",
            "value": parsedResult[i].value}])
        }
        else if(parsedResult[i].attribute == "FIBTG"){
          data_array.push([{
            "name": "Fiber",
            "value": parsedResult[i].value}])
        }
        else if(parsedResult[i].attribute == "SUGAR"){
          data_array.push([{
            "name": "Sugar",
            "value": parsedResult[i].value}])
        }
        else if(parsedResult[i].attribute == "CHOLE"){
          data_array.push([{
            "name": "Cholesterol",
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
      width: 300,
      height: 300,
      margin: {
        top: 20,
        left: 25,
        bottom: 50,
        right: 20
      },
      color: '#6c5ce7',
      gutter: 20,
      animate: {
        type: 'oneByOne',
        duration: 200,
        fillTransition: 3
      },
      axisX: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'bottom',
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: true,
          fill: '#34495E',
          rotate: 45
        }
      },
      axisY: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'left',
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: true,
          fill: '#34495E'
        }
      }
    }

    return (
      <View style={styles.container}>
        <Text style={styles.text}>Diet Intake</Text>
        <Bar data={this.state.data} options={options} accessorKey='value'/>
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
