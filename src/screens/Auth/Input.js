import React, { Component } from 'react'
import { Text, View , StyleSheet , TextInput , Animated } from 'react-native'
import { FONTS } from '../../helpers/FONTS';

export default class Input extends Component {
  state = {
    focus: new Animated.Value(0)
  }
  isValido(){
    const { validators, value } = this.props;
    if(validators){
      const errors = [];
      validators.forEach((validator)=>{
        const { test, message } = validator;
        if(!test(value)){
          errors.push(message)
        }
      })
      return errors[0];
    }
    return ''
  }
  handleFocus = () => Animated.spring(this.state.focus,{toValue: 1,duration: 300 }).start()
  handleBlur = () => {
    if(!this.props.value){
      Animated.timing(this.state.focus,{toValue: 0, duration: 300 }).start()
    }
  }
  render() {
    const { value , onChangeText, name , label } = this.props;
    const left = this.state.focus.interpolate({
      inputRange: [0,1],
      outputRange: [5,0]
    });
    const top = this.state.focus.interpolate({
      inputRange: [0,1],
      outputRange: [5,-18]
    });
    return (
      <View style = { styles.GroupInput}>
        <Animated.Text style = {{
          position: 'absolute',
          fontSize: 18,
          fontFamily: FONTS.poiretOneRegular,
          left: left,
          top: top,
        }}>{label}</Animated.Text>
        <TextInput 
          value = { value }
          onChangeText = { (value) => onChangeText(value, name)}
          onFocus = { this.handleFocus}
          onBlur = {this.handleBlur}
          keyboardType = { this.props.keyboardType ? this.props.keyboardType : 'default'}
          secureTextEntry = { this.props.secureTextEntry}
          />
        <View style = { styles.Line}/>
        <Text style = { styles.Error }>{ this.isValido() }</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  GroupInput:{
    width: 256,
    height: 60,
    marginBottom: 5
  },
  TextInput:{
    fontSize: 18,
    fontFamily: FONTS.poiretOneRegular
  },
  Line:{
    borderWidth: 1,
    borderBottomColor: 'black'
  },
  Error:{
    fontSize: 11,
    fontFamily: FONTS.poiretOneRegular,
    color: 'red'
  }
})
