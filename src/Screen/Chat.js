import React, {Component} from 'react'
import {View, StyleSheet,FlatList,TouchableOpacity, } from 'react-native';
import { Container,Content,Card, Grid, Item, Input, CardItem, Text, Subtitle, Col, Row, Thumbnail, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { GiftedChat } from 'react-native-gifted-chat'
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

export default class Chat extends Component {

	state = {
    messages: [],
    newMessage:[],
    toUser: [],
    users: [],
    usernow: [],
    _id:'',
    email: ''
    }

    componentWillMount() {
    
    this.setState({

      toUser: this.props.navigation.getParam('username'),
      _id : firebase.auth().currentUser.uid,
      email: firebase.auth().currentUser.email,
      messages: [
        // {
        //   _id: 1,
        //   text: 'Hello developer',
        //   createdAt: new Date(),
        //   user: {
        //     _id: 2,
        //     name: 'React Native',
        //     avatar: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flh6.googleusercontent.com%2F-ynV9ZmzeSnk%2FTX-DYUnBMCI%2FAAAAAAAAAFk%2FDcQq5CuMTYs%2Fs1600%2Fotaku.JPG&f=1&nofb=1',
        //   },
          
        // },
      ],
    })

    this.writeUserData(this)
    this.getchatData(this)
    
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



getchatData(){

    let messageTo = this.props.navigation.getParam('username')
    let messagefrom = this.props.navigation.getParam('usersend')
    
    var chatRef = firebase.database().ref('/messages/'+messagefrom+'/'+messageTo);
    chatRef.once('value',
      
      (dataSnapshot)=>{

        var messageS =[]

        dataSnapshot.forEach((child)=>{
          messageS=[({

          _id : child.key,
          text: child.val().text,
          createdAt: child.val().createdAt,
          user:{

            _id : child.val().user.id,
            name: child.val().user.name
          }

          }),...messageS]
          
        })
        this.setState({messages: messageS})
      }

      ).then(data => {
    this.setState({ users: data.val() })
        
    }) 

}


   onSend(messages = []) {

    //Pengirim
    messages.map(data=>{
      
    let db = firebase.database();
    let ref = db.ref('messages/'+this.state.toUser+'/'+this.state.usernow.username);

    ref.push({
        text : data.text,
        createdAt : new Date().getTime(),
        user : {
                  id : this.state._id,
                  avatar: '',
                  email :this.state.email,
                  _id : this.state._id,
                  name: this.state.usernow.username

        } 

    }).then((data)=>{
        console.log('data' , data);
    }).catch((error)=>{
        console.log('error',error);
    })

    let db2 = firebase.database();
    let ref2 = db2.ref('messages/'+this.state.usernow.username+'/'+this.state.toUser);

    ref2.push({
        text : data.text,
        createdAt : new Date().getTime(),
        user : {
                  id : this.state._id,
                  avatar: '',
                  email :this.state.email,
                  _id : this.state._id,
                  name: this.state.usernow.username

        } 

    }).then((data)=>{
        console.log('data' , data);
    }).catch((error)=>{
        console.log('error',error);
    })
    })
    
     this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
     }))


          

  }

	render() {
      
    var id = this.state._id
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
        _id: id,
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