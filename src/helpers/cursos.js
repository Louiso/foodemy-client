import { urlServer } from "../config/config";

const getCurso = async (_idCurso) => {
  const resp = await fetch(`${urlServer}/curso/${_idCurso}`)
  const respJson = await resp.json()
  return respJson
}


const getCursos = async () => {
  const resp = await fetch(`${urlServer}/curso`)
  const respJson = await resp.json();
  return respJson;
}

export {
  getCursos,
  getCurso
}