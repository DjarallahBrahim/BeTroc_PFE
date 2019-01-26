import React from 'react';
import {Text, View, TouchableHighlight, Image, StyleSheet} from 'react-native';
import {Camera, Permissions, ImagePicker} from 'expo';
import Colors from "../../../constants/Colors";
import Layout from "../../../constants/Layout";
import {Icon} from "react-native-elements";
export default class CameraAdd extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            focused: false,
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            imageURI : '',
            takedPic: false,
            spinner:false
        }
    }




    openCamera(){
        Permissions.askAsync(Permissions.CAMERA_ROLL).then(()=>{
            ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
            }).then((photo)=>{
                if (!photo.cancelled) {
                    this.setState({takedPic: true, imageURI: photo.uri});
                }
            });
        });
    }

    openGallery(){
        Permissions.askAsync(Permissions.CAMERA_ROLL).then(()=>{
            ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
            }).then((photo)=>{
                if (!photo.cancelled) {
                    this.setState({takedPic: true, imageURI: photo.uri});
                }
            });
        });
    }

    componentDidMount() {
        Permissions.askAsync(Permissions.CAMERA).then(({status})=> this.setState({hasCameraPermission: status === 'granted'}))
    }

    _savePic(returnDataFromCamera, navigation) {
        this.setState({takedPic: false});

        returnDataFromCamera(this.state.imageURI);
        navigation.pop()
    }

    render() {
        const navigation = this.props.navigation.getParam("navigation", {});
        const returnDataFromCamera = this.props.navigation.getParam("returnDataFromCamera", {});
        const {hasCameraPermission} = this.state;
        if (hasCameraPermission === null) {
            return <View/>;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (

                    this.state.takedPic?
                        <View  style={{
                            flex:1,
                            position: 'relative'}}>
                            <Image resizeMode={"contain"}
                                   style={{width: Layout.window.width, height: Layout.window.height}}
                                   source={{uri: this.state.imageURI}}/>
                            <View style={styles.buttonAction}>
                                <TouchableHighlight style={styles.deleteButton}
                                                    onPress={() => this.setState({takedPic: false})}
                                >
                                    <Text style={{color:'white', fontWeight: '500',fontSize:15, paddingHorizontal:5}}>Supprimer</Text>
                                </TouchableHighlight>
                                <TouchableHighlight style={styles.saveButton}
                                                    onPress={() => {
                                                        this._savePic(returnDataFromCamera, navigation);
                                                    }}
                                >
                                    <Text style={{color:'black', fontWeight: '500',fontSize:15, paddingHorizontal:5}}>Sauvegarder</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                        :
                        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                            <Icon
                                name='camera'
                                type='evilicon'
                                size={180}
                                color='#000'/>
                        <View style={{flexDirection:'row',  marginTop:20, marginHorizontal:10}}>
                            <TouchableHighlight style={{
                                flex:0.5,
                                alignItems:'center',
                                backgroundColor: Colors.tintColor,
                                marginHorizontal:5,
                                borderRadius: 10}} onPress={() => this.openCamera()}>

                                <Text style={{color: 'white',
                                    fontWeight: 'bold',
                                    backgroundColor: 'transparent',
                                    marginVertical: 15,
                                    marginHorizontal: 10}}> Camera </Text>
                            </TouchableHighlight>

                            <TouchableHighlight style={{
                                flex:0.5,
                                alignItems:'center',
                                backgroundColor: 'white',
                                marginHorizontal:5,
                                borderRadius: 10}}
                                                onPress={() => this.openGallery()}>

                                <Text style={{color: 'black',
                                    fontWeight: 'bold',
                                    backgroundColor: 'transparent',
                                    marginVertical: 15,
                                    marginHorizontal: 10}}> Vos photos </Text>
                            </TouchableHighlight>
                        </View>
                        </View>

            );
        }
    }
}
const styles = StyleSheet.create({
    saveButton:{
        paddingHorizontal:20,
        backgroundColor:'white',
        paddingVertical:10,
        borderColor:'white',
        borderWidth:0.5,
        borderRadius:10,
        flex:0.4,
        alignItems:'center'
    },
    deleteButton:{
        paddingHorizontal:20,
        backgroundColor:Colors.tintColor,
        paddingVertical:10,
        borderColor:'transparent',
        borderWidth:0.5,
        borderRadius:10,
        flex:0.4,
        alignItems:'center'
    },
    buttonAction:{
        position:'absolute',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
        bottom: 0,
        left: 0,
        right: 0
    },
    cameraView:{
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        marginVertical: 15

    }
});