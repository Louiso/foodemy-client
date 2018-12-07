import React from 'react';
import { createStackNavigator  } from 'react-navigation'

import { Icon } from 'native-base'
import Tema from '../../../screens/App/Cursos/Tema';
import BottomTabs from './BottomTabs';

export default createStackNavigator({
  BottomTabs: {
    screen: BottomTabs,
    navigationOptions:{
      headerTitle: 'Foodemy',
      headerStyle: {
        backgroundColor: '#36577E'
      },
      headerTitleStyle:{
        color: 'rgba(229, 229, 229, 0.85)'
      }
    }
  },
  Tema:{
    screen: Tema,
    navigationOptions: ({navigation}) => ({
      headerTitle: 'Tema',
      headerStyle: {
        backgroundColor: '#36577E'
      },
      headerTitleStyle: {
        color: 'rgba(229, 229, 229, 0.85)'
      },
      headerBackImage: () => <Icon  name = 'home' onPress = {() => navigation.navigate('Cursos')} style = {{ fontSize: 24, color: 'rgba(229, 229, 229, 0.85)'}}/>
    })
  }
})