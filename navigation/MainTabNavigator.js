//react imports
import React from 'react';
import { Platform, StyleSheet, Image} from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

//Components imports
import { AddButton_android } from '../components/Components_TabBar/AddButton_android';
import { AddButton_ios } from '../components/Components_TabBar/AddButton_ios';

import TabBarIcon from '../components/Components_TabBar/TabBarIcon';

//screen imports
import HomeScreen from '../screens/HomeScreen';
import MessageScreen from '../screens/MessageScreen';
import AddAnnonceScreen from '../screens/AddAnnonceScreen';
import ProfilScreen from '../screens/ProfilScreen';
import MapScreen from '../screens/MapScreen';
import AuthentificationScreen from "../screens/AuthentificationScreen";
import Annoncedetailscreen from "../screens/Annoncedetailscreen";
import SingupScreen from "../components/Components_Auth/Components_SingUp/SingupScreen";



//Stack-Navigator creation with navigationOptions

const HomeStack = createStackNavigator({
    Home: HomeScreen,
    AnnonceDetail: 'Annoncedetailscreen',



});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? `ios-home${focused ? '' : '-outline'}` : 'md-home'}
        />
    ),
};

const MessageStack = createStackNavigator({
  Message: MessageScreen,
});

MessageStack.navigationOptions = {
  tabBarLabel: 'Message',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-chatbubbles${focused ? '' : '-outline'}` : 'md-chatbubbles'}
    />
  ),
   };

const AddAnnonceStack = createStackNavigator({
  Plus: AddAnnonceScreen,
});

AddAnnonceStack.navigationOptions = {
        tabBarIcon: ({focused}) => (
            Platform.OS === 'ios' ? <AddButton_ios focused={focused}/> : <AddButton_android focused={focused}/>
        ),

};

const ProfilStack = createStackNavigator({
    Profil: ProfilScreen,
    Auth: AuthentificationScreen,
    Singup: SingupScreen,
});

ProfilStack.navigationOptions =({ navigation }) => {
    let { routeName } = navigation.state.routes[navigation.state.index];
    let navigationOptions = {};

    if (routeName !== 'Profil') {
        navigationOptions.tabBarVisible = false;
    }
    navigationOptions.tabBarIcon= ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? `ios-person${focused ? '' : '-outline'}` : 'md-person'}
        />
    );

    return navigationOptions;
};

const MapScreenStack = createStackNavigator({
    Map: MapScreen,
});

MapScreenStack.navigationOptions = {
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? `ios-map${focused ? '' : '-outline'}` : 'md-map'}
        />
    ),
};

//Creation of Bottom tab navigator and push to it our Stack
export default createBottomTabNavigator(
    {
        HomeStack,
        MessageStack,
        AddAnnonceStack,
        MapScreenStack,
        ProfilStack
    },
    {
        tabBarOptions: {
        showLabel:false,
    },
        style: {
            alignItems: 'center',
            borderTopWidth: 0,

    },

});
