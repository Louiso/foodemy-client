import React, { Component } from 'react'
import { View, Text , StyleSheet, ScrollView } from 'react-native'

import Section from '../../../components/Section';
import { getCiclos } from '../../../helpers/ciclos';
import { getCurrentUser } from '../../../helpers/auth';
import { FONTS } from '../../../helpers/FONTS';

import { Icon } from 'native-base';

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
  componentDidMount = async () => {
    const user = await getCurrentUser();
    const resp = await getCiclos();
    if(resp.ok){
      this.setState({
        ciclos: resp.ciclos,
        user:user
      });
    }
  }
  render() {
    return (
      <ScrollView style = {{ flex: 1 }}>
        <View style = { styles.ImageContainer }>
          <Text style = { styles.Llaves }>{ this.state.user?this.state.user.llaves: 0} </Text>
          <Icon style = { styles.Icon } name='key'/>
        </View>
        { this.renderSections() }
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
    fontSize: 48
  }

})