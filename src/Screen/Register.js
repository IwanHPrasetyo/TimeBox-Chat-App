import React, {Component} from 'react'
import {StyleSheet, TextInput, View } from 'react-native'
import firebase from 'firebase';
import {Thumbnail, Container, Button, Text, Header, Content, Form, Item, Input, Label } from 'native-base';
import Geolocation from '@react-native-community/geolocation';

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

class Register extends Component {
  constructor(props){
    super(props);
    this.state = {
      email:'', 
      username:'', 
      phone:'', 
      password:'',
      error:'',
      loading: true,
      latitude: 0,
      longitude: 0,
      region: 0,
      initialPosition: 'unknown',
      lastPosition: 'unknown',
    }
  }

  watchID: ?number = null;

  componentDidMount() {
    this.getLocation()
  }

  async getLocation() {
    await Geolocation.getCurrentPosition(
      position => {
        const initialPosition = JSON.stringify(position);
        this.setState({ initialPosition });
        console.log(position)
      },
      error => { },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    this.watchID = Geolocation.watchPosition(position => {
      const lastPosition = JSON.stringify(position);
     
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        lastPosition
      });
    });
  }

  componentWillUnmount() {
    this.watchID != null && Geolocation.clearWatch(this.watchID);
  }

  onSignUpPress(){

       this.setState({error:'', loading:true});
        
        const{email, password} = this.state;
        console.log(email, password)
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            this.setState({error:'', loading:false}); 

            let db = firebase.database();
            let ref = db.ref('user');

            ref.push({
                username : this.state.username,
                email : this.state.email,
                phone : this.state.phone,
                password : this.state.password,
                latitude: this.state.latitude,
                longitude: this.state.longitude,                    
            
            }).then((data)=>{
                console.log('data' , data);
            }).catch((error)=>{
                console.log('error',error);
            })

            this.props.navigation.navigate('Login');
            console.log('Register Success')
        })
        .catch((err) => {
            this.setState({error:'Authentication Failed', loading:false});
            console.log(err)
        })
 
    }

  render() {

		return (
	<Container>

        <View style={style.view}>
        <Thumbnail square style={{height: 150, width: 150}} source={{uri: 'https://image.flaticon.com/icons/png/512/1006/1006038.png'}} />
        </View>

        <Content style={style.Content}>
        
          <Form>
             <Item floatingLabel>
              <Label>Email</Label>
              <Input onChangeText={email => this.setState({email: email})}/>
            </Item>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input onChangeText={username => this.setState({username})}/>
            </Item>
            <Item floatingLabel>
              <Label>Phone number</Label>
              <Input onChangeText={phone => this.setState({phone})}/>
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input secureTextEntry = {true} onChangeText={password => this.setState({password: password})}/>
            </Item>
              <Button style={style.ButtonLogin} full info onPress={this.onSignUpPress.bind(this)} >
            	<Text>Register</Text>
          	</Button>
          	<Button style={style.ButtonRegister} full bordered info onPress={()=> this.props.navigation.goBack()}>
            	<Text>Cancel</Text>
          	</Button>
          </Form>
        </Content>
      </Container>
		)
	}
}
const style = StyleSheet.create({
	Content :{
		padding: 20
	},
	ButtonLogin :{
		marginTop:40,
		borderRadius:20,
		margin: 20,

	},
  view :{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
	ButtonRegister :{
		marginTop:1,
		borderRadius:20,
		margin: 20

	}

})

export default Register
