import React, { Component } from 'react'
import { Text, View, Image, StyleSheet , Keyboard, TouchableWithoutFeedback , Animated} from 'react-native'
import Input from './Input';
import { FONTS } from '../../helpers/FONTS';
import { login } from '../../helpers/auth';

// function isNotVoid(value){
//   return value !== ''
// }

const IMAGE_HEIGHT = 140;
const IMAGE_HEIGHT_SMALL = 0;
export default class Login extends Component {
  state = {
    email: '',
    password: '',
    keyboardHeight : new Animated.Value(0),
    imageHeight: new Animated.Value(IMAGE_HEIGHT)
  }
  componentDidMount(){
    this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }
  componentWillUnmount(){
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
  }
  keyboardDidShow = (event) => {
    const duration = 1000;
    Animated.parallel([
      Animated.timing(this.state.keyboardHeight, {
        duration: duration,
        toValue: event.endCoordinates.height,
      }),
      Animated.timing(this.state.imageHeight, {
        duration: duration,
        toValue: IMAGE_HEIGHT_SMALL,
      }),
    ]).start();
  }

  keyboardDidHide = (event) => {
    const duration = 1000;
    Animated.parallel([
      Animated.timing(this.state.keyboardHeight, {
        duration: duration,
        toValue: 0,
      }),
      Animated.timing(this.state.imageHeight, {
        duration: duration,
        toValue: IMAGE_HEIGHT,
      }),
    ]).start();
  };

  handleChangeText = (value, name) => {
    this.setState({
      [name]: value
    });
  }
  handleSubmit = async () => {
    const { email, password } = this.state;
    const resp = await login({
      email,
      password
    });
    console.log(resp);
    if(resp.ok){
      this.props.navigation.navigate('Inicio');
    }else{
      console.log(resp.message);
    }
  }
  render() {
    return (
      <Animated.View 
        style = {{
          flex: 1,
          paddingBottom: this.state.keyboardHeight
        }}  
        >
        <TouchableWithoutFeedback onPress = {()=> Keyboard.dismiss()}>
          <View style = {{ flex: 1, justifyContent: 'space-around', alignItems: 'center'}}>
            <Text style = { styles.Title }> Foodemy </Text>
            <View style = { styles.ImageContainer }>
              <Animated.Image 
                style = {{
                  height: this.state.imageHeight,
                  width: this.state.imageHeight
                }} 
                source = {{ uri: 'https://images.goodsmile.info/cgm/images/product/20131002/4076/26528/large/439eacec24633df79d0e2b0c3bebeb0e.jpg'}}/>
            </View>
            <View style = {styles.Form}>
              <Input
                label = 'Correo Electronico'
                value = { this.state.email }
                name = 'email'
                onChangeText = { this.handleChangeText } 
                />
              <Input
                label = 'Contraseña'
                value = { this.state.password }
                name = 'password'
                secureTextEntry = { true } 
                onChangeText = { this.handleChangeText }
              />
            </View>
            <View>
              <Text style = { styles.Submit } onPress = { this.handleSubmit }>Iniciar Sesion</Text>
              <Text style = { styles.Register} onPress = { () => this.props.navigation.navigate('Register')}>Registrarse</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  Title:{
    fontFamily: FONTS.poiretOneRegular,
    fontSize: 64
  },
  ImageContainer:{

  },
  Form:{

  },
  Submit: {
    fontFamily: FONTS.hindSemiBold,
    fontSize: 24,
    marginBottom: 32
  },
  Register:{
    textAlign: 'center',
    color: 'blue',
    textDecorationLine: 'underline'
  }

})