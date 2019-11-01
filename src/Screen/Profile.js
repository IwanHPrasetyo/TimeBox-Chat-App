import React, {Component} from 'react'
import { Image, StyleSheet } from 'react-native';
import { Container, Header, Right, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';

class Profile extends Component {
	render() {
		return (

			<Container>
        <Header style={style.Header}>
		    <Left>
		    <Button transparent>
              <Icon style={style.Icon} name='arrow-back' onPress={()=> this.props.navigation.goBack(null)} />
            </Button>
            </Left>
            <Body>
                <Text style={style.Text}>Profile</Text>
            </Body>
        </Header>
        <Content>
          <Card style={{flex: 1 }}>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: `https://ui-avatars.com/api/?size=256&name=`+this.props.navigation.getParam('username')+'`'}} />
                <Body>
                  <Text>{this.props.navigation.getParam('username')}</Text>
                  <Text note>{this.props.navigation.getParam('email')}</Text>
                  <Text note>{this.props.navigation.getParam('phone')}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem style={{ justifyContent: 'center'}}>
              <Body>
                <Image source={{uri: `https://ui-avatars.com/api/?size=256&name=`+this.props.navigation.getParam('username')+'`'}} style={{height: 250, width: 300, marginLeft:-10, flex: 1}}/>
              </Body>
            </CardItem>
            <CardItem>
              <Left>

                <Button full info>
                <Icon name="map" />
                  <Text>Info Location</Text>
                </Button>
              </Left>
            </CardItem>
          </Card>
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
  Icon :{
    color: '#686de0'
  },
  Text :{
    color: '#686de0'
  }

})

export default Profile