import React, {Component} from 'react'
import {View, StyleSheet,FlatList,TouchableOpacity, } from 'react-native';
import { Container,Content,Card, Grid, Item, Input, CardItem, Text, Subtitle, Col, Row, Thumbnail, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { GiftedChat } from 'react-native-gifted-chat'
import firebase from 'firebase'

if (!firebase.apps.length) {

firebase.initializeApp({
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
});

}

export default class Chat extends Component {

	state = {
    messages: [],
    newMessage:[],
    toUser: [],
    users: [],
    usernow: []
    }

    componentWillMount() {
    this.setState({

      toUser: this.props.navigation.getParam('username'),
      
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flh6.googleusercontent.com%2F-ynV9ZmzeSnk%2FTX-DYUnBMCI%2FAAAAAAAAAFk%2FDcQq5CuMTYs%2Fs1600%2Fotaku.JPG&f=1&nofb=1',
          },
          
        },
      ],
    })
    this.writeUserData(this);

  }

  writeUserData(){

    var recentPostsRef = firebase.database().ref('/user');
    recentPostsRef.once('value').then(data => {
    this.setState({ users: data.val() })

    {Object.keys(this.state.users).map(key =>{
    
     if(this.state.users[key].email == firebase.auth().currentUser.email){
        this.setState({usernow :this.state.users[key]})
     }

     })}   
    
    }) 

}

   onSend(messages = []) {
     this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
     }))
      console.log("userSend :"+this.state.usernow.username)  
      console.log("userTo   :"+this.state.toUser)    

  }

	render() {
     console.log(this.state.messages)
		return (
		<Container>
		 <Header style={style.Header}>
		    <Left>
		    <Button transparent>
              <Icon style={style.Icon} name='arrow-back' onPress={()=> this.props.navigation.goBack(null)} />
            </Button>
            </Left>
            <Body>
                <Text>{this.state.toUser}</Text>
                <Text note numberOfLines={1}>Online</Text>
            </Body>
            <Right>
            	<Button transparent onPress={()=> this.props.navigation.goBack(null)}>
                  <Icon type='Entypo' style={style.Icon} name='video-camera' />
                </Button>
                <Button transparent onPress={()=> this.props.navigation.goBack(null)}>
                  <Icon type='Feather' style={style.Icon} name='phone' />
                </Button>
            </Right>
        </Header>
	    <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
      </Container>
		)
	}
}

const style = StyleSheet.create({
  Header:{
  	backgroundColor:'#fff'
  },
  Container :{
    backgroundColor: '#dff9fb'
  },
  Header:{
    backgroundColor: '#ffff'
  },
  Content:{
  	padding: '2%'
  },
  Font :{
    color: '#95afc0'
  },
  Chat :{
  	width: '70%',
  	elevation:1,
  },
  ChatItemLeft :{
  	backgroundColor: '#00a8ff',
  	justifyContent:'flex-start'
  },
  ChatItemRight :{
  	backgroundColor: '#00a8ff',
  	justifyContent:'center'
  },
  Text:{
  	color: '#f5f6fa'
  },
  Icon :{
    color: '#686de0'
  },
  Thumbnail :{
    borderRadius: 50,
    width: 40,
    height:40,
  },

})
