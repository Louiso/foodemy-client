import { AsyncStorage } from 'react-native'
import base64 from 'base-64';

const login = async (user) =>{
  console.log(user);
  try{
    const resp = await fetch('http://192.168.1.104:4000/auth/login',{
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
    console.log(respJson)
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
    
  }catch(e){
    console.log(e);
  }
  
}

const logOut = async () => {
  try{
    await AsyncStorage.removeItem('token');
  }catch(e){
    console.log(e);
  }
}

const register = async (user) => {
  try{
    const resp = await fetch('http://192.168.1.104:4000/auth/register',{
        method: 'POST',
        headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: user.username,
          email: user.email,
          password: user.password
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
  }catch(e){
    console.log(e);
  }
  
}
const getCurrentUser = async () => {
  const token = await AsyncStorage.getItem('token');
  const parts = token.split('.');
  let decodedToken = base64.decode(parts[1]);
  decodedToken = JSON.parse(decodedToken);
  return decodedToken.user;
}
export {
  login,
  register,
  logOut,
  getCurrentUser
}