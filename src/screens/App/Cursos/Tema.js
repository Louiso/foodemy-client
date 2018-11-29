import React, { Component } from 'react'
import { Text, View,  StyleSheet , Image , ScrollView} from 'react-native'
import { Icon } from 'native-base'
import { FONTS } from '../../../helpers/FONTS';
import { getTema } from '../../../helpers/tema';
import { getCurrentUser } from '../../../helpers/auth';
import { getSubscripcion, updateTemaActual } from '../../../helpers/subscription';

export default class Tema extends Component {
  state = {
    tema: null
  }
  componentDidMount = async () => {
    const index = this.props.navigation.getParam('index','No-INDEX');
    const curso = this.props.navigation.getParam('curso','No-Curso');
    const _idTemaActual = curso.temas[index]
    const resp = await getTema(_idTemaActual);
    if(resp.ok){
      this.setState({
        tema: resp.tema
      });
    } 
  }
  renderContenido(){
    const { contenido } = this.state.tema;
    return contenido.map((parrafo)=>{
      if(parrafo.tipo === 'TEXT'){
        return (
          <Text key = {parrafo._id} style = { styles.Parrafo }>{parrafo.text}</Text>
        );
      }else{
        return(
          <View key = { parrafo._id } style = { styles.ImageContainer }>
            <Image style = { styles.Image } source = {{uri : parrafo.text}}/>
          </View>
        )
      }
    })
  }
  handleDisabledAnterior = () => {
    const index = this.props.navigation.getParam('index','No-INDEX');
    return index === 0;    
  }
  handleDisabledSiguiente = () => {
    const index = this.props.navigation.getParam('index','No-INDEX');
    const curso = this.props.navigation.getParam('curso','No-CURSO');    
    return index === curso.temas.length - 1;
  }
  handleAnterior = async () => {
    const curso = this.props.navigation.getParam('curso','No-CURSO');
    const index = this.props.navigation.getParam('index','No-INDEX');
    try{
      const user = await getCurrentUser();
      const resp = await getSubscripcion(user._id,curso._id);
      if(!resp.ok) throw resp.err
      this.props.navigation.push('Tema',{
        index: index - 1,
        curso: curso
      });
        
    }catch(e){
      console.log('ERROR',e);
    }
  }
  handleSiguiente = async () => {
    const curso = this.props.navigation.getParam('curso','No-Curso');
    const index = this.props.navigation.getParam('index','No-INDEX');
    console.log('CLICK');
    try{
      const user = await getCurrentUser();
      /* GET subscripcion */
      const resp = await getSubscripcion(user._id,curso._id);
      /* actualizar Subscripcion */
      if(!resp.ok) throw resp.err
      
      if(resp.subscripcion.temaActual === index ){
        const newResp = await updateTemaActual(resp.subscripcion._id,resp.subscripcion.temaActual + 1);
        if(!newResp.ok) throw resp.err
        this.props.navigation.push('Tema',{
          index: newResp.subscripcion.temaActual,
          curso: curso
        });
      }else{
        this.props.navigation.push('Tema',{
          index: index + 1,
          curso: curso
        });
      }   
    }catch(e){
      console.log('ERROR',e);
    }
  }
  handleEvaluar = async () => {
    
    
  }
  render() {
    if(!this.state.tema){
      return <Text>Loading...</Text>
    }
    return (
      <ScrollView 
        style = {{
          flex: 1
        }}
        contentContainerStyle={{
          alignItems: 'center'
        }}
      >
        <Text style = { styles.TitleTema }>{this.state.tema.nombre}</Text>
        { this.renderContenido() }
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
        
        <Text style = { styles.Evaluar } onPress = { this.handleEvaluar }>Evaluar</Text>

        <View style = { styles.Controls }>
          <View style = { styles.Control}>
            <Icon style = { styles.Control__Icon} name = 'chevron-left' type = 'FontAwesome'/>
            <Text style = { styles.Control__Text} disabled = { this.handleDisabledAnterior() }  onPress = { this.handleAnterior } >anterior</Text>
          </View>
          <View style = { styles.Control }>
            <Text style = { styles.Control__Text} disabled = { this.handleDisabledSiguiente() } onPress = { this.handleSiguiente }>Alimentacion</Text>
            <Icon style = { styles.Control__Icon } name = 'chevron-right' type = 'FontAwesome'/>
          </View>
        </View>
      </ScrollView>
    
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
    textAlign: 'justify',
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
  Evaluar:{
    marginTop: 32,
    fontFamily: FONTS.hindSemiBold,
    fontSize: 18,
  },
  Controls:{
    marginTop: 32,
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