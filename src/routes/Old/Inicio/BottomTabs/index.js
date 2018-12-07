import React from 'react'
import { createMaterialTopTabNavigator } from 'react-navigation';
import Cursos from '../../../../screens/App/Cursos/Cursos';
import Muro from '../../../../screens/App/Muro/Muro';
import Social from '../../../../screens/App/Social/Social';
import { Icon } from 'native-base'

export default createMaterialTopTabNavigator({
  Muro: {
    screen: Muro,
    navigationOptions: {
      tabBarLabel: 'Muro',
      tabBarIcon: ({tintColor}) => (
        <Icon name = 'bookmarks' style = { { fontSize: 24, color: tintColor}}/>
      )
    }
  },
  Cursos: {
    screen: Cursos,
    navigationOptions: {
      tabBarLabel: 'Cursos',
      tabBarIcon: ({tintColor}) => (
        <Icon name = 'book' style = { { fontSize: 24, color: tintColor}}/>
      )
    }
  },
  Social: {
    screen: Social,
    navigationOptions: {
      tabBarLabel: 'Social',
      tabBarIcon: ({tintColor}) => (
        <Icon name = 'contacts' style = { { fontSize: 24, color : tintColor}}/>
      )
    }
  }
},{
  initialRouteName: 'Cursos',
  tabBarPosition: 'bottom',
  tabBarOptions:{
    activeTintColor: 'orange',
    inactiveTintColor: 'rgba(229, 229, 229, 0.85)',
    style: {
      backgroundColor: '#36577E'
    },
    showIcon: true
  }
})
