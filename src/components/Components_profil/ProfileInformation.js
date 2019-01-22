import React from 'react';
import {
    Image, Modal,
    StyleSheet,
    Text, TextInput, TouchableHighlight, TouchableOpacity,
    View,
} from 'react-native';
import {Icon} from 'react-native-elements'
import Colors from "../../constants/Colors";

export default class ProfileInformation extends React.Component {
    static navigationOptions = {
        title: 'ProfileInformation',
    };


    state={
        usernamepPomptVisible:false,
        emailPomptVisible:false
    }
    render() {
        return (
            <View
                style={{flexDirection:'column', justifyContent:'center', alignItems:'center' }}>
                <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center' }}>
                    <TouchableHighlight style = {
                        {
                            position:'absolute',
                            left:'58%',
                            top:-5,
                            width:45,
                            height:45,
                            alignItems:'center',
                            borderRadius:45/2,
                            marginVertical:5,
                            padding:5,
                            justifyContent:'center'}}
                                        onPress={()=> this.props.navigation.navigate('updateUserProfilInfo',
                                            {dataUser:this.props.userInfo, navigation:this.props.navigation})}
                                        >
                        <Icon
                            name='pencil'
                            type='font-awesome'
                            color='black'
                            size={22}
                        />
                    </TouchableHighlight>
                    <Image source={{uri:'https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-9/43680926_1910295159059259_1909104016655122432_n.jpg?_nc_cat=111&_nc_ht=scontent-cdg2-1.xx&oh=cb1ba20a0686e058eb0cd5ba6113e547&oe=5C8BEA24'}}
                           resizeMode="cover"
                           style={{width:150, height:150, marginHorizontal:5, marginVertical:5, borderRadius:150/2}}/>
                </View>
                <View style={styles.containerInformation}>

                    <Text style={{fontSize:17, color:'#000', fontWeight:'bold',paddingHorizontal:5, marginVertical:3}} >
                        {this.props.userInfo.username} </Text>
                   <Text style={{fontSize:17, color:'#000', fontWeight:'bold',paddingHorizontal:5, marginVertical:3}} >
                        {this.props.userInfo.email} </Text>


                    <Text style={{fontSize:15, color:'#c0c0c0', fontWeight:'400',paddingHorizontal:5, marginVertical:3}} >
                        annonces: {this.props.userInfo.nb_annonce} </Text>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerInformation: {
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:5,
    },
});