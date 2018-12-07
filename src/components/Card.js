import React, { Component } from 'react'
import { Text, View, StyleSheet , ImageBackground, TouchableOpacity } from 'react-native'
import { FONTS } from '../helpers/FONTS'
import { Icon } from 'native-base'
import { getCurrentUser } from '../helpers/auth';
import { getSubscripcion, postSubscripcion } from '../helpers/subscription';
import { getUser, updateLlavesUser } from '../helpers/user';

export default class Card extends Component {
  state = {
    noAlcanza: true,
    subscripcion: null
  }
  getData = async () => {
    try{
      const { curso } = this.props;
      const _user = await getCurrentUser();
      const { user } = await getUser(_user._id);
      const { subscripcion } = await getSubscripcion(_user._id,curso._id);
      let noAlcanza = true;
      if(user.llaves >= curso.llaves){
        noAlcanza = false;
      }
      this.setState({
        noAlcanza: noAlcanza,
        subscripcion: subscripcion
      });
    }catch(e){
      console.log(e);
    }
  }
  componentDidMount = async () => {
    this.timer = setInterval(()=>{
      this.getData();
    },5000);
    this.getData();
  }
  componentWillUnmount = async () => {
    clearInterval(this.timer);
  }
  ingresarCurso = async () => {
    try{
      const _user = await getCurrentUser();
      const { user } = await getUser(_user._id);
      const { curso } = this.props;
      
      const { subscripcion } = this.state;
      if(subscripcion){
        this.props.navigation.navigate('Tema',{
          index: subscripcion.temaActual,
          curso: curso
        });
      }else{// No esta suscrito
        if(this.state.noAlcanza) throw 'Necesitas mas llaves'
        await updateLlavesUser(user._id,user.llaves - curso.llaves)
        const { subscripcion } = await postSubscripcion(user._id,curso._id);
        this.props.navigation.navigate('Tema',{
          index: subscripcion.temaActual,
          curso: curso
        });
      }
    }catch(e){
      console.log(e);
    }
    
  }
  render(){
    const { curso } = this.props;
    const nameIcon = !this.state.subscripcion? 'lock': 'unlock' 
    return (
      <View 
        style = { styles.Tema }
        >
        <TouchableOpacity onPress = { this.ingresarCurso }>
          <ImageBackground
            style = { styles.TemaImage }
            source = {{uri: curso.urlImage}}
          >
            {
              this.state.subscripcion?(
                <View style = { styles.Row}>
                  <View style = { styles.Llaves }>
                    <Text style = { [styles.Llaves__Number,{ marginRight: 0}]}>$$</Text>
                  </View>
                </View>  
              ):(
                <View style = { styles.Row}>
                  <View style = { styles.Llaves }>
                    <Text style = { styles.Llaves__Number }>{curso.llaves}</Text>
                    <Icon style = { styles.LLaves__Icon} name = 'key'/>
                  </View>
                </View>
              )
            }
          </ImageBackground>
          {
            this.state.subscripcion?(
              <View style = {  [styles.TemaFooter,{
                backgroundColor: 'rgba(50, 150, 30, 0.8)'
              }]}>
                <Text style = { styles.TemaTitle }>{curso.nombre}</Text>
                <Icon 
                  name= { nameIcon } 
                  style = { [styles.TemaIcon, {
                    color: 'white'
                  }] }
                  />
              </View>
            ):(
              <React.Fragment>
                { this.state.noAlcanza?(
                  <View style = { [styles.TemaFooter, {
                    backgroundColor: 'rgba(253, 13, 13, 0.55)'
                  }]}>
                    <Text style = { styles.TemaTitle }>{curso.nombre}</Text>
                    <Icon 
                      name= { nameIcon } 
                      style = { styles.TemaIcon }
                      />
                  </View>
                ):(
                  <View style = { [styles.TemaFooter,{
                    backgroundColor: 'rgba(198, 198, 56, 1)'
                  }]}>
                    <Text style = { styles.TemaTitle }>{curso.nombre}</Text>
                    <Icon 
                      name= { nameIcon } 
                      style = { styles.TemaIcon}
                      />
                  </View>
                )}
                
              </React.Fragment>
            )
          }
          
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  Tema:{
    width: 120,
    borderRadius: 5,
    overflow: 'hidden',
    marginRight: 6,
    marginLeft: 6,
  },
  TemaImage: {
    width: 120,
    height: 88,
  },
  TemaFooter: {
    height: 32,
    backgroundColor: '#aaaaaaaa',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  TemaTitle: {
    fontSize: 12,
    fontFamily: FONTS.hindSemiBold
  },
  TemaIcon: {
    fontSize: 16
  },
  Row:{
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  Llaves:{
    backgroundColor: '#000000aa',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    paddingLeft: 4,
    paddingRight: 4
  },
  Llaves__Number:{
    color: 'white',
    fontSize: 13,
    marginRight: 2
  },
  LLaves__Icon:{
    color: 'yellow',
    fontSize: 16
  }
})
