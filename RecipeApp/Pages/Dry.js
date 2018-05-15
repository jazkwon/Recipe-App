import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

export default class Dry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['(oz)', '(pounds)', '(g)'],
      tableData: [
        ['1', '-', '30 (28.35 g)'],
        ['2', '-', '55'],
        ['3', '-', '85'],
        ['4', '1/4', '125'],
        ['8', '1/2', '240'],
        ['12', '3/4', '375'],
        ['16', '1', '454'],
        ['32', '2', '907']
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
