import React, { Component } from "react";
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

export default class MapFriends extends Component {
	
	render() {
		
		return (

		<View style={{ flex: 1 }}>

        <MapView
          style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
          region={{
            latitude: this.props.navigation.getParam('latitude'),
            longitude: this.props.navigation.getParam('longitude'),
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}
        >
          <Marker
            coordinate={{
              latitude: this.props.navigation.getParam('latitude'),
              longitude: this.props.navigation.getParam('longitude')
            }}
            title={"On Location"}
            description={"Friend here"}
          />
        </MapView >

        <View style={{ margin: 20 }}>
           <Header style={style.Header}>
          <Left>
            <Button transparent onPress={()=> this.props.navigation.goBack(null)} >
              <Icon style={style.Icon} name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title style={style.Text}>Location</Title>
          </Body>
        </Header>
        </View>
      </View>

		)
	}
}

const style = StyleSheet.create({
	Header:{
		backgroundColor:'#ffff',
		elevation: 4,
    borderRadius: 40
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