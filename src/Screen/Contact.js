import React, {Component} from 'react'
import { Container, Header, Icon, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import {StyleSheet} from 'react-native'
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

class Contact extends Component {

  constructor(props){
    super(props);
    this.state = {
      users :[],
      email:'',
      contact:[], 
      username:'', 
      phone:'',
      whoim:'', 
      password:'',
      error:'',
      loading: true
    }
  }

  componentDidMount(){

    this.setState({
       whoim : firebase.auth().currentUser.email
    })

    this.writeUserData(this);

  }

  writeUserData(){

    var recentPostsRef = firebase.database().ref('/user');
    recentPostsRef.once('value').then(data => {
    this.setState({ users: data.val() })

    {Object.keys(this.state.users).map(key =>{
    
     if(this.state.users[key].email != this.state.whoim){
        this.setState({contact :[...this.state.contact, this.state.users[key]]})
     }

     })}   
    
    }) 

}


	render() {   
    console.log(this.state.contact)
		return (
		<Container>
        <Header style={style.Header}>
		    <Left>
		    <Button transparent>
              <Icon style={style.Icon} name='arrow-back' onPress={()=> this.props.navigation.goBack(null)} />
            </Button>
            </Left>
            <Body>
                <Text style={style.Text}>Contact</Text>
            </Body>
            <Right>
                <Button transparent onPress={()=> this.props.navigation.goBack(null)}>
                  <Icon type='Feather' style={style.Icon} name='user-plus' />
                </Button>
            </Right>
        </Header>
        <Content>
          {this.state.contact.map(data =>{
    
            return(
            <List>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={{ uri: `https://ui-avatars.com/api/?size=256&name=`+data.username+'`' }} />
              </Left>
              <Body>
                <Text onPress={()=> this.props.navigation.navigate('Profile',{username: data.username, email : data.email, phone : data.phone })} >{data.username}</Text>
                <Text note numberOfLines={1}>{data.email}</Text>
              </Body>
              <Right>
                  <Icon onPress={()=> this.props.navigation.navigate('Maps')} type='Feather' style={style.Icon} name='map-pin' />
                  <Icon type='Feather' style={style.Icon} name='message-circle' />
              </Right>
            </ListItem>
          </List>            
            )
          })}          
        
        </Content>
      </Container>
		)
	}
}

const style = StyleSheet.create({
	Header:{
		backgroundColor:'#ffff',
		elevation: 2
	},
	Content:{
		flex : 1,
		backgroundColor :'#fff',
		padding : 5
	},
	Card:{
		borderBottomRightRadius: 20,
		borderTopLeftRadius: 20,
		elevation: 0
	},
	CardItem:{
		borderBottomRightRadius:20,
		borderTopLeftRadius:20
	},
	 Text:{
  	color: '#686de0'
  },
  Icon :{
    color: '#686de0'
  }

})

export default Contact