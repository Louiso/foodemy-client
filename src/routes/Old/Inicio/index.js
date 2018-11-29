import React from 'react';
import { createStackNavigator , createMaterialTopTabNavigator } from 'react-navigation'
import Cursos from '../../../screens/App/Cursos/Cursos';
import Muro from '../../../screens/App/Muro/Muro';
import Social from '../../../screens/App/Social/Social';
import { Icon } from 'native-base'

export default createStackNavigator({
  BottomTabs: {
    screen: createMaterialTopTabNavigator({
      Muro: {
        screen: Muro,
        navigationOptions: {
          tabBarLabel: 'Muro',
          tabBarIcon: ({tintColor}) => (
            <Icon name = 'menu' color = {tintColor} style = { { fontSize: 24}}/>
          )
        }
      },
      Cursos: Cursos,
      Social: Social 
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
    }),
    navigationOptions:{
      headerTitle: 'Foodemy'
    }
  }
})