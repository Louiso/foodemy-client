import React, { Component } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { Constants } from 'expo'
import { FONTS } from '../../helpers/FONTS';
export default class PresentaMetabot extends Component {
  render() {
    return (
      <View style = {{ flex: 1, alignItems: 'center'}}>
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
              width: 140,
              height: 140
            }} 
              source = { { uri: 'https://i2.wp.com/www.unotaku.net/wp-content/uploads/2017/08/Watamote-8.gif?resize=631%2C352'}}/>
          </View>
          <Text style = {styles.Pregunta}>Te presento a MetaBot, tu compañero en el metabolismo</Text>
          <Text style = { styles.Continuar}>continuar</Text>
          <Text style = { styles.Login }>Tengo una cuenta</Text>
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
