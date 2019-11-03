import React, {Component} from 'react'
import {StyleSheet, View, TextInput} from 'react-native'
import firebase from 'firebase'
import {Thumbnail, H2, Container, Button, Text, Header, Content, Form, Item, Input, Label } from 'native-base';
import IoniconsIcon from 'react-native-vector-icons/Ionicons'

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

export default class Login extends Component {
constructor(props){
	super(props)
	this.state={
		email:'',
		password:'',
		error:'Login In'
	}
}

onLoginPress(){
        this.setState({error:'', loading:true});
        
        const{email, password} = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            alert(
              'Login successfully'
            );
            this.setState({error:'', loading:false});
            this.props.navigation.navigate('Home');
            console.log('Login Success')
            

        })
        .catch(() => {
            alert(
              'Login fail'
            );
            this.setState({error:'Authentication Failed', loading:false});
            console.log(this.state.error)
        })
 
    }	

	render() {
		return (
	<Container>
        <Content style={style.Content}>

        <View style={style.view}>
        <Thumbnail square style={{height: 180, width: 300}} source={{uri: 'https://www.helpscout.com/images/resources/talking-to-customers/ch-1.png'}} />
        </View>
          <Form>
             <Item floatingLabel>
              <Label>Email</Label>
              <Input onChangeText={email => this.setState({email})}/>
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input secureTextEntry = {true} onChangeText={password => this.setState({password})} />
            </Item>
              <Button style={style.ButtonLogin} full info onPress={this.onLoginPress.bind(this)} >
            	<Text>Login</Text>
          	</Button>
          	<Button style={style.ButtonRegister} full bordered info onPress={()=> this.props.navigation.navigate('Register')}>
            	<Text>Register</Text>
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
  view :{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
	ButtonLogin :{
		marginTop:40,
		borderRadius:20,
		margin: 20,

	},
	ButtonRegister :{
		marginTop:1,
		borderRadius:20,
		margin: 20,

	}

})
