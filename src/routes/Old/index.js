import React from 'react';
import { View, ScrollView , SafeAreaView, Text } from 'react-native';
import { createDrawerNavigator, DrawerItems } from 'react-navigation'

import Inicio from './Inicio';
import LogOut from './LogOut';
import { FONTS } from '../../helpers/FONTS';

export default createDrawerNavigator({
  Inicio: Inicio,
  LogOut: LogOut
},{
  contentComponent: (props) => (
    <SafeAreaView 
      style = {{
      flex: 1,
      backgroundColor: '#36577E'
    }}>
      <View style = {{ height: 150, justifyContent: 'center'}}>
        <Text
          style = {{
            textAlign: 'center',
            fontFamily: FONTS.hindBold,
            fontSize: 36,
            color: 'rgba(229, 229, 229, 0.85)'
          }}>Foodemy</Text>
      </View>
      <ScrollView>
        <DrawerItems {...props}/>
      </ScrollView>
    </SafeAreaView>
  ),
  contentOptions:{
    activeTintColor: 'orange',
    inactiveTintColor: 'rgba(229, 229, 229, 0.85)'
  }
});
