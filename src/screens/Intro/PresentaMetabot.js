import React, { Component } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { Constants } from 'expo'
import { FONTS } from '../../helpers/FONTS';
export default class PresentaMetabot extends Component {
  render() {
    return (
      <View style = {{ flex: 1, alignItems: 'center',backgroundColor: 'rgba(95, 169, 169, 1)'}}>
        <View style = {styles.StatusBar}/>
        <View style = {{
          width: 280,
          flex: 1,
          justifyContent: 'space-around'
        }}>
          <Text style = {styles.Pregunta}>Conocer tu cuerpo  y saber como funciona es la clave del EXITO!!</Text>
          <View style = {{
            alignItems: 'center'
          }}>
            <Image style = {{
              width: 125,
              height: 100
            }} 
              source = { require('../../../assets/key.png')}/>
          </View>
          <Text style = {styles.Pregunta}>Consigue mas llaves y desbloquea mas cursos</Text>
          <Text style = { styles.Continuar} onPress = { () => this.props.onPress(this.props.index + 1)}>continuar</Text>
          <Text style = { styles.Login } onPress = { this.props.goToLogin } >Tengo una cuenta</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  StatusBar: {
    height: Constants.statusBarHeight
  },
  Pregunta: {
    textAlign: 'center',
    fontFamily: FONTS.poiretOneRegular,
    fontSize: 24,
  },
  Continuar:{
    textAlign: 'center',
    fontSize: 18,
    fontFamily: FONTS.poiretOneRegular
  },
  Login:{
    textAlign: 'center',
    fontSize: 18,
    fontFamily: FONTS.poiretOneRegular,
    textDecorationLine: 'underline'
  }
})
