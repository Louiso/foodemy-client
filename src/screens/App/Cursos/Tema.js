import React, { Component } from 'react'
import { Text, View,  StyleSheet , Image , ScrollView} from 'react-native'
import { Header, Icon } from 'native-base'
import { Constants } from 'expo'
import { FONTS } from '../../../helpers/FONTS';
export default class Tema extends Component {
  render() {
    return (
      <View style = {{ flex: 1}}>
        <View style ={{ height: Constants.statusBarHeight }}/>
        <Header>
        </Header>
        <ScrollView 
          style = {{
            flex: 1
          }}
          contentContainerStyle={{
            alignItems: 'center'
          }}
        >
          <Text style = { styles.TitleTema }>Metabolismo</Text>
          <Text style = { styles.Parrafo }>Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. </Text>
          <View
            style = { styles.ImageContainer }
            >
            <Image 
              style = { styles.Image }
              source = {{ uri: 'https://banner2.kisspng.com/20180603/xrf/kisspng-pepsin-molecule-enzyme-protein-digestion-5b1444f1a05f05.6198800115280550256569.jpg'}}
              />
          </View>
          <Text style = { styles.Parrafo }>No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.</Text>
          <View style = { styles.SeccionPregunta}>
            <View style = { styles.SeccionPregunta__Header}>
              <Text style = { styles.SeccionPregunta__Header__Title}>DESBLOQUEA LOS SIGUIENTES CURSOS:</Text>
              <View style = { styles.SeccionPregunta__Header__Line}/>
            </View>
            <Text style = { styles.SeccionPregunta__Pregunta}>¿Que es el metabolismo?</Text>
            <View style = { styles.SeccionPregunta__Option}>
              <View style = { styles.SeccionPregunta__Option__Circle}/>
              <Text style = { styles.SeccionPregunta__Option__Text}>Es un hecho establecido hace demasiado tiempo que un lector</Text>
            </View>
            <View style = { styles.SeccionPregunta__Option}>
              <View style = { styles.SeccionPregunta__Option__Circle}/>
              <Text style = { styles.SeccionPregunta__Option__Text}>Es un hecho establecido hace demasiado tiempo que un lector</Text>
            </View>
            <View style = { styles.SeccionPregunta__Option}>
              <View style = { styles.SeccionPregunta__Option__Circle}/>
              <Text style = { styles.SeccionPregunta__Option__Text}>Es un hecho establecido hace demasiado tiempo que un lector</Text>
            </View>
            <View style = { styles.SeccionPregunta__Option}>
              <View style = { styles.SeccionPregunta__Option__Circle}/>
              <Text style = { styles.SeccionPregunta__Option__Text}>Es un hecho establecido hace demasiado tiempo que un lector</Text>
            </View>
          </View>
          <View style = { styles.Controls }>
            <View style = { styles.Control}>
              <Icon style = { styles.Control__Icon} name = 'chevron-left' type = 'FontAwesome'/>
              <Text style = { styles.Control__Text} >anterior</Text>
            </View>
            <View style = { styles.Control }>
              <Text style = { styles.Control__Text}>Alimentacion</Text>
              <Icon style = { styles.Control__Icon } name = 'chevron-right' type = 'FontAwesome'/>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  TitleTema: {
    marginTop: 28,
    fontSize: 24,
    textAlign: 'center',
    fontFamily: FONTS.hindBold
  },
  Parrafo: {
    width: 300,
    marginTop: 28,
    lineHeight: 21,
    textAlign: 'center',
    fontFamily: FONTS.poiretOneRegular,
    fontSize: 14
  },
  ImageContainer: {
    marginTop: 28,
    alignItems: 'center'
  },
  Image: {
    width: 120,
    height: 96
  },
  SeccionPregunta:{
    marginTop: 28,
  },
  SeccionPregunta__Header:{
    flexDirection: 'row',
    marginLeft: 16
  },
  SeccionPregunta__Header__Title:{
    fontFamily: FONTS.poiretOneRegular,
    fontSize: 13,
    marginRight: 16,
  },
  SeccionPregunta__Header__Line:{
    width: 88,
    borderBottomWidth: 1,
    borderBottomColor: '#aaaaaa'
  },
  SeccionPregunta__Pregunta:{
    marginTop: 32,
    fontSize: 18,
    fontFamily: FONTS.poiretOneRegular,
    marginBottom: 16,
  },
  SeccionPregunta__Option:{
    marginTop: 16,
    flexDirection: 'row',
    marginLeft: 32,
    alignItems: 'center',
  },
  SeccionPregunta__Option__Circle:{
    width: 10,
    height: 10,
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    marginRight: 16,
  },
  SeccionPregunta__Option__Text:{
    width: 260,
    fontFamily: FONTS.poiretOneRegular,
    fontSize: 16
  },
  Controls:{
    marginTop: 60,
    width: 260,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 60
  },
  Control:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  Control__Text:{
    fontFamily: FONTS.poiretOneRegular,
    fontSize: 14,
    marginHorizontal: 8
  },
  Control__Icon:{
    fontSize: 14,
    color: '#999999'
  }
})