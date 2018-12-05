import React, { Component } from 'react'
import { Text, View,  StyleSheet , Image , ScrollView} from 'react-native'
import { Icon } from 'native-base'
import { FONTS } from '../../../helpers/FONTS';
import { getTema } from '../../../helpers/tema';
import { getCurrentUser } from '../../../helpers/auth';
import { getSubscripcion, updateTemaActual } from '../../../helpers/subscription';
import { getEvaluacion, postEvaluacion , updateRespuestaEvaluacion } from '../../../helpers/evaluacion';
import { updateLlavesUser } from '../../../helpers/user';
import { getDataTema } from '../../../services/tema.services';

export default class Tema extends Component {
  state = {
    tema: null,
    nameTemaAnterior: '',
    nameTemaSiguiente: '',
    opcionSelected: null,
    evaluado: false,
    correcto: false
  }
  componentDidMount = async () => {
    
    try{
      const index = this.props.navigation.getParam('index','No-INDEX');
      const curso = this.props.navigation.getParam('curso','No-Curso');
      // const dataTema = await getDataTema(index, curso)
      // console.log(dataTema);
      const _idTemaActual = curso.temas[index]
      let nameTemaAnterior = '';
      if(index !== 0){
        const _idTemaAnterior = curso.temas[index-1]
        const resp = await getTema(_idTemaAnterior);
        if(!resp.ok) throw 'No se pudo obtener tema anterior'
        nameTemaAnterior = resp.tema.nombre;
      } 
      let nameTemaSiguiente = '';
      if(index < curso.temas.length){
        const _idTemaSiguiente = curso.temas[index + 1]
        const resp = await getTema(_idTemaSiguiente);
        if(!resp.ok) throw 'No se pudo obtener tema siguiente'
        nameTemaSiguiente = resp.tema.nombre
      }
      const resp = await getTema(_idTemaActual);
      const user = await getCurrentUser();
      const respSubs = await getSubscripcion(user._id,curso._id);
      const respEval = await getEvaluacion(respSubs.subscripcion._id, curso.temas[index]);
      
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
  handleEvaluar = async () => {
    if(this.state.opcionSelected === null) return console.log('No selecciono nada');

    const curso = this.props.navigation.getParam('curso','No-Curso');
    const user = await getCurrentUser();
    const respSubs = await getSubscripcion(user._id,curso._id);
    const index = this.props.navigation.getParam('index','No-INDEX');
    const respEval = await getEvaluacion(respSubs.subscripcion._id, curso.temas[index]);
    if(!respEval.ok){
      /* CREAR EVALUACION */
      const newRespEval = await postEvaluacion(respSubs.subscripcion._id, curso.temas[index], this.state.opcionSelected );
      const respTema = await getTema(curso.temas[index]);
      let correcto = false;
      if(newRespEval.evaluacion.respuesta === respTema.tema.prueba.indexCorrecta){
        correcto = true;
        console.log('Premio',respTema.tema.prueba.premio);
        const newUser = await updateLlavesUser(user._id, respTema.tema.prueba.premio);
      }
      this.setState({
        evaluado: true,
        correcto: correcto
      });

      
    }else{
      const respEval = await getEvaluacion(respSubs.subscripcion._id, curso.temas[index]);
      const respTema = await getTema(curso.temas[index]);
      const updateRespEval = await updateRespuestaEvaluacion(respEval.evaluacion._id, this.state.opcionSelected )
      let correcto = false;
      console.log(this.state.opcionSelected);
      console.log(updateRespEval.evaluacion.respuesta, respTema.tema.prueba.indexCorrecta);
      if( updateRespEval.evaluacion.respuesta === respTema.tema.prueba.indexCorrecta){
        correcto = true;
      }
      this.setState({
        evaluado: true,
        correcto: correcto
      })
    }
  }
  renderOptions = (opciones) => {
    return opciones.map((opcion, index) => {
      let colorCheck;
      if(index === this.state.opcionSelected){
        if(this.state.evaluado){
          if(this.state.correcto){
            colorCheck = {
              backgroundColor: 'green'
            }
          }else{
            colorCheck = {
              backgroundColor: 'red'
            }
          }
        }else{
          colorCheck = {
            backgroundColor: 'black'
          }
        }
      }else{
        colorCheck = {
          backgroundColor: 'white'
        }
      }
      return (
        <View style = { styles.SeccionPregunta__Option} key = { index }>
          <View style = { [styles.SeccionPregunta__Option__Circle, colorCheck ]}/>
          <Text style = { styles.SeccionPregunta__Option__Text} onPress = { () => this.setState({ opcionSelected: index, evaluado: false })}>{opcion}</Text>
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
          <Text style = { styles.SeccionPregunta__Header__Title}>DESBLOQUEA LOS SIGUIENTES CURSOS:</Text>
          <View style = { styles.SeccionPregunta__Header__Line}/>
        </View>
        <Text style = { styles.SeccionPregunta__Pregunta}>{prueba.pregunta}</Text>
        { this.renderOptions(prueba.opciones) }
        <Text style = { styles.Evaluar } onPress = { this.handleEvaluar }>Evaluar</Text>
      </View>
    )
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
        { this.renderSectionPreguntas() }
        
        <View style = { styles.Controls }>
          {
            this.props.navigation.getParam('index','No-INDEX') === 0 ? <Text></Text>:(
              <View style = { styles.Control}>
                <Icon style = { styles.Control__Icon} name = 'chevron-left' type = 'FontAwesome'/>
                <Text style = { styles.Control__Text} disabled = { this.handleDisabledAnterior() }  onPress = { this.handleAnterior } >{this.state.nameTemaAnterior}</Text>
              </View>
            )
          }
          
          <View style = { styles.Control }>
            <Text style = { styles.Control__Text} disabled = { this.handleDisabledSiguiente() } onPress = { this.handleSiguiente }>{this.state.nameTemaSiguiente}</Text>
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
    fontFamily: FONTS.poiretOneRegular,
    fontSize: 14,
    marginHorizontal: 8
  },
  Control__Icon:{
    fontSize: 14,
    color: '#999999'
  }
})