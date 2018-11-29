import React from 'react';
import { createStackNavigator , createMaterialTopTabNavigator } from 'react-navigation'
import Cursos from '../../../screens/App/Cursos/Cursos';
import Muro from '../../../screens/App/Muro/Muro';
import Social from '../../../screens/App/Social/Social';
import { Icon } from 'native-base'
import Tema from '../../../screens/App/Cursos/Tema';
import { Text } from 'react-native'
const BottomTabs = createMaterialTopTabNavigator({
  Muro: {
    screen: Muro,
    navigationOptions: {
      tabBarLabel: 'Muro',
      tabBarIcon: ({tintColor}) => (
        <Icon name = 'bookmarks' color = {tintColor} style = { { fontSize: 24}}/>
      )
    }
  },
  Cursos: {
    screen: Cursos,
    navigationOptions: {
      tabBarLabel: 'Cursos',
      tabBarIcon: ({tintColor}) => (
        <Icon name = 'book' color = {tintColor} style = { { fontSize: 24}}/>
      )
    }
  },
  Social: {
    screen: Social,
    navigationOptions: {
      tabBarLabel: 'Social',
      tabBarIcon: ({tintColor}) => (
        <Icon name = 'contacts' color = {tintColor} style = { { fontSize: 24}}/>
      )
    }
  }
},{
  initialRouteName: 'Cursos',
  tabBarPosition: 'bottom',
  tabBarOptions:{
    activeTintColor: 'orange',
    inactiveTintColor: 'grey',
    style: {
      backgroundColor: '#f2f2f2'
    },
    showIcon: true
  }
})

export default createStackNavigator({
  BottomTabs: {
    screen: BottomTabs,
    navigationOptions:{
      headerTitle: 'Foodemy'
    }
  },
  Tema:{
    screen: Tema,
    navigationOptions: ({navigation}) => ({
      headerTitle: 'Tema',
      headerBackImage: () => <Icon  name = 'home' onPress = {() => navigation.navigate('Cursos')} style = {{ fontSize: 24}}/>
    })
  }
},{
  navigationOptions:{
  }
})