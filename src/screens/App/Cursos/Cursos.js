import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, ScrollView } from 'react-native'
import { Header } from 'native-base'
import { Constants } from 'expo'

import Section from '../../../components/Section';

const Ciclos = [
  {
    key: '1',
    nombre: 'Basico',
    cursos: [
      {
        key: '1',
        nombre: 'Conceptos',
        bloqueado: false,
        temas:[
          {
            key: '1',
            nombre: 'Metabolismo'
          },
          {
            key: '2',
            nombre: 'Curiosidades'
          }
        ]
      },
      {
        key: '2',
        nombre: 'Consideraciones',
        bloqueado: true,
        temas:[
          {
            key: '1',
            nombre: 'Metabolismo'
          },
          {
            key: '2',
            nombre: 'Curiosidades'
          }
        ]
      }
    ]
  },
  {
    key: '2',
    nombre: 'Intermedio',
    cursos: [
      {
        key: '1',
        nombre: 'Conceptos',
        bloqueado: true,
        temas:[
          {
            key: '1',
            nombre: 'Metabolismo'
          },
          {
            key: '2',
            nombre: 'Curiosidades'
          }
        ]
      }
    ]
  }

]

export default class Cursos extends Component {
  renderSections(){
    return Ciclos.map((ciclo)=>{
      return <Section  key = {ciclo.key} ciclo = { ciclo }/>
    });
  }
  render() {
    return (
      <View style = {{ flex: 1}}>
        <View style ={{ height: Constants.statusBarHeight }}/>
        <Header>
        </Header>
        <ScrollView style = {{ flex: 1 }}>
          <View style = { styles.ImageContainer }>
            <Image 
              style = { styles.Image }
              source = {{uri: 'https://ae01.alicdn.com/kf/HTB1xolnIXXXXXbvXpXXq6xXFXXXK/Watamote-Tomoko-Kuroki-Cosplay-Pelo-Negro-Peluca.jpg'}}/>
          </View>
          { this.renderSections() }
        </ScrollView>
        
      </View>
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