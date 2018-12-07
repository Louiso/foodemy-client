import React, { Component } from 'react'
import { View, Text , StyleSheet, ScrollView } from 'react-native'

import Section from '../../../components/Section';
import { getCiclos } from '../../../helpers/ciclos';
import { getCurrentUser } from '../../../helpers/auth';
import { FONTS } from '../../../helpers/FONTS';

import { Icon } from 'native-base';
import { getUser } from '../../../helpers/user';

export default class Cursos extends Component {
  state = {
    ciclos: [],
    user: null
  }
  renderSections(){
    return this.state.ciclos.map((ciclo)=>{
      return <Section  key = {ciclo._id} ciclo = { ciclo } navigation = { this.props.navigation }/>
    });
  }

  getData = async() => {
    const _user = await getCurrentUser();
    const { user } = await getUser(_user._id)
    const resp = await getCiclos();
    if(resp.ok){
      this.setState({
        ciclos: resp.ciclos,
        user:user
      });
    }
  }
  componentDidMount = async () => {
    this.timer = setInterval(()=>{
      this.getData()
    },5000);
    this.getData()
  }
  componentWillUnmount(){
    clearInterval(this.timer)
  }
  render() {
    return (
      <ScrollView style = {{ flex: 1, backgroundColor: 'rgba(95, 169, 169, 0.85)'}}>
        <View style = { styles.ImageContainer }>
          <Text style = { styles.Llaves }>{ this.state.user?this.state.user.llaves: 0} </Text>
          <Icon style = { styles.Icon } name='key'/>
        </View>
        { this.renderSections() }
        <View style = { {
          height: 24
        }}/>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  ImageContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 38
  },
  Llaves:{
    fontFamily: FONTS.hindBold,
    fontSize: 48
  },
  Icon:{
    fontSize: 48,
    color: 'rgba(198, 198, 56, 1)'
  }

})