import { urlServer } from "../config/config";


const getUser = async (_idUser) => {
  const resp = await fetch(`${urlServer}/user/${_idUser}`)
  const respJson = await resp.json();
  return respJson;
}

const updateLlavesUser = async (_idUser, premio) => {
  try{
    const resp = await fetch(`${urlServer}/user/${_idUser}`,{
      method: 'PUT',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        premio: premio
      })
    })
    const respJson = await resp.json();
    return respJson;
  }catch(err){
    console.log(err);
  }
}

export {
  updateLlavesUser,
  getUser
}