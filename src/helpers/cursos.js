const getCursos = async () => {
  const resp = await fetch('http://192.168.1.104:4000/curso')
  const respJson = await resp.json();
  return respJson;
}

export {
  getCursos
}