import { createDrawerNavigator } from 'react-navigation'

import Inicio from './Inicio';
import Profile from './Profile';
import LogOut from './LogOut';

export default createDrawerNavigator({
  Inicio: Inicio,
  Profile: Profile,
  LogOut: LogOut
});
