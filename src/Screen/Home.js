/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet,FlatList,TouchableNativeFeedback, } from 'react-native';
import { Container, Content, List, Separator, ListItem, Header, Left, Thumbnail, Button, Icon, Body, Title, Right, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import firebase from 'firebase'

if (!firebase.apps.length) {

firebase.initializeApp({
    apiKey: "AIzaSyDmF6Cpqi4EWl7XmdDR7HzzPgp0Pu3vw1o",
    authDomain: "boxtime-cf046.firebaseapp.com",
    databaseURL: "https://boxtime-cf046.firebaseio.com",
    projectId: "boxtime-cf046",
    storageBucket: "boxtime-cf046.appspot.com",
    messagingSenderId: "989356703954",
    appId: "1:989356703954:web:14f53a735551ccac462d0b",
    measurementId: "G-CYB8L17ZBM"
});

}

class Home extends Component {
constructor(props){
    super(props);
    this.state = {
      users :[],
      contact:[],
      whoim: '',
      email:'', 
      username:'', 
      phone:'', 
      password:'',
      error:'',
      userProfile:[],
      loading: true
    }
  }

componentDidMount() {
    

    this.setState({
       whoim : firebase.auth().currentUser.email
    })
    this.writeUserData(this);

  }

  writeUserData(){
      
    var recentPostsRef = firebase.database().ref('/user');
    recentPostsRef.once('value').then(data => {
    

    this.setState({ 
      users: data.val()})

     {Object.keys(this.state.users).map(key =>{

      if(this.state.users[key].email == this.state.whoim){
          this.setState({userProfile : this.state.users[key]})
        }

     if(this.state.users[key].email != this.state.whoim){
        this.setState({contact :[...this.state.contact, this.state.users[key]]})

     }


     })}

    })    
    
}

  render() {

    return (
      <Container style={style.Container}>
        <Header style={style.Header}>
        <Left>
            <Button transparent>
              <Icon style={style.Icon} type='Ionicons' name='ios-search' />
            </Button>
          </Left>
          <Body style={style.Body}>
            <Title style={style.Title}>Chat message</Title>
          </Body>
          <Right>
            <Button transparent onPress={()=> this.props.navigation.navigate('ChatRoom')}>
              <Icon style={style.Icon} name='new-message' type='Entypo' />
            </Button>
          </Right>
        </Header>
        <Content>

          <List>
            <ListItem thumbnail>
              <Left>
                <Thumbnail style={style.Thumbnail} square source={{ uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flh6.googleusercontent.com%2F-ynV9ZmzeSnk%2FTX-DYUnBMCI%2FAAAAAAAAAFk%2FDcQq5CuMTYs%2Fs1600%2Fotaku.JPG&f=1&nofb=1' }} />
              </Left>
              <Body>
                <Text>{this.state.userProfile.username}</Text>
                <Text note numberOfLines={1}>{this.state.userProfile.email}</Text>
              </Body>
            </ListItem>
          </List>

          <Separator bordered>
            <Text>Family</Text>
          </Separator>

          {this.state.contact.map(data =>{

          return(

            <List>
            <ListItem thumbnail onPress={()=> this.props.navigation.navigate('ChatRoom',{username: data.username, usersend: this.state.userProfile.username })}>
              <Left>
                <Thumbnail style={style.Thumbnail} square source={{ uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flh6.googleusercontent.com%2F-ynV9ZmzeSnk%2FTX-DYUnBMCI%2FAAAAAAAAAFk%2FDcQq5CuMTYs%2Fs1600%2Fotaku.JPG&f=1&nofb=1' }} />
              </Left>
              <Body>
                <Text>{data.username}</Text>
                <Text note numberOfLines={1}>Ayoo</Text>
              </Body>
              <Right>
                  <Text note numberOfLines={1}>09:30</Text>
              </Right>
            </ListItem>
          </List>
          
          )})}  
          
        </Content>
      </Container>
    );
  }
}
const style = StyleSheet.create({

  Container :{
    backgroundColor: '#dff9fb'
  },
  Header:{
    backgroundColor: '#ffff'
  },
  Icon :{
    color: '#686de0'
  },
  Title :{
    color: '#686de0'
  },
  Body :{
    alignItems : 'center',
    fontSize: 10
  },
  Thumbnail :{
    borderRadius: 50
  }

})
export default Home