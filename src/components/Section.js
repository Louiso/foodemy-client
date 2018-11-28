import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'
import { FONTS } from '../helpers/FONTS';
import Card from './Card';

export default class Section extends Component {
  render() {
    const { ciclo } = this.props;
    return (
      <View style = { styles.Section }>
        <Text style = { styles.TitleNivel }>{ciclo.nombre}:</Text>
        <FlatList
          style = { styles.FlatList}
          horizontal = { true}
          showsHorizontalScrollIndicator = { false }
          data = { ciclo.cursos }
          renderItem = {({ item })=>{
            return (<Card curso = { item }/>)
          }}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  Section:{
    marginTop: 38,
  },
  TitleNivel: {
    fontFamily: FONTS.hindSemiBold,
    fontSize: 18,
    marginLeft: 16,
    
  },
  FlatList: {
    marginTop: 28
  }
})
