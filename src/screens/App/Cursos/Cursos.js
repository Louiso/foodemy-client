import React, { Component } from 'react'
import { View, Image, StyleSheet, ScrollView } from 'react-native'

import Section from '../../../components/Section';
import { getCiclos } from '../../../helpers/ciclos';

export default class Cursos extends Component {
  state = {
    ciclos: []
  }
  renderSections(){
    return this.state.ciclos.map((ciclo)=>{
      return <Section  key = {ciclo._id} ciclo = { ciclo } navigation = { this.props.navigation }/>
    });
  }
  componentDidMount = async () => {
    const resp = await getCiclos();
    if(resp.ok){
      this.setState({
        ciclos: resp.ciclos
      });
    }
  }
  render() {
    return (
      <ScrollView style = {{ flex: 1 }}>
        <View style = { styles.ImageContainer }>
          <Image 
            style = { styles.Image }
            source = {{uri: 'https://ae01.alicdn.com/kf/HTB1xolnIXXXXXbvXpXXq6xXFXXXK/Watamote-Tomoko-Kuroki-Cosplay-Pelo-Negro-Peluca.jpg'}}/>
        </View>
        { this.renderSections() }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  ImageContainer:{
    alignItems: 'center',
    marginTop: 38
  },
  Image: { 
    width: 140,
    height: 140
  }
})