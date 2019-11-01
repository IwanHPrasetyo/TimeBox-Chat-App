import React, { Component } from "react";
import { StyleSheet, Text, View, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

export default class Maps extends Component {
	constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      region: 0,
      initialPosition: 'unknown',
      lastPosition: 'unknown',
    };
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

	render() {
		
		return (

		<View style={{ flex: 1 }}>

        <MapView
          style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}
        >
          <Marker
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude
            }}
            title={"On Location"}
            description={"You here"}
          />
        </MapView >
      </View>

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