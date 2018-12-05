import React, { Component } from 'react'
import { Text, View, StyleSheet , Image, TouchableOpacity } from 'react-native'
import { FONTS } from '../helpers/FONTS'
import { Icon } from 'native-base'
import { getCurrentUser } from '../helpers/auth';
import { getSubscripcion, postSubscripcion } from '../helpers/subscription';
import { getUser } from '../helpers/user';

export default class Card extends Component {
  state = {
    lock: true
  }
  comparar = async () => {
    try{
      const { curso } = this.props;
      const _user = await getCurrentUser();
      const { user } = await getUser(_user._id);
      if(user.llaves >= curso.llaves){
        this.setState({
          lock: false
        });
      }
    }catch(e){
      console.log(e);
    }
  }
  componentDidMount = async () => {
    this.timer = setInterval(()=>{
      this.comparar();
    },5000);
    this.comparar();
  }
  componentWillUnmount = async () => {
    clearInterval(this.timer);
  }
  ingresarCurso = async () => {
    try{
      const _user = await getCurrentUser();
      const { user } = await getUser(_user._id);
      const { curso } = this.props;
      
      const _idUser = user._id;
      const _idCurso = curso._id;
      const resp = await getSubscripcion(_idUser,_idCurso);
      if(resp.ok){
        const { subscripcion } = resp;
        this.props.navigation.navigate('Tema',{
          index: subscripcion.temaActual,
          curso: curso
        });
      }else{// No esta suscrito
        if(this.state.lock) throw 'Curso bloqueado'
        const resp = await postSubscripcion(_idUser,_idCurso);
        if( !resp.ok ) throw 'No se pudo subscribir al curso correctamente'
        const { subscripcion } = resp;
        this.props.navigation.navigate('Tema',{
          index: subscripcion.temaActual,
          curso: curso
        });
      }
    }catch(e){
      console.log(e);
    }
    
  }
  render(){
    const { curso } = this.props;
    const colorIcon = { 
      color: this.state.lock? 'red':'green'
    };
    const nameIcon = this.state.lock? 'lock': 'unlock' 
    return (
      <View 
        style = { styles.Tema }
        >
        <TouchableOpacity onPress = { this.ingresarCurso }>
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
