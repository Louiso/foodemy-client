import { urlServer } from "../config/config";
import { getToken } from "../helpers/auth";

/* El nombre del usuario deberia obtenerse con el token */
const getDataTema = async (index, curso ) => {
  const token = await getToken();
  const resp = await fetch(`${urlServer}/tema`,{
    method: 'POST',
    headers:{
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
      index : index,
      curso: curso
    })
  })
  const respJson = await resp.json();
  return respJson;
}

export {
  getDataTema
}