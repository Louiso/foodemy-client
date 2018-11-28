import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TextInput } from 'react-native'

export default class PostForm extends Component {
  render() {
    return (
      <View style = { styles.NewPost}>
        <View style = { styles.NewPost__Image__Container}>
          <Image style = { styles.NewPost__Image}  source = {{ uri: 'https://images.unsplash.com/photo-1535930749574-1399327ce78f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1f8a140ac20927deb386d1c9187433d6&auto=format&fit=crop&w=376&q=80' }}/>
        </View>
        <View style = { styles.NewPost__Input }>
          <TextInput style = { styles.NewPost__TextInput} placeholder = {'Escribe algo ...'} placeholderTextColor = '#c4c4c4'/>
          <View style = { styles.NewPost__TextInput__Line }/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  NewPost:{
    width: 360,
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    backgroundColor: '#444444'
  },
  NewPost__Image__Container:{

  },
  NewPost__Image:{
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 16,
    marginRight: 16
  },
  NewPost__Input:{
    width: 252
  },
  NewPost__TextInput:{

  },
  NewPost__TextInput__Line:{
    borderWidth: 1,
    borderColor: '#eeeeee'
  },
})