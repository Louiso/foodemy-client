import React, { Component } from 'react'
import { Text, View, StyleSheet , Image, TouchableOpacity } from 'react-native'
import { FONTS } from '../helpers/FONTS'
import { Icon } from 'native-base'
import { getCurrentUser } from '../helpers/auth';

export default class Card extends Component {
  state = {
    lock: true
  }
  componentDidMount = async () => {
    const { curso } = this.props;
    const user = await getCurrentUser();
    if(user.llaves >= curso.llaves){
      this.setState({
        lock: false
      });
    }
  }
  render(){
    const { curso } = this.props;
    console.log(curso);
    const colorIcon = { 
      color: this.state.lock? 'red':'green'
    };
    const nameIcon = this.state.lock? 'lock': 'unlock' 
    return (
      <View 
        style = { styles.Tema }
        >
        <TouchableOpacity onPress = { () => console.log(':v')}>
          <Image
            style = { styles.TemaImage }
            source = {{uri: curso.urlImage}}
          />
          <View style = { styles.TemaFooter}>
            <Text style = { styles.TemaTitle }>{curso.nombre}</Text>
            <Icon 
              name= { nameIcon } 
              style = { [ styles.TemaIcon, colorIcon ]}
              />
          </View>
        </TouchableOpacity>
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
