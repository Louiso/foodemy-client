import { urlServer } from "../config/config";

const getTema = async (_idTema) => {
  const resp = await fetch(`${urlServer}/tema/${_idTema}`)
  const respJson = await resp.json();
  return respJson;
}

export {
  getTema
}