import React, { Component } from 'react'
import { Text, View, StyleSheet , Image } from 'react-native'
import { FONTS } from '../helpers/FONTS'
import { Icon } from 'native-base'

export default class Card extends Component {
  render() {
    const { curso } = this.props;
    const colorIcon = { 
      color: curso.bloqueado? 'red':'green'
    };
    const nameIcon = curso.bloqueado? 'lock': 'unlock' 
    return (
      <View 
        style = { styles.Tema }
        >
        <Image
          style = { styles.TemaImage }
          source = {{uri: 'http://mouse.latercera.com/wp-content/uploads/2018/08/Cells-900x600.jpg'}}
        />
        <View style = { styles.TemaFooter}>
          <Text style = { styles.TemaTitle }>{curso.nombre}</Text>
          <Icon 
            name= { nameIcon } 
            style = { [ styles.TemaIcon, colorIcon ]}
            />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  Tema:{
    width: 120,
    marginRight: 6,
    marginLeft: 6,
  },
  TemaImage: {
    width: 120,
    height: 88,
    backgroundColor: 'red'
  },
  TemaFooter: {
    height: 32,
    backgroundColor: '#aaaaaaaa',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  TemaTitle: {
    fontSize: 12,
    fontFamily: FONTS.hindSemiBold
  },
  TemaIcon: {
    fontSize: 16
  }
})
