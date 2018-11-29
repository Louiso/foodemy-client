import { urlServer } from "../config/config";

const getCiclos = async () => {

  const resp = await fetch(`${urlServer}/ciclo`)
  const respJson = await resp.json();
  return respJson;
}

export {
  getCiclos
}