import React, { Component } from 'react'
import { Text, View , Image , StyleSheet , ScrollView } from 'react-native'

import { Icon } from 'native-base'
import { FONTS } from '../../../helpers/FONTS';

export default class Profile extends Component {
  render() {
    return (
      <ScrollView style = {{
        flex: 1
      }}>
        <View style = { styles.Header}>
          <Icon name ="pizza" style = { styles.Header__FirstIcon}/>
          <View style = { styles.Header__Image__Container }>
            <Image
              source = {{
                uri: 'https://img.etimg.com/thumb/msid-59878652,width-643,imgsize-122108,resizemode-4/this-new-app-will-help-you-perfect-the-art-of-taking-a-selfie.jpg'
              }} 
              style = { styles.Header__Image }/>
          </View>
          <Icon name = "pulse" style = { styles.Header__SecondIcon}/>
        </View>
        <View style = { styles.Tabs }>
          <Text style = { styles.Tabs__Tab }>
            1.75 m
          </Text>
          <Text style = { styles.Tabs__Tab }>
            72 kg
          </Text>
          <Text style = { styles.Tabs__Tab}>
            IMC: 24
          </Text>
        </View>
        <View style = { styles.Body }>
          <Text style = { styles.Body__Title }>INFORMACION</Text>
          <View style = { styles.Body__Content}>
            <View>
              <Text style = { styles.Body__Content__Label }>Nombre de Usuario: </Text>
              <Text style = { styles.Body__Content__Input }>Luis Alfredo Sullca Huaracca</Text>
            </View>
            <View>
              <Text style = { styles.Body__Content__Label }>Correo Electronico: </Text>
              <Text style = { styles.Body__Content__Input }>Gransullca.25@gmail.com</Text>
            </View>
            <View>
              <Text style = { styles.Body__Content__Label }>Sexo: </Text>
              <Text style = { styles.Body__Content__Input }>Masculino</Text>
            </View>
            <View>
              <Text style = { styles.Body__Content__Label }>Edad: </Text>
              <Text style = { styles.Body__Content__Input }>23 años</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  Header:{
    backgroundColor: '#36577E',
    height: 232,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  Header__FirstIcon:{
    color: 'rgba(229, 229, 229, 0.85)'
  },
  Header__Image:{
    width: 148,
    height: 148
  },
  Header__Image__Container:{
    overflow: 'hidden',
    borderRadius: 80
  }, 
  Header__SecondIcon:{
    color: 'rgba(229, 229, 229, 0.85)'
  },
  Tabs:{
    backgroundColor: '#36577E',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#313E83',
    flexDirection: 'row',
    alignItems: 'center'
  },
  Tabs__Tab:{
    color: 'rgba(229, 229, 229, 0.85)',
    flex: 1,
    height: 60,
    lineHeight: 60,
    textAlign: 'center',
    fontFamily: FONTS.hindSemiBold,
  },
  Tabs__Tab__Active: {
    backgroundColor: '#313E83'
  },
  Body: {
    marginBottom: 24
  },
  Body__Title:{
    fontFamily: FONTS.hindBold,
    fontSize: 24,
    textAlign: 'center',
    paddingVertical: 20,
  },
  Body__Content:{
    paddingLeft: 32
  },
  Body__Content__Label:{
    fontFamily: FONTS.hindSemiBold,
    fontSize: 18
  },
  Body__Content__Input:{
    fontFamily: FONTS.hindRegular,
    fontSize: 16
  }

})