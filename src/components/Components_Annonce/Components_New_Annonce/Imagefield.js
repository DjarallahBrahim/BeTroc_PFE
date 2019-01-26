import React from 'react';
import {
    Image,
    StyleSheet, TouchableHighlight,
    View,
} from 'react-native';
import { Icon } from 'react-native-elements'
import closeimg from '../../../../assets/images/close-icon.png'

export default class Imagefield extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imageURI : '',
            takePic: true,
            imagesTaked:[]
        };
        this.returnDataFromCamera=this.returnDataFromCamera.bind(this);
    }


    returnDataFromCamera(uri) {
        if(this.state.imagesTaked.length<3) {
            this.props.handlerImage(uri);
            this.setState({imagesTaked: [...this.state.imagesTaked, uri]});
        }if(this.state.imagesTaked.length === 2)
            this.setState({takePic:false})
    }

    _deleteImg(key){
        this.props.handlerDeletImage(key);
        this.state.imagesTaked.splice(key,1);
        this.setState({takePic:true});
    }
    _navigateToCamera(){
        this.state.takePic ? this.props.navigation.navigate('CameraAdd',{
            navigation:this.props.navigation,
            returnDataFromCamera: this.returnDataFromCamera.bind(this)}): alert('Vous avez atteint le nombre maximum!')
    }

    render() {
        return (
            <View style={styles.container}>

                {
                    this.state.imagesTaked.map((imageURI,key)=>
                            <View key={key} >
                                <TouchableHighlight style={styles.imageStyle} >
                                    <Image style={styles.imagetakedStyle}
                                           source={{uri: imageURI}}/>
                                </TouchableHighlight>

                                <TouchableHighlight style={styles.viewIconCloseStyle}
                                                    onPress={()=> this._deleteImg(key)}>
                                        <Image style={styles.iconCloseStyle}
                                               source={closeimg}/>
                                </TouchableHighlight>
                            </View>
                        )

                }

                {this.state.imagesTaked.length < 3 ?
                    <TouchableHighlight style={styles.viewStyle} onPress={()=>this._navigateToCamera()} >
                        <Icon
                            name='camera'
                            type='evilicon'
                            size={60}
                            color='#000'/>
                </TouchableHighlight>:null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        flexDirection:"row",
        marginTop:15,
    },
    textStyle:{
        fontSize:18,
        color:'#a5a5a5'
    },
    viewStyle:{
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor:"white",
        height:80,
        width:80,
        borderRadius:12},
    viewStyleDisable:{
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor:"#474747",
        height:80,
        width:80,
        borderRadius:12},
    imageStyle:{
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor:"white",
        height:80,
        width:80,
        borderRadius:12,
        marginHorizontal:5},
    imagetakedStyle:{
        height:80,
        width:80,
        borderRadius:12
    },
    viewIconCloseStyle:{
        height:18,
        width:18,
        position: 'absolute',
        right: 8,
        bottom: 59,
        borderRadius:15},
    iconCloseStyle:{
        height:21,
        width:21,
    }
});