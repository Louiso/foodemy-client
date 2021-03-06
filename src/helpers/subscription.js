import { urlServer } from "../config/config";

const getSubscripcion = async (_idUser, _idCurso) => {

  const resp = await fetch(`${urlServer}/subscripcion/${_idUser}/${_idCurso}`)
  const respJson = await resp.json();
  return respJson;
}

const getSubscripcions = async(_idUser) => {
  const resp = await fetch(`${urlServer}/subscripcion/${_idUser}`)
  const respJson = await resp.json();
  return respJson;
}

const postSubscripcion = async (_idUser, _idCurso ) => {
  const resp = await fetch(`${urlServer}/subscripcion`,{
    method: 'POST',
    headers:{
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      _idUser: _idUser,
      _idCurso: _idCurso
    })
  })
  const respJson = await resp.json();
  return respJson;
}

const updateTemaActual = async (_idSubscripcion, index) => {
  try{
    const resp = await fetch(`${urlServer}/subscripcion/${_idSubscripcion}`,{
      method: 'PUT',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        temaActual: index
      })
    })
    const respJson = await resp.json();
    return respJson;
  }catch(err){
    console.log(err);
  }
}

const updateLlavesObtenidas = async (_idSubscripcion, llavesObtenidas) => {
  const resp = await fetch(`${urlServer}/subscripcion/llavesObtenidas/${_idSubscripcion}`,{
    method: 'PUT',
    headers:{
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      llavesObtenidas: llavesObtenidas
    })
  })
  const respJson = await resp.json();
  return respJson;
}

export {
  getSubscripcion,
  postSubscripcion,
  updateTemaActual,
  getSubscripcions,
  updateLlavesObtenidas
}