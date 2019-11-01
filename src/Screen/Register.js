import React, {Component} from 'react'
import {StyleSheet, TextInput, View } from 'react-native'
import firebase from 'firebase';
import {Thumbnail, Container, Button, Text, Header, Content, Form, Item, Input, Label } from 'native-base';

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

class Register extends Component {
  constructor(props){
    super(props);
    this.state = {
      email:'', 
      username:'', 
      phone:'', 
      password:'',
      error:'',
      loading: true
    }
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
                password : this.state.password             
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
              <Input onChangeText={password => this.setState({password: password})}/>
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