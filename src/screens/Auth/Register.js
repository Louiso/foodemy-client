import React, { Component } from 'react'
import { Text, View, Image, StyleSheet , Animated , TouchableWithoutFeedback , Keyboard} from 'react-native'
import Input from './Input';
import { FONTS } from '../../helpers/FONTS';

const IMAGE_HEIGHT = 140;
const IMAGE_HEIGHT_SMALL = 0;
const fontSizeTitle = 64;
const fontSizeTitle_SMALL = 0;

export default class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    keyboardHeight : new Animated.Value(0),
    imageHeight: new Animated.Value(IMAGE_HEIGHT),
    fontSize: new Animated.Value(fontSizeTitle)
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
    const duration = 500;
    Animated.parallel([
      Animated.timing(this.state.keyboardHeight, {
        duration: duration,
        toValue: event.endCoordinates.height-50,
      }),
      Animated.timing(this.state.imageHeight, {
        duration: duration,
        toValue: IMAGE_HEIGHT_SMALL,
      }),
      Animated.timing(this.state.fontSize,{
        duration: duration,
        toValue: fontSizeTitle_SMALL
      })
    ]).start();
  }

  keyboardDidHide = (event) => {
    const duration = 500;
    Animated.parallel([
      Animated.timing(this.state.keyboardHeight, {
        duration: duration,
        toValue: 0,
      }),
      Animated.timing(this.state.imageHeight, {
        duration: duration,
        toValue: IMAGE_HEIGHT,
      }),
      Animated.timing(this.state.fontSize,{
        duration: duration,
        toValue: fontSizeTitle
      })
    ]).start();
  };
  handleChangeText = (value, name) => {
    this.setState({
      [name]: value
    });
  }
  handleSubmit = () => {
    const { username , email , password , confirmPassword } = this.state;
    console.log({
      username,
      email,
      password,
      confirmPassword
    });
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
            <Animated.Text style = { [styles.Title,{fontSize: this.state.fontSize}] }> Foodemy </Animated.Text>
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
                label = 'Nombre de Usuario'
                name = 'username'
                onChangeText = { this.handleChangeText }
                value = { this.state.username }
              />
              <Input
                label = 'Correo Electronico'
                name = 'email'
                onChangeText = { this.handleChangeText }
                value = { this.state.email }
              />
              <Input
                label = 'Contraseña'
                name = 'password'
                onChangeText = { this.handleChangeText }
                value = { this.state.password }
              />
              <Input
                label = 'Confirme Contraseña'
                name = 'confirmPassword'
                onChangeText = { this.handleChangeText }
                value = { this.state.confirmPassword }
              />
            </View>
            <View>
              <Text style = { styles.Submit } onPress = { this.handleSubmit }>Crear Cuenta</Text>
              <Text style = { styles.Login }>tengo cuenta</Text>
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
  Login:{
    textAlign: 'center',
    color: 'blue',
    textDecorationLine: 'underline'
  }

})