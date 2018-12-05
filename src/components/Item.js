import React, { Component } from 'react'
import { Text, View , StyleSheet, Image } from 'react-native'
import { FONTS } from '../helpers/FONTS';
import { Icon } from 'native-base';
import { BoxShadow } from 'react-native-shadow';
import { getCurso } from '../helpers/cursos';

export default class Item extends Component {
  state = {
    curso: null
  }
  componentDidMount = async () => {
    const { subscripcion } = this.props;
    const cursoResp = await getCurso(subscripcion._idCurso)
    console.log(cursoResp);
  }
  render() {
    const { subscripcion } = this.props;
    const curso = {
      nombre: 'Conceptos I',
      temas: [
        '141431','Metabolismo','1131121','1321321321']
    }
    const rateTema = Math.floor(subscripcion.temaActual / curso.temas.length * 100);
    // 228
    const widthBarra = {
      width: rateTema * 228 / 100
    }
    return (
      <BoxShadow setting = {{
        width:360,
        height:100,
        color:"#000",
        border:2,
        radius:4,
        opacity:0.1,
        x:0,
        y:3,
        style:{marginVertical:4}
      }}>
        <View style = { styles.Item}>
          <Image style = { styles.Item__Image} source = {{
            uri: 'http://as01.epimg.net/epik/imagenes/2018/04/28/portada/1524913221_572475_1524913364_noticia_normal.jpg'
          }}/>
          <View style = { styles.Item__Body}>
            <View style = { styles.Item__Body__Head}>
              <View style = { styles.Item__Body__Head__CursoInfo}>
                <Text style = { styles.Item__Body__Head__CursoInfo__Name}>{curso.nombre}</Text>
                <Text style = { styles.Item__Body__Head__CursoInfo__Tema}>Tema Actual: {curso.temas[subscripcion.temaActual]}</Text>
              </View>
              <View style = { styles.Item__Body__Head__StatLlaves }>
                <Text style = { styles.Item__Body__Head__StatLlaves__LLaves}>{subscripcion.llavesObtenidas}/{subscripcion.llavesTotales}</Text>
                <Icon style = { styles.Item__Body__Head__StatLlaves__Icon} name = "key"/>
              </View>
            </View>
            <View style = { styles.Item__Body__StatTemas}>
              <View>
                <View style = { styles.Item__Body__StatTemas__Barra__Total}></View>
                <View style = { [styles.Item__Body__StatTemas__Barra__Actual, widthBarra]}></View>
                <Text style = { styles.Item__Body__StatTemas__Text}>{rateTema}%</Text>
              </View>
            </View>
          </View>
        </View>
      </BoxShadow>
    )
  }
}


const styles = StyleSheet.create({
  Item:{
    flexDirection: 'row',
    backgroundColor: '#aaaaaa',
    marginBottom: 0
  },
  Item__Image:{
    width: 100,
    height: 100
  },
  Item__Body:{

    justifyContent: 'space-between',
    padding: 16

  },
  Item__Body__Head:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  Item__Body__Head__CursoInfo:{

  },
  Item__Body__Head__CursoInfo__Name:{
    fontFamily: FONTS.hindBold,
    fontSize: 16
  },
  Item__Body__Head__CursoInfo__Tema:{
    fontFamily: FONTS.hindLight,
    fontSize: 12
  },
  Item__Body__Head__StatLlaves:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  Item__Body__Head__StatLlaves__LLaves:{
    color: 'white',
    fontSize: 10,
    marginRight: 4
  },
  Item__Body__Head__StatLlaves__Icon:{
    color: 'white',
    fontSize: 10
  },
  Item__Body__StatTemas:{
    position: 'relative',
  },
  Item__Body__StatTemas__Barra__Total:{
    backgroundColor: '#888888',
    width: 228,
    height: 16,
    borderRadius: 8
  },
  Item__Body__StatTemas__Barra__Actual:{
    position: 'absolute',
    backgroundColor: '#333333',
    width: 72,
    height: 16,
    borderRadius: 8
  },
  Item__Body__StatTemas__Text:{
    position: 'absolute',
    width: 228,
    textAlign: 'center',
    color: 'white',
    lineHeight: 16
  }
})