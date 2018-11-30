import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { logOut } from '../../../helpers/auth';

export default class LogOut extends Component{
  componentDidMount = async () => {
    await logOut();
    this.props.navigation.navigate('Login');
  }
  render(){
    return(
      <View style = {{ flex: 1, justifyContent : 'center', alignItems: 'center'}}>
        <Text>Loading...</Text>
      </View>
    );
  }
}
