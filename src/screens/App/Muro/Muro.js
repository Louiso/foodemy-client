import React, { Component } from 'react'
import { Text, View , StyleSheet } from 'react-native'
import Item from '../../../components/Item';
import { getCurrentUser } from '../../../helpers/auth';
import { getSubscripcions } from '../../../helpers/subscription';

export default class Muro extends Component {
  state = {
    subscripcions : []
  }
  getData = async (_idUser) => {
    const resp = await getSubscripcions(_idUser);
    this.setState({
      subscripcions: resp.subscripcions
    })
  }
  componentDidMount = async () => {
    const user = await getCurrentUser();
    this.getData(user._id)
    this.timer = setInterval( async () => {
      await this.getData(user._id)
    }, 5000)
    
  }
  componentWillUnmount = () => {
    clearInterval(this.timer)
  }
  renderItems(){
    return this.state.subscripcions.map((subscripcion)=>{
      return(
        <Item key = { subscripcion._id } subscripcion = {subscripcion}/>
      )
    })
  }
  render() {

    /* Obtener las subscripciones obtenidos por el usuario
      me retornara un array, obtendria el _idCurso de cada curso, ademas del indice ... esta data es necesaria
      para poder enviar a Tema ... cuando se realize un click sobre ellos
    */

    const subscripcion = {
      _idUser: '12434',
      _idCurso: '113431',
      temaActual: 1,
      date: 'Sera',
      llavesObtenidas: 6,
      llavesTotales: 20
    }
    return (
      <View style = { styles.Muro }>
        { this.renderItems() }
      </View>
    )
  }
}


const styles = StyleSheet.create({
  Muro: {
    flex: 1,
    justifyContent : 'center'
  }
})