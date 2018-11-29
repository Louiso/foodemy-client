import React, { Component } from 'react'
import { ScrollView  } from 'react-native'

import PostForm from '../../../components/Post/PostForm';
import Post from '../../../components/Post/Post';

export default class Social extends Component {
  render() {
    return (
      <ScrollView 
        style = {{
          flex: 1
        }}
        contentContainerStyle={{
          alignItems: 'center'
        }}
      >
        <PostForm/>
        <Post/>
        <Post/>
        <Post/>
      </ScrollView>
    )
  }
}