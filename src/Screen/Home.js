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
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "989356703954",
    appId: "",
    measurementId: ""
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
      avatar :'',
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
            <Button transparent onPress={()=> this.props.navigation.navigate('Contact')}>
              <Icon style={style.Icon} name='new-message' type='Entypo' />
            </Button>
          </Right>
        </Header>
        <Content>

          <List>
            <ListItem thumbnail>
              <Left>
                <Thumbnail style={style.Thumbnail} square source={{ uri: `https://ui-avatars.com/api/?size=256&name=`+this.state.userProfile.username+'`'}} />
              </Left>
              <Body>
                <Text onPress={()=> this.props.navigation.navigate('Profile',{username: this.state.userProfile.username, email : this.state.userProfile.email, phone : this.state.userProfile.phone })} >{this.state.userProfile.username}</Text>
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
                <Thumbnail style={style.Thumbnail} square source={{ uri: `https://ui-avatars.com/api/?size=256&name=`+data.username+'`'}} />
              </Left>
              <Body>
                <Text>{data.username}</Text>
                <Text note numberOfLines={1}>Messages</Text>
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
