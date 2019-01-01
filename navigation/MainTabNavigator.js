//react imports
import React from 'react';
import {Platform, StyleSheet, Image} from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';

//Components imports
import {Plusbutton} from '../components/Components_TabBar/Plusbutton';
import TabBarIcon from '../components/Components_TabBar/TabBarIcon';

//screen imports
import HomeScreen from '../screens/HomeScreen';
import MessageScreen from '../screens/MessageScreen';
import AddAnnonceScreen from '../screens/AddAnnonceScreen';
import ProfilScreen from '../screens/ProfilScreen';
import MapScreen from '../screens/MapScreen';
import Annoncedetailscreen from "../screens/Annoncedetailscreen";
import SignupScreen from "../screens/SignupScreen";
import LoginScreen from "../screens/LoginScreen";
import PicDetail from "../components/Components_Annonce/Components_Detail/PicDetail";
import Categories from "../components/Components_New_Annonce/Categories";
import CameraAdd from "../components/Components_New_Annonce/Camera";
import MapLocation from "../components/Components_New_Annonce/Map";

const BottomTransition = (index, position, height) => {
    const sceneRange = [index - 1, index, index + 1];
    const outputHeight = [height, 0, 0];
    const transition = position.interpolate({
        inputRange: sceneRange,
        outputRange: outputHeight
    });

    return {
        transform: [{translateY: transition}]
    }
}

const NavigationConfig = () => {
    return {
        screenInterpolator: (sceneProps) => {
            const position = sceneProps.position;
            const scene = sceneProps.scene;
            const index = scene.index;
            const height = sceneProps.layout.initHeight;

            return BottomTransition(index, position, height)
        }
    }
}

//Stack-Navigator creation with navigationOptions

const HomeStack = createStackNavigator({
    Home: HomeScreen,
    AnnonceDetail: Annoncedetailscreen,
    PicDetail: PicDetail


});

HomeStack.navigationOptions = ({navigation}) => {
    let {routeName} = navigation.state.routes[navigation.state.index];
    let navigationOptions = {};

    if (routeName !== 'Home') {
        navigationOptions.tabBarVisible = false;
    }
    navigationOptions.tabBarIcon = ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? `ios-home${focused ? '' : '-outline'}` : 'md-home'}
        />
    );

    return navigationOptions;
};


const MessageStack = createStackNavigator({
    Message: MessageScreen,
});

MessageStack.navigationOptions = {
    tabBarLabel: 'Message',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? `ios-chatbubbles${focused ? '' : '-outline'}` : 'md-chatbubbles'}
        />
    ),
};

const AddAnnonceStack = createStackNavigator({
    Plus: AddAnnonceScreen,
    Categorie: Categories,
    CameraAdd:CameraAdd,
    MapLocation: MapLocation
});

AddAnnonceStack.navigationOptions = ({navigation}) => {
    let {routeName} = navigation.state.routes[navigation.state.index];
    let navigationOptions = {};

    if(routeName === 'CameraAdd' || routeName === 'MapLocation')
        navigationOptions.tabBarVisible = false;

    navigationOptions.tabBarIcon = ({focused}) => (
        <Plusbutton focused={focused}/>
    );
    return navigationOptions;
};

const ProfilStack = createStackNavigator({
    Profil: ProfilScreen,
    Auth: LoginScreen,
    Singup: SignupScreen,
}, {transitionConfig: NavigationConfig});

ProfilStack.navigationOptions = ({navigation}) => {
    let {routeName} = navigation.state.routes[navigation.state.index];
    let navigationOptions = {};

    if (routeName !== 'Profil') {
        navigationOptions.tabBarVisible = false;
    }
    navigationOptions.tabBarIcon = ({focused}) => (
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
    tabBarIcon: ({focused}) => (
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
            showLabel: false,
        },
        style: {
            alignItems: 'center',
            borderTopWidth: 0,

        },

    });