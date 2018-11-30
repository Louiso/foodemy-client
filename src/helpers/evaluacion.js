import { urlServer } from "../config/config";

const getEvaluacion = async (_idSubscripcion, _idTema) => {
  const resp = await fetch(`${urlServer}/evaluacion/${_idSubscripcion}/${_idTema}`)
  const respJson = await resp.json();
  return respJson;
}

const postEvaluacion = async (_idSubscripcion, _idTema, respuesta ) => {
  const resp = await fetch(`${urlServer}/evaluacion`,{
    method: 'POST',
    headers:{
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      _idSubscripcion: _idSubscripcion,
      _idTema: _idTema,
      respuesta: respuesta
    })
  })
  const respJson = await resp.json();
  return respJson;
}

const updateRespuestaEvaluacion = async (_idEvaluacion, respuesta) => {
  const resp = await fetch(`${urlServer}/evaluacion/${_idEvaluacion}`,{
    method: 'PUT',
    headers:{
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      respuesta: respuesta
    })
  })
  const respJson = await resp.json();
  return respJson;
}

export {
  getEvaluacion,
  postEvaluacion,
  updateRespuestaEvaluacion
}