import React from 'react';
import { Text} from 'react-native';
import { Font } from 'expo';
import PreguntaDieta from './src/screens/Intro/PreguntaDieta';
import PreguntaEsfuerzo from './src/screens/Intro/PreguntaEsfuerzo';
import PresentaMetabot from './src/screens/Intro/PresentaMetabot';
import Login from './src/screens/Auth/Login';
import FormData from './src/screens/Intro/FormData';
import Register from './src/screens/Auth/Register';
import Cursos from './src/screens/App/Cursos/Cursos';
import Tema from './src/screens/App/Cursos/Tema';
import Social from './src/screens/App/Social/Social';
import Muro from './src/screens/App/Muro/Muro';

export default class App extends React.Component {
  state = {
    ready : false
  }
  componentDidMount = async () => {
    try{
      const res = await fetch('http://192.168.1.104:4000/auth/login',{
        method: 'POST',
        headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: 'Gransullca@gmail.com',
          password: '123'
        })
      })
      const resJson = await res.json()
      console.log(resJson);
      await Font.loadAsync({
        'poiret-one-regular': require('./assets/fonts/PoiretOne-Regular.ttf'),
        'hind-bold': require('./assets/fonts/Hind-Bold.ttf'),
        'hind-light': require('./assets/fonts/Hind-Light.ttf'),
        'hind-medium': require('./assets/fonts/Hind-Medium.ttf'),
        'hind-regular': require('./assets/fonts/Hind-Regular.ttf'),
        'hind-semi-bold': require('./assets/fonts/Hind-SemiBold.ttf'),  
      })
      this.setState({
        ready: true
      })
      
    }catch(err){
      console.log(err);
    }
    
  }
  render() {
    if(!this.state.ready){
      return <Text>...Loading</Text>
    }
    return (
      <Social/>
    );
  }
}

