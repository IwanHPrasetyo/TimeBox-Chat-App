import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { View } from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import IoniconsIcon from 'react-native-vector-icons/Ionicons'
import FeatherIcon from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import React from 'react'

import Home from './Screen/Home'
import Contact from './Screen/Contact'
import Setting from './Screen/Setting'
import ChatRoom from './Screen/Chat'
import Login from './Screen/Login'
import Register from './Screen/Register'
import Maps from './Screen/Maps'
import Profile from './Screen/Profile'

const TabNavigation = createMaterialBottomTabNavigator(
{
	Home: {
			screen: Home,
			navigationOptions: {
				tabBarLabel: 'Home',
				tabBarIcon: ({ tintColor }) => (
					<View>
						<FeatherIcon style={[{ color: tintColor }]} size={25} name={'home'} />
					</View>
				),
			}
		},
		
	Contact: {
			screen: Contact,
			navigationOptions: {
				tabBarLabel: 'Contact',
				tabBarIcon: ({ tintColor }) => (
					<View>
						<IoniconsIcon style={[{ color: tintColor }]} size={25} name={'md-contacts'} />
					</View>
				),
			}
		},

		Maps: {
			screen: Maps,
			navigationOptions: {
				tabBarLabel: 'Maps',
				tabBarIcon: ({ tintColor }) => (
					<View>
						<FontAwesome5 style={[{ color: tintColor }]} size={25} name={'map-marked-alt'} />
					</View>
				),
			}
		},

		Setting: {
			screen: Setting,
			navigationOptions: {
				tabBarLabel: 'Setting',
				tabBarIcon: ({ tintColor }) => (
					<View>
						<AntDesign style={[{ color: tintColor }]} size={25} name={'setting'} />
					</View>
				),
			}
		},
		
},
{
	    initialRouteName: 'Home',
	    activeColor: '#3e2465',
	    inactiveColor: '#95afc0',
	    elevation: 10,
	    barStyle: { backgroundColor: '#ffff', elevation: 10 },
	  }

)

const Navigation = createStackNavigator({
	Login: {
		screen: Login
	},
	Home : TabNavigation,
	ChatRoom: {
		screen: ChatRoom
	},
	Register: {
		screen: Register
	}
	,
	Profile: {
		screen: Profile
	}
},{
	headerMode :'none',
	initialRouteKey: 'Home',

},

);

export default createAppContainer(Navigation)

