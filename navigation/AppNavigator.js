import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthentificationScreen from "../screens/AuthentificationScreen";
import SingupScreen from "../components/Components_Auth/Components_SingUp/SingupScreen";

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator,
    Auth: AuthentificationScreen,
    Singup: SingupScreen,
});