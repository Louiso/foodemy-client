import React, { Component } from 'react'
import { Text, View , StyleSheet , ScrollView } from 'react-native'
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
    return (
      <ScrollView style = { styles.Muro }>
        { this.renderItems() }
      </ScrollView>
    )
  }
}


const styles = StyleSheet.create({
  Muro: {
    flex: 1,
    paddingTop: 24
  }
})