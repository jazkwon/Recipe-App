import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

export default class Liquid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['(tsp)', '(cup)', '(oz)', '(tbsp)', '(ml)'],
      tableData: [
        ['1', '-', '-', '1/3', '5'],
        ['3', '-', '1/2', '1', '15'],
        ['6', '1/8', '1', '2', '30'],
        ['12', '1/4', '2', '4', '59'],
        ['16', '1/3', '2 2/3', '5 1/3', '79'],
        ['24', '1/2', '4', '8', '118'],
        ['32', '2/3', '5 1/3', '10 2/3', '158'],
        ['36', '3/4', '6', '12', '177'],
        ['48', '1', '8', '16', '237'],
        ['96', '2', '16', '32', '473'],
        ['192', '4', '32', '64', '946']
      ]
    }
  }

  render() {
    const state = this.state;
    return (
      <View style={styles.container}>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={state.tableData} textStyle={styles.text}/>
        </Table>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
});
