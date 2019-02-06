import React from 'react';
import {
    FlatList,
    Image, Linking,
    ScrollView,
    StyleSheet,
    Text, TouchableHighlight, TouchableOpacity,
    View,
} from 'react-native';
import Colors from "../../constants/Colors";
import SendBirdService from "../../Services/chatService/SendBirdService";
import ActionSheet from "react-native-actionsheet";
import serverURL from '../../Services/ServerURL'
import ProfileService from "../../Services/ProfileService";


export default class DemandeAdType extends React.Component {


    constructor(props) {
        super(props);
        this.state={
            categorie:this.props.categorie,
            idUser:0,
        };
        this.handlerStartChat=this.handlerStartChat.bind(this);
    }

    static jsUcfirst(string)
    {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // componentDidMount(){
    //     fetchDataAd.getUserAuth().then((idUser)=> {
    //         this.setState({idUser:idUser})
    //     })
    // }

    fetchEmailToContact(id){
        ProfileService.getUserEmail(id).then((email)=>{
            if(email)
                Linking.openURL(`mailto:${email}?subject=Betroc operation`)
            else
                alert("Problème avec notre service de contact")
        })
    }

    handlerStartChat(item){
        this.props.navigation.navigate('ChatScreen', {channelUrl: item.url, currentUser:this.props.currentUser})
    }

    showActionSheet = () => {
        //To show the Bottom ActionSheet
        this.ActionSheet.show();
    };

    render() {
        const categorie = this.props.categorie;
        const {navigation,typeAnnonce} = this.props;
        return (
                Object.keys(categorie).map((title, index) =>
                categorie[title].length > 0 ?
                    <View key={index} style={{flex: 1, paddingHorizontal: 10}}>
                        {this.renderCategryTitleRow(title, navigation, typeAnnonce)}
                        <FlatList
                            data={categorie[title]}
                            renderItem={({item, index}) =>
                                this.renderDemandeAdTypeView(index, item, typeAnnonce)}
                            listKey={(item2, index) => 'D' + index.toString()}
                            keyExtractor={(item, index) => 'D' + index.toString()}>
                        </FlatList>
                    </View> : null

                )

            )
    }

    renderCategryTitleRow(title, navigation, typeAnnonce) {
        return <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 20, fontWeight: '500', marginTop: 5, color: '#9a9c9e'}}>
                {title}
            </Text>
            <TouchableHighlight style={{
                borderRadius: 8,
                paddingHorizontal: 15,
                backgroundColor: Colors.tintColor,
                marginTop: 5,
                marginRight: 5,
                justifyContent: 'center',
                alignItems: 'center'
            }}
                                onPress={() => navigation.navigate("ShowMoreScreen",
                                    {
                                        category: title,
                                        typeAnnonce: typeAnnonce,
                                        navigation: navigation,
                                        currentUser:this.props.currentUser
                                    })}>
                <Text
                    style={{
                        textAlign: 'center',
                        color: 'white',
                        fontSize: 16,
                        fontWeight: '400',

                    }}>
                    Plus
                </Text>
            </TouchableHighlight>
        </View>;
    }

    renderDemandeAdTypeView(index, item, typeAnnonce) {
        var optionArray = [
            'Email',
            'Messagerie (bientôt disponible)',
            'Cancel',
        ];
        return <View style={styles.container} key={index}>
            <TouchableOpacity
                style={{flex: 3}}
                onPress={this.showActionSheet}>
            <View style={{flex: 3}}>
                <Text style={{
                    fontSize: 17,
                    fontWeight: '500',
                    color: '#1c1c1c'
                }}>{item.title.toLowerCase()}</Text>
                <Text style={{
                    fontSize: 17,
                    fontWeight: '400',
                    color: '#b0b0b0'
                }}>{DemandeAdType.jsUcfirst(item.user.name)}</Text>
                <Text style={{
                    fontSize: 14,
                    fontWeight: '300',
                    color: '#c3c3c3'
                }}>{item.description}</Text>
            </View>
            </TouchableOpacity>
            <View style={{
                flex: 1,
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '90%'
            }}>
                <View/>
                <TouchableOpacity
                    style={{
                        borderRadius: 30,
                        backgroundColor: '#ebebeb',
                        width: 60,
                        height: 60,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    onPress={this.showActionSheet}>
                    <Image
                        source={{uri: `${serverURL}/api/downloadImage/${item.subCategory.imgName}`}}
                        style={{width: 45, height: 45}}
                        resizeMode="cover"
                        resizeMethod={'resize'}
                    />
                </TouchableOpacity>
            </View>
            <ActionSheet
                ref={o => (this.ActionSheet = o)}
                title={'Moyen de contact'}
                options={optionArray}
                cancelButtonIndex={2}
                onPress={index => {
                    if(index === 0){
                       this.fetchEmailToContact(item.user.id)
                    }else if(index === 1){
                        alert("Ce service sera bientôt disponible !")
                        // if (this.props.currentUser>0) {
                        //     SendBirdService.createGroupOneToOne(this.props.currentUser, item.user.id, `${typeAnnonce}_${item.id}`).then(this.handlerStartChat);
                        //
                        // }else{
                        //     console.log('[DemandeAdType] currente user is null', this.props.currentUser)
                        //     alert('Vous n\'êtes connecté au service de messagerie')
                        // }
                    }else
                        return;
                }}
            />
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'row',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems:'center',
        paddingHorizontal:5,
        paddingVertical:5,
        borderRadius:15,
        marginHorizontal:8,
        marginVertical:10,
        shadowOffset: {width: 0.5, height: 0.5},
        shadowColor: 'black',
        elevation: 2.5,

    }
});