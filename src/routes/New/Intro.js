import React, { Component } from 'react'
import { View , ScrollView, Dimensions } from 'react-native'
import PreguntaDieta from '../../screens/Intro/PreguntaDieta';
import PreguntaEsfuerzo from '../../screens/Intro/PreguntaEsfuerzo';
import PresentaMetabot from '../../screens/Intro/PresentaMetabot';
import FormData from '../../screens/Intro/FormData';
const { width } = Dimensions.get('window')
export default class Intro extends Component {
  handlePress = (index) => {
    const x = width * index;
    this.scroller.scrollTo({x: x, y: 0});
  }
  goToLogin = (data = {}) => {
    this.props.navigation.navigate('Login');
  }
  goToRegister = (data = {}) => {
    this.props.navigation.navigate('Register',{
      data: data
    });
  }
  render() {
    return (
      <ScrollView ref = {(scroller) => this.scroller = scroller } style = {{ flex: 1 }} horizontal = { true } pagingEnabled = { true }>
        <View style = {{ flex: 1, width : width}}>
          <PreguntaDieta 
            onPress = { this.handlePress } 
            index = {0}
            goToLogin = { this.goToLogin }
            />
        </View>
        <View style = {{ flex: 1, width : width}}>
          <PreguntaEsfuerzo 
            onPress = { this.handlePress } 
            index = {1}
            goToLogin = { this.goToLogin }
            />
        </View>
        <View style = {{ flex: 1, width : width}}>
          <PresentaMetabot 
            onPress = { this.handlePress } 
            index = {2}
            goToLogin = { this.goToLogin }
            />
        </View>
        <View style = {{ flex: 1, width : width}}>
          <FormData
            goToLogin = { this.goToLogin }
            goToRegister = { this.goToRegister }
          />
        </View>
      </ScrollView>
    )
  }
}