import React, {Component} from 'react'
import { Container, Header, Content, Title, Button, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';
import { StyleSheet,FlatList,TouchableNativeFeedback, TouchableOpacity} from 'react-native';
export default class Setting extends Component {
	render() {
		return (
			<Container>
        <Header style={style.Header}>
         <Left>
            <Button transparent>
              <Icon style={style.Icon} name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title style={style.Title}>Setting</Title>
          </Body>
        </Header>
        <Content>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#12CBC4" }}>
                <Icon type='FontAwesome' active name="user"/>
              </Button>
            </Left>
            <Body>
              <Text>Profile</Text>
            </Body>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#00a8ff" }}>
                <Icon type='Entypo' active name="notification"/>
              </Button>
            </Left>
            <Body>
              <Text>Notification</Text>
            </Body>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#fbc531" }}>
                <Icon type='AntDesign' active name="exclamation" />
              </Button>
            </Left>
            <Body>
              <Text>About</Text>
            </Body>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#e84118" }}>
                <Icon active name="close" />
              </Button>
            </Left>
            <Body>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Login')}>
              <Text>Logout</Text>
             </TouchableOpacity>
            </Body>
          </ListItem>
        </Content>
      </Container>
			);
	}
}
const style = StyleSheet.create({
	Header:{
    backgroundColor: '#ffff' 
  },
  Icon :{
    color: '#686de0'
  },
  Title :{
    color: '#686de0'
  },
})