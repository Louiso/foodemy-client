import React from 'react';

import PreguntaDieta from './src/screens/Intro/PreguntaDieta';
import PreguntaEsfuerzo from './src/screens/Intro/PreguntaEsfuerzo';
import PresentaMetabot from './src/screens/Intro/PresentaMetabot';
import Login from './src/screens/Auth/Login';
import FormData from './src/screens/Intro/FormData';
import Register from './src/screens/Auth/Register';
import Cursos from './src/screens/App/Cursos/Cursos';
import Tema from './src/screens/App/Cursos/Tema';
import Social from './src/screens/App/Social/Social';
import Muro from './src/screens/App/Muro/Muro';

import Routes from './src/routes/index'

export default class App extends React.Component {
  render() {
    return (
      <Routes/>
    );
  }
}

