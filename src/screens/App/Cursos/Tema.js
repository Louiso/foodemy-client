import React, { Component } from 'react'
import { Text, View,  StyleSheet , Image , ScrollView, Animated } from 'react-native'
import { Icon } from 'native-base'
import { FONTS } from '../../../helpers/FONTS';
import { getTema } from '../../../helpers/tema';
import { getCurrentUser } from '../../../helpers/auth';
import { getSubscripcion, updateTemaActual, updateLlavesObtenidas } from '../../../helpers/subscription';
import { getEvaluacion, postEvaluacion , updateRespuestaEvaluacion } from '../../../helpers/evaluacion';
import { updateLlavesUser, getUser } from '../../../helpers/user';

export default class Tema extends Component {
  state = {
    tema: null,
    nameTemaAnterior: '',
    nameTemaSiguiente: '',
    opcionSelected: null,
    evaluado: false,
    correcto: false,
    animacion: new Animated.Value(0)
  }
  componentDidMount = async () => {
    
    try{
      const index = this.props.navigation.getParam('index','No-INDEX');
      const curso = this.props.navigation.getParam('curso','No-Curso');
      // const dataTema = await getDataTema(index, curso)
      // console.log(dataTema);
      const _idTemaActual = this.getIndexTema(curso,index)
      let nameTemaAnterior = '';
      if(index !== 0){
        const _idTemaAnterior = this.getIndexTema(curso,index-1)
        const resp = await getTema(_idTemaAnterior);
        nameTemaAnterior = resp.tema?resp.tema.nombre: '';
      } 
      let nameTemaSiguiente = '';
      if(index < curso.temas.length){
        const _idTemaSiguiente = this.getIndexTema(curso,index+1)
        const resp = await getTema(_idTemaSiguiente);
        nameTemaSiguiente = resp.tema?resp.tema.nombre:''
      }
      const resp = await getTema(_idTemaActual);
      console.log(resp);
      const user = await getCurrentUser();
      const respSubs = await getSubscripcion(user._id,curso._id);
      const respEval = await getEvaluacion(respSubs.subscripcion._id, _idTemaActual);
      
      let evaluado = false; 
      let opcionSelected = null;
      let correcto = false;
      let tema = null;

      if(!resp.ok) throw 'No se pudo obtener tema'
      tema = resp.tema;
      if(!respEval.ok) console.log('No hay evaluacion aun');
      else{
        evaluado = true;
        opcionSelected = respEval.evaluacion.respuesta;
        if( tema.prueba.indexCorrecta === opcionSelected ){
          correcto = true;
        }
      }
      console.log(tema)
      this.setState({
        tema: tema,
        evaluado: evaluado,
        opcionSelected: opcionSelected,
        correcto: correcto,
        nameTemaAnterior,
        nameTemaSiguiente
      });
    }catch(e){
      console.log(e);
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
  animarRespuesta = (correcto) => {
    this.setState({
      correcto: correcto
    })
    Animated.spring(
      this.state.animacion,{
        toValue: 50,
        duration: 1500
      }
    ).start((animacion)=>{
      if(animacion.finished){
        Animated.spring(
          this.state.animacion,{
            toValue: 100,
            duration: 3000,
            delay: 500
          }
        ).start((animacion)=>{
          if(animacion.finished){
            this.setState({
              evaluado: true,
              animacion: new Animated.Value(0)
            });
          }
        })
      }
    })
    
  }
  handleSiguiente = async () => {
    const curso = this.props.navigation.getParam('curso','No-Curso');
    const index = this.props.navigation.getParam('index','No-INDEX');
    try{
      const user = await getCurrentUser();
      const resp = await getSubscripcion(user._id,curso._id);
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
  getIndexTema = (curso, index) => {
    if(curso.temas[index]._id){
      return curso.temas[index]._id
    }else{
      return curso.temas[index]
    }
  }
  handleEvaluar = async () => {
    if(this.state.opcionSelected === null) return console.log('No selecciono nada');
    const curso = this.props.navigation.getParam('curso','No-Curso');
    const index = this.props.navigation.getParam('index','No-INDEX');
    const _user = await getCurrentUser();
    const { user } = await getUser(_user._id);
    const respSubs = await getSubscripcion(user._id,curso._id);
    let _idTema = this.getIndexTema(curso,index);
    const respEval = await getEvaluacion(respSubs.subscripcion._id, _idTema);
    /* Si no se tiene evaluacion entonces evaluar */
    if(!respEval.ok){
      const newRespEval = await postEvaluacion(respSubs.subscripcion._id, _idTema, this.state.opcionSelected );
      const respTema = await getTema(_idTema);
      let correcto = false;
      if(newRespEval.evaluacion.respuesta === respTema.tema.prueba.indexCorrecta){
        correcto = true;
        const newUser = await updateLlavesUser(user._id, user.llaves + respTema.tema.prueba.premio);
        const newSubscripcion = await updateLlavesObtenidas(respSubs.subscripcion._id, respSubs.subscripcion.llavesObtenidas + respTema.tema.prueba.premio)
      }
      this.animarRespuesta(correcto)
      
    }
  }
  renderOptions = (opciones) => {
    return opciones.map((opcion, index) => {
      let Option__Circle__Extra;
      let Option__Text__Extra;
      if(index === this.state.opcionSelected){
        if(this.state.evaluado){
          Option__Circle__Extra = {
            height: 15,
            width: 15,
            borderRadius: 7.5
          }
          if(this.state.correcto){
            Option__Circle__Extra = {
              ...Option__Circle__Extra,
              backgroundColor: 'rgba(50, 150, 30, 0.8)'
            }
          }else{
            Option__Circle__Extra = {
              ...Option__Circle__Extra,
              backgroundColor: 'rgba(253, 13, 13, 0.55)'
            }
            Option__Text__Extra = {
              textDecorationLine: 'line-through'
            }
          }
        }else{
          Option__Circle__Extra = {
            backgroundColor: '#36577E'
          }
        }
      }else{
        Option__Circle__Extra = {
          backgroundColor: 'rgba(229, 229, 229, 0.85)'
        }
      }
      return (
        <View style = { styles.SeccionPregunta__Option} key = { index }>
          <View 
            style = { [styles.SeccionPregunta__Option__Circle, Option__Circle__Extra ]}/>
          <Text 
            style = { [styles.SeccionPregunta__Option__Text, Option__Text__Extra ]} 
            onPress = { () => this.setState({ opcionSelected: index, evaluado: false })}
            disabled = { this.state.evaluado }
            >{opcion}
          </Text>
        </View>
      );
    });
  }
  renderSectionPreguntas = () => {
    const { tema } = this.state;
    if(!tema || !tema.prueba) return <View/>
    const { prueba } = tema;
    return (
      <View style = { styles.SeccionPregunta }>
        <View style = { styles.SeccionPregunta__Header}>
          <Text style = { styles.SeccionPregunta__Header__Title}>
            DESBLOQUEA { this.state.tema? this.state.tema.prueba.premio: '0'}</Text>
          <Icon name='key' style = {{ fontSize: 20, color: 'rgba(198, 198, 56, 1)'}}/>
          <Text style = { styles.SeccionPregunta__Header__Title}> :</Text>
          <View style = { styles.SeccionPregunta__Header__Line}/>
        </View>
        <Text style = { styles.SeccionPregunta__Pregunta}>{prueba.pregunta}</Text>
        { this.renderOptions(prueba.opciones) }
        <Text 
          style = { [styles.Evaluar, this.state.evaluado? {color: 'rgba(229, 229, 229, 1)'}:{}] } 
          onPress = { this.handleEvaluar }
          disabled = { this.state.evaluado }
          >{ this.state.evaluado?'Evaluado':'Evaluar'}
        </Text>
      </View>
    )
  }
  render() {
    if(!this.state.tema){
      return <Text>Loading...</Text>
    }
    const right = this.state.animacion.interpolate({
      inputRange: [ 0, 50 ,  100],
      outputRange: [ -100, 130 , 360]
    })
    const bottom = this.state.animacion.interpolate({
      inputRange: [0, 50, 100],
      outputRange: [ 300, 200, 300 ]
    })
    return (
      <ScrollView 
        style = {{
          flex: 1,
          backgroundColor: 'rgba(95, 169, 169, 0.85)'
        }}
        contentContainerStyle={{
          alignItems: 'center'
        }}
      >
        <Text style = { styles.TitleTema }>{this.state.tema.nombre}</Text>
        { this.renderContenido() }
        { this.renderSectionPreguntas() }
        
        <View style = { styles.Controls }>
          {
            this.props.navigation.getParam('index','No-INDEX') === 0 ? <Text></Text>:(
              <View style = { styles.Control}>
                <Icon style = { styles.Control__Icon} name = 'chevron-left' type = 'FontAwesome'/>
                <Text 
                  style = { styles.Control__Text} 
                  disabled = { this.handleDisabledAnterior() }  
                  onPress = { this.handleAnterior } >
                  {this.state.nameTemaAnterior}
                </Text>
              </View>
            )
          }
          {this.state.nameTemaSiguiente!==''? (
            <View style = { styles.Control }>
              <Text 
                style = { [styles.Control__Text, this.state.evaluado?{color: '#36577E', fontFamily: FONTS.hindSemiBold}:{}]} 
                disabled = { this.handleDisabledSiguiente() } 
                onPress = { this.handleSiguiente }>
                {this.state.nameTemaSiguiente}
              </Text>
              <Icon 
                style = { styles.Control__Icon } 
                name = 'chevron-right' 
                type = 'FontAwesome'/>
            </View>
          ):<Text></Text>}
        </View>
        <Animated.View style = {{
          position: 'absolute',
          right: right,
          bottom: bottom,
          width: 100,
          height: 100,
          backgroundColor: this.state.correcto?'rgba(50, 150, 30, 0.8)':'rgba(253, 13, 13, 0.55)',
          borderRadius: 50,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {this.state.correcto?(
            <React.Fragment>

                <Text style = {{
                  color: 'rgba(229, 229, 229, 0.85)',
                  fontSize: 14,
                  fontFamily: FONTS.hindBold
                }}>Ganaste</Text>
                <View style = {{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                  <Text style ={{
                    color: 'white',
                    fontFamily: FONTS.hindBold,
                    fontSize: 28,
                    marginRight: 4,
                  }} >{this.state.tema.prueba.premio}</Text>
                  <Icon name ='key' style = {{ 
                    fontSize: 30, 
                    color: 'white'
                  }}/>
              </View>
            </React.Fragment>
          ):(
            <Text style ={{
              color: 'white',
              fontSize: 14,
              fontFamily: FONTS.hindBold
            }}>Fallaste</Text>
          )}
          
        </Animated.View>
      </ScrollView>
    
    )
  }
}

const styles = StyleSheet.create({
  TitleTema: {
    marginTop: 28,
    fontSize: 24,
    textAlign: 'center',
    fontFamily: FONTS.hindBold,
    color: 'rgba(229, 229, 229, 0.85)'
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
    width: 200,
    height: 200
  },
  SeccionPregunta:{
    marginTop: 28,
  },
  SeccionPregunta__Header:{
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16
  },
  SeccionPregunta__Header__Title:{
    fontFamily: FONTS.poiretOneRegular,
    fontSize: 16,
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
    textAlign: 'center'
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
    fontFamily: FONTS.hindRegular,
    fontSize: 14,
    marginHorizontal: 8
  },
  Control__Icon:{
    fontSize: 14,
    color: '#36577E'
  }
})