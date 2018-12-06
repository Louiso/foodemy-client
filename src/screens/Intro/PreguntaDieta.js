import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Constants } from 'expo'
import { FONTS } from '../../helpers/FONTS';
export default class PreguntaDieta extends Component {
  render() {
    return (
      <View style = {{ flex: 1, alignItems: 'center',backgroundColor: 'white'}}>
        <View style = {styles.StatusBar}/>
        <View style = {{
          width: 280,
          flex: 1,
          justifyContent: 'space-around'
        }}>
          <Text style = {styles.Pregunta}>¿Haces dieta y no bajas de peso?</Text>
          
          <View style = {styles.Opciones}>

            <Text style = { styles.Opcion }>Si</Text>
            <Text style = { styles.Opcion }>No</Text>

          </View>

          <Text style = { styles.Continuar} onPress = { () => this.props.onPress(this.props.index + 1) }>continuar</Text>
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
  Opciones:{
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  Opcion:{
    fontSize: 18,
    fontFamily: FONTS.poiretOneRegular
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
