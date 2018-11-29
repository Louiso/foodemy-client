import { urlServer } from "../config/config";


const getCursos = async () => {
  const resp = await fetch(`${urlServer}/curso`)
  const respJson = await resp.json();
  return respJson;
}

export {
  getCursos
}