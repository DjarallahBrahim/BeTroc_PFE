import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import MainTMP from "../components/Components_Annonce/Components_Detail/MainTMP";
import SendBirdService from "../Services/chatService/SendBirdService";
import fetchDataAd from "../Services/fetchDataAd";

export default class Annoncedetailscreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    state={
        currentUser:0
    }
    componentDidMount(){
        return fetchDataAd.getUserAuth().then((idUser) => {
            if (idUser){
                this.setState({currentUser:idUser})
            }else
                consol.log('no user available')
        });
    }

    render() {
        const data = this.props.navigation.getParam("data", {});
        const navigation = this.props.navigation.getParam("navigation", {});
        const typeAnnonce = this.props.navigation.getParam("typeAnnonce", {});
        return (
            <View style={styles.container}>
                <MainTMP currentUser={this.state.currentUser} typeAnnonce={typeAnnonce} navigation={navigation} data={data}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});