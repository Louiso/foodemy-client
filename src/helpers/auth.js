import { AsyncStorage } from 'react-native'
import base64 from 'base-64';
import { urlServer } from '../config/config';

const login = async (user) =>{
  console.log('HELPERS/AUTH',user);
  const resp = await fetch(`${urlServer}/auth/login`,{
      method: 'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password
      })
    })
  const respJson = await resp.json()
  console.log('HELPERS/AUTH',respJson)
  if(respJson.ok){
    await AsyncStorage.setItem('token', respJson.token)
    return {
      ok: true,
      message: 'Login Completado'
    }
  }else{
    return {
      ok: false,
      message: respJson.err
    }
  }
}

const logOut = async () => {
  await AsyncStorage.removeItem('token');
}

const register = async (user) => {
  
  const resp = await fetch(`${urlServer}/auth/register`,{
      method: 'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: user.username,
        email: user.email,
        password: user.password,
        altura: user.altura,
        edad: user.edad,
        peso: user.peso,
        sexo: user.sexo
      })
    })

  const respJson = await resp.json();
  
  if(respJson.ok){
    await AsyncStorage.setItem('token', respJson.token)
    return {
      ok: true,
      message: 'Registro Completado'
    }
  }else{
    return {
      ok: false,
      message: resp.err
    }
  }
}
const getCurrentUser = async () => {
  const token = await AsyncStorage.getItem('token');
  const parts = token.split('.');
  let decodedToken = base64.decode(parts[1]);
  decodedToken = JSON.parse(decodedToken);
  return decodedToken.user;
}

const getToken = async () => {
  const token = await AsyncStorage.getItem('token');
  return token;
}
export {
  login,
  register,
  logOut,
  getCurrentUser,
  getToken
}