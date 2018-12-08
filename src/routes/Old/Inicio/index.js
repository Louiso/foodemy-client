import React from 'react';
import { createStackNavigator  } from 'react-navigation'
import { View, TouchableHighlight } from 'react-native'
import { Icon } from 'native-base'
import Tema from '../../../screens/App/Cursos/Tema';
import BottomTabs from './BottomTabs';
import { DrawerActions } from 'react-navigation-drawer';

export default createStackNavigator({
  BottomTabs: {
    screen: BottomTabs,
    navigationOptions: ({ navigation}) =>({
      headerTitle: 'Foodemy',
      headerStyle: {
        backgroundColor: '#36577E'
      },
      headerTitleStyle:{
        color: 'rgba(229, 229, 229, 0.85)'
      },
      headerLeft: () => (
        <TouchableHighlight
          onPress = {() => navigation.dispatch(DrawerActions.openDrawer())}>
          <View style = {{
            width: 60,
            alignItems: 'center'
          }}>
            <Icon  
              name = 'menu'
              style = {{ fontSize: 24, color: 'rgba(229, 229, 229, 0.85)'}}/>
          </View>
        </TouchableHighlight>
      )
    })
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