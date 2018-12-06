import React, { Component } from 'react'
import { Text, View, StyleSheet, Picker, Alert } from 'react-native'
import { Constants } from 'expo'
import { FONTS } from '../../helpers/FONTS';
import { CustomPicker } from 'react-native-custom-picker'
export default class FormData extends Component {
  state = {
    altura: 1.70,
    peso: 65,
    edad: 18,
    sexo: 'NN'
  }
  renderOptionsAltura(){
    let array = new Array(100).fill(0);
    array = array.map((_,index)=>{
      return `1.${index}`;
    });
    return array.map((value, index)=>{
      return <Picker.Item 
        key = {index} 
        label = { `${value} m` } 
        value = {Number(value)}
        />
    });
  }
  renderOptionsPeso(){
    let array = new Array(300).fill(0);
    array = array.map((_,index)=>{
      return index + 65;
    });
    return array.map((value, index)=>{
      return <Picker.Item 
        key = {index} 
        label = { `${value} kg` } 
        value = {Number(value)}
        />
    });
  }
  renderOptionsEdad(){
    let array = new Array(60).fill(0);
    array = array.map((_,index)=>{
      return index + 10;
    });
    return array.map((value, index)=>{
      return <Picker.Item 
        key = {index} 
        label = { `${value} años` } 
        value = {Number(value)}
        />
    });
  }
  renderOptionsSexo(){
    let array = ['M','F']
    return array.map((value, index)=>{
      return <Picker.Item 
        key = {index} 
        label = { value } 
        value = {value}
        />
    });
  }
  render() {
    
    return (
      <View style = {{ flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
        <View style = {styles.StatusBar}/>
        <View style = {{
          width: 280,
          flex: 1,
          justifyContent: 'space-around'
        }}>
          <Text style = {styles.Pregunta}>Quremos saber mas de ti</Text>

          <View style = {{
            flexDirection: 'row',
            justifyContent: 'space-around'
          }}>
            <View style = { styles.Box }>
              <Text style = {{
                textAlign: 'center',
                fontFamily: FONTS.poiretOneRegular,
                fontSize: 18
              }}>Altura:</Text>
              <Picker
                selectedValue={this.state.altura}
                style={{ height: 50, width: '100%' }}
                onValueChange = {(itemValue, itemIndex) => this.setState({altura: itemValue})}
                >
                { this.renderOptionsAltura() }
              </Picker>
              <View style = { styles.Line }/>
            </View>
            <View style = { styles.Box }>
              <Text style = {{
                textAlign: 'center',
                fontFamily: FONTS.poiretOneRegular,
                fontSize: 18
              }}>Peso:</Text>
              <Picker
                selectedValue={this.state.peso}
                style={{ height: 50, width: '100%' }}
                onValueChange = {(itemValue, itemIndex) => this.setState({peso: itemValue})}
                >
                { this.renderOptionsPeso() }
              </Picker>
              <View style = { styles.Line }/>
            </View>
          </View>
          
          <View style = {{
            flexDirection: 'row',
            justifyContent: 'space-around'
          }}>
            <View style = { styles.Box }>
              <Text style = {{
                textAlign: 'center',
                fontFamily: FONTS.poiretOneRegular,
                fontSize: 18
              }}>Edad:</Text>
              <Picker
                selectedValue={this.state.edad}
                style={{ height: 50, width: '100%' }}
                onValueChange = {(itemValue, itemIndex) => this.setState({edad: itemValue})}
                >
                { this.renderOptionsEdad() }
              </Picker>
              <View style = { styles.Line }/>
            </View>
            <View style = { styles.Box }>
              <Text style = {{
                textAlign: 'center',
                fontFamily: FONTS.poiretOneRegular,
                fontSize: 18
              }}>Sexo:</Text>
              <Picker
                selectedValue={this.state.sexo}
                style={{ height: 50, width: '100%' }}
                onValueChange = {(itemValue, itemIndex) => this.setState({sexo: itemValue})}
                >
                { this.renderOptionsSexo() }
              </Picker>
              <View style = { styles.Line }/>
            </View>
          </View>
          <Text style = { styles.Continuar} onPress = { this.props.goToRegister } >continuar</Text>
          <Text style = { styles.Login } onPress = { this.props.goToLogin } >Tengo una cuenta</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  StatusBar: {
    height: Constants.statusBarHeight
  },
  Pregunta: {
    textAlign: 'center',
    fontFamily: FONTS.poiretOneRegular,
    fontSize: 24,
  },
  Box:{
    width: 100,
    alignItems: 'center'
  },
  Continuar:{
    textAlign: 'center',
    fontSize: 18,
    fontFamily: FONTS.poiretOneRegular
  },
  Line:{
    width: '80%',
    borderWidth: 1,
    borderBottomColor: 'black'
  },
  Login:{
    textAlign: 'center',
    fontSize: 18,
    fontFamily: FONTS.poiretOneRegular,
    textDecorationLine: 'underline'
  }
})
