import { createSwitchNavigator } from 'react-navigation'
import Login from '../../screens/Auth/Login';
import Register from '../../screens/Auth/Register';

export default createSwitchNavigator({
  Login: Login,
  Register: Register
},{
  initialRouteName: 'Login'
});