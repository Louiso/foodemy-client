import React from 'react';
import { createStackNavigator  } from 'react-navigation'

import { Icon } from 'native-base'
import Tema from '../../../screens/App/Cursos/Tema';
import BottomTabs from './BottomTabs';

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
})