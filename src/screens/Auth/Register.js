import React, { Component } from 'react'
import { Text, View, StyleSheet , Animated , TouchableWithoutFeedback , Keyboard} from 'react-native'
import Input from './Input';
import { FONTS } from '../../helpers/FONTS';
import { register } from '../../helpers/auth';

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
        toValue: event.endCoordinates.height-120,
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
  handleSubmit = async () => {
    const { username , email , password , confirmPassword } = this.state;
    try{
      if(password !== confirmPassword) throw new Error('Contraseñas no coinciden')
      const data = this.props.navigation.getParam('data',{});
      console.log(data);
      const resp = await register({
        username,
        email,
        password,
        peso: data.peso,
        altura: data.altura,
        edad: data.edad,
        sexo: data.sexo
      })
      if(resp.ok){
        this.props.navigation.navigate('Inicio');
      }else{
        console.log(resp.message);
      }
    }catch(e){
      console.log(e);
    }
  }
  render() {
    return (
      <Animated.View 
        style = {{
          flex: 1,
          paddingBottom: this.state.keyboardHeight,
          backgroundColor: 'rgba(95, 169, 169, 0.85)'
        }}
        >
        <TouchableWithoutFeedback onPress = {()=> Keyboard.dismiss()}>
          <View style = {{ flex: 1, justifyContent: 'space-around', alignItems: 'center'}}>
            <Animated.Text style = { [styles.Title,{fontSize: this.state.fontSize}] }> Foodemy </Animated.Text>
            <View style = { styles.ImageContainer }>
              <Animated.Image 
                style = {{
                  height: this.state.imageHeight,
                  width: this.state.imageHeight,
                  borderRadius: 70
                }}
                source = {{ uri: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80'}}/>
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
                keyboardType = 'email-address'
              />
              <Input
                label = 'Contraseña'
                name = 'password'
                onChangeText = { this.handleChangeText }
                value = { this.state.password }
                secureTextEntry = { true }
              />
              <Input
                label = 'Confirme Contraseña'
                name = 'confirmPassword'
                onChangeText = { this.handleChangeText }
                value = { this.state.confirmPassword }
                secureTextEntry = { true }
              />
            </View>
            <View>
              <Text style = { styles.Submit } onPress = { this.handleSubmit }>Crear Cuenta</Text>
              <Text style = { styles.Login } onPress = {() => this.props.navigation.navigate('Login')} >tengo cuenta</Text>
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