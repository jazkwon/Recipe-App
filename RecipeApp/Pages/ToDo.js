import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Container, Header, Right, Left, Body } from 'native-base';

/*Source referenced for to do list: https://www.youtube.com/watch?v=xb8uTN3qiUI*/

import Note from './Notes';

/*renders to do list - button in the bottom corner adds typed note/text into list*/
export default class ToDo extends Component {
    static navigationOptions = {
      drawerLabel: 'ToDo List',
      drawerIcon: (
        <MaterialIcon name="list" size={23} color="#000" />
      )
    }
    constructor(props){
        super(props);
        this.state = {
            noteArray: [],
            noteText: '',
        };
    }

/* formats real time to  current time - helps to indicate when the note was added*/
    formatTime(date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
    }

/*saves note data and add to note array*/
    addNote(){
        if(this.state.noteText){
            var d = new Date();
            this.state.noteArray.push({
                'date': (d.getMonth()+1) +
                "/"+ d.getDate() +
                "/"+ d.getFullYear() +
                " at " +
                this.formatTime(d),
                'note': this.state.noteText
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

    render() {
        let notes = this.state.noteArray.map((val, key)=>{
            return <Note key={key} keyval={key} val={val}
                    deleteMethod={()=>this.deleteNote(key)}/>
        });
        return (
            <View style={styles.container}>
                <Header style={styles.header}>
                  <Body>
                    <Text style={styles.headerText}>To Do</Text>
                  </Body>
                </Header>
                <ScrollView style={styles.scrollContainer}>
                    {notes}
                </ScrollView>

                <View style={styles.footer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder='...Add Note here'
                        onChangeText={(noteText)=> this.setState({noteText})}
                        value={this.state.noteText}
                        placeholderTextColor='white'
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
        color: '#fff',
        padding: 30,
        backgroundColor: '#252525',
        borderTopWidth:2,
        borderTopColor: '#ededed'
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
