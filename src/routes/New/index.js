import { createSwitchNavigator } from 'react-navigation'
import Intro from './Intro';
import Auth from './Auth';

export default createSwitchNavigator({
  Intro: Intro,
  Auth: Auth
},{
  initialRouteName: 'Intro'
});