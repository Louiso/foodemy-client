import React, { Component } from 'react'
import { Text } from 'react-native'
import { createDrawerNavigator } from 'react-navigation'
import { logOut } from '../../helpers/auth';
import Inicio from './Inicio';

class LogOut extends Component{
  componentDidMount = async () => {
    await logOut();
    this.props.navigation.navigate('Login');
  }
  render(){
    return(
      <Text>Loading...</Text>
    );
  }
}

export default createDrawerNavigator({
  Inicio: Inicio,
  LogOut: LogOut
});
