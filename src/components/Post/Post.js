import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, ImageBackground } from 'react-native'

import { Icon } from 'native-base'
import { FONTS } from '../../helpers/FONTS';

export default class Post extends Component {
  renderComentarios(comentarios){
    return comentarios.map((comentario, index)=>{
      return (
        <View key = { index } style = { styles.Comentario }>
          <Image
            style = { styles.Comentario__Image } 
            source = {{uri: comentario.userImage}}/>
          <View style = { styles.Comentario__Info }>
            <Text style = { styles.Comentario__Info__Text }><Text style = { styles.Comentario__Info__User }>{comentario.user}</Text> {comentario.text}</Text>
            <View style = { styles.Comentario__Actions }>
              <Text style = { styles.Comentario__Action }>Me gusta</Text>
              <Text style = { styles.Comentario__Action }>Responder</Text>
            </View>
          </View>
        </View>
      )
    });
  }
  render() {

    const bordeExtra = {
      borderLeftWidth: 1,
      borderLeftColor: 'black'
    }
    const post = {
      user: 'Anthony Miranda Gil',
      userImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cda2013ee2d5a439f788776a4e6cf644&auto=format&fit=crop&w=500&q=80',
      tipo: 'nueva receta',
      fecha: 'Fecha 22 de noviembre de 2018',
      postImage: 'https://images.unsplash.com/photo-1506780685701-ba404b9e640d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4205d2feba753aae705a89c3957e40ad&auto=format&fit=crop&w=750&q=80',
      puntaje: 4.5,
      meGusta: false,
      comentarios: [
        {
          user: 'Luis Alfredo Sullca',
          userImage: 'https://scontent-scl1-1.xx.fbcdn.net/v/t1.0-9/42714054_2250306491914224_7781925173447360512_n.jpg?_nc_cat=107&_nc_ht=scontent-scl1-1.xx&oh=6ae54759d43a29100a4b80e7b96b1c81&oe=5CA8076F',
          text: 'Que rico, me apetece probarlo'
        },
        {
          user: 'Gerson Villugas',
          userImage: 'https://scontent-scl1-1.xx.fbcdn.net/v/t1.0-9/44132189_1980981361960060_5999975510426255360_n.jpg?_nc_cat=107&_nc_ht=scontent-scl1-1.xx&oh=b95731af3d8d6b0a1a8efee3c73e8754&oe=5C64728B',
          text: 'Agggg, eso ni se lo daria a mi perro'
        }
      ]
    }
    const colorMegusta = {
      color: post.meGusta? 'blue': 'white'
    }
    return (
      <View style = { styles.Post }>
        <View style = { styles.Post__Header }>
          <View style = { styles.Post__Header__Image__Container}>
            <Image style = { styles.Post__Header__Image } source = {{ uri: post.userImage}}/>
          </View>
          <View style = { styles.Post__Header__Info}>
            <Text style = { styles.Post__Header__Info__Text }>
              <Text style = { styles.Post_Header__Info__Text__User}>{post.user}</Text> publico una <Text style = { styles.Post_Header__Info__Text__Type}>{post.tipo}</Text>
            </Text>
            <Text style = { styles.Post__Header__Info__Date}>{post.fecha}</Text>
          </View>
        </View>
        <View style = { styles.Post__Body__Image__Container}>
          <ImageBackground style = { styles.Post__Body__Image} source = {{ uri:  post.postImage }}>
            <View style = { styles.Post__Body__Image__Puntaje}>
              <Text style = { styles.Post__Body__Image__Puntaje__Text}>{post.puntaje}</Text>
              <Icon style= { styles.Post__Body__Image__Puntaje__Icon} name="star"/>
            </View>
          </ImageBackground>
        </View>
        <View style = { styles.Post__Footer}>
          <View style = { styles.Post__Footer__Action}>
            <Text style = { [styles.Post__Footer__Action__Text, colorMegusta] }>Me gusta</Text>
            <Icon style = { [styles.Post__Footer__Action__Icon, colorMegusta] } name = "thumbs-up"/>
          </View>
          <View style = { [ styles.Post__Footer__Action, bordeExtra]}>
            <Text style = { styles.Post__Footer__Action__Text }>Comentar</Text>
            <Icon style = { styles.Post__Footer__Action__Icon } type="FontAwesome" name = "comment"/>
          </View>
        </View>




        <View style = { styles.Comentarios }>
        
          <Text style = { styles.Comentarios__VerMas }>Ver comentarios anteriores</Text>
          
          { this.renderComentarios(post.comentarios) }
        </View>


      </View>
    )
  }
}

const styles = StyleSheet.create({
  Post:{
    width: 360,
    marginTop: 2,
  },
  Post__Header:{
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#444444',
  },
  Post__Header__Image__Container:{

  },
  Post__Header__Image:{
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16
  },
  Post__Header__Info:{

  },
  Post__Header__Info__Text:{
    width: 272,
    fontSize: 12,
    fontFamily: FONTS.hindLight
  },
  Post_Header__Info__Text__User:{
    fontFamily: FONTS.hindSemiBold,
    color: 'pink'
  },
  Post_Header__Info__Text__Type:{
    fontFamily: FONTS.hindSemiBold,
    color: 'blue'
  },
  Post__Header__Info__Date:{
    fontFamily: FONTS.hindLight,
    fontSize: 10
  },
  Post__Body__Image__Container:{

  },
  Post__Body__Image:{
    height: 300,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  Post__Body__Image__Puntaje:{
    flexDirection: 'row',
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
  },
  Post__Body__Image__Puntaje__Text:{
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    marginRight: 2
  },
  Post__Body__Image__Puntaje__Icon:{
    color: 'white',
    fontSize: 10
  },
  Post__Footer:{
    height: 44,
    flexDirection: 'row'
  },
  Post__Footer__Action:{
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#444444',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  Post__Footer__Action__Text:{
    color: 'white',
    fontFamily: FONTS.hindBold,
    marginRight: 10,
    fontSize: 13,
  },
  Post__Footer__Action__Icon:{
    color: 'white',
    fontSize: 18,
  },
  Comentarios:{
    paddingLeft: 12,
    paddingTop: 12,
  },
  Comentarios__VerMas:{
    fontSize: 12,
    fontFamily: FONTS.hindRegular,
    color: 'blue',

  },
  Comentario:{
    flexDirection: 'row',
    marginTop: 2,
    alignItems: 'flex-start',
    paddingTop: 12,
    paddingBottom: 12,
    // borderBottomColor: '#aaaaaa',
    // borderBottomWidth: 1,
  },
  Comentario__Image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginTop: 6,
  },
  Comentario__Info:{
    width: 272,
    marginLeft: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#aaaaaa',
    borderRadius: 15
  },
  Comentario__Info__User:{
    fontFamily: FONTS.hindSemiBold,
    color: 'pink'
  },
  Comentario__Info__Text:{
    paddingTop: 7,
    fontFamily: FONTS.hindRegular,
    lineHeight: 16,
    fontSize: 14,
  },
  
  Comentario__Actions: {
    flexDirection: 'row',
    width: 120,
    justifyContent: 'space-between'
  },
  Comentario__Action:{
    fontSize: 12,
    fontFamily: FONTS.hindRegular,
    color: 'blue'
  },

})