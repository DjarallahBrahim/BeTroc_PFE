import React from 'react';
import {
    Image,
    StyleSheet,
    TouchableHighlight,
    View,Linking
} from 'react-native';
import Hr from "react-native-hr-component";

import AnnonceDetailBar from "./AnnonceDetailBar";
import FormDetail from "./FormDetail";

import Mapview from "./Mapview";
import Adresselocation from "./Adresselocation";
import Contactbutton from "./Contactbutton";

import Colors from "../../../constants/Colors";
import ImageSlider from "react-native-image-slider";
import ParallaxScrollView from "react-native-scrollviewtouchable-expo-paralaex";
import serverURL from '../../../Services/ServerURL';
import SendBirdService from "../../../Services/chatService/SendBirdService";
import ActionSheet from "react-native-actionsheet";
import ProfileService from "../../../Services/ProfileService";
export default class MainTMP extends React.Component {

    constructor(){
        super();
        this.showActionSheet=this.showActionSheet.bind(this)
    }
    generateArrayOfPic(images){
        var imagesArr= [];
        images.map((img, idx)=>{
          imagesArr.push(`${serverURL}/api/downloadImage/`+img.name)

        });
        return imagesArr;
    }

    fetchEmailToContact(id){
        ProfileService.getUserEmail(id).then((email)=>{
            if(email)
                Linking.openURL(`mailto:${email}?subject=Betroc operation`)
            else
                alert("Problème avec notre service de contact")
        })
    }

    handlerStartChat(item){
        console.log('handlerStartChat');
        if(item)
            this.props.navigation.navigate('ChatScreen', {channelUrl: item.url, currentUser:this.props.currentUser})
    }

    showActionSheet = () => {
        //To show the Bottom ActionSheet
        this.ActionSheet.show();
    };

    renderHeader(){
        const {data, typeAnnonce} = this.props;
        const images = this.generateArrayOfPic(data.images);

        return(
            <View key="fixed-header" style={styles.fixedSection}>
                <ImageSlider images={images}
                             customSlide={({index, item, style}) => (
                                 <TouchableHighlight key={index} onPress={() => {
                                     this.props.navigation.navigate("PicDetail", {
                                         picDetail: images[index],
                                         navigation: this.props.navigation
                                     })
                                 }}>
                                     <View style={[style, styles.customSlide]}>
                                         <Image source={{uri: item}} style={{
                                             flex: 1,
                                             width: null,
                                             height: null,
                                         }}
                                                resizeMode="cover"
                                                resizeMethod={'resize'}/>
                                     </View>
                                 </TouchableHighlight>
                             )}
                />
                <View style={{height: 50}}>

                    {
                    typeAnnonce !=='Demande' ?
                        <AnnonceDetailBar etat={data["state"]} user={data['user'].name} type={typeAnnonce} date={data['creationDate']}/>
                        :
                        null
                    }
                </View>
            </View>
        )
    }


    render() {
        const optionArray = [
            'Email',
            'Messagerie (bientôt disponible)',
            'Cancel',
        ];

        const {data, typeAnnonce} = this.props;
        return (
            <ParallaxScrollView
                windowHeight={400}
                navBarTitleColor='black'
                navBarColor='white'
                headerView={this.renderHeader()}
                leftIcon={{name: 'angle-left', color: Colors.tintColor, size: 40, type: 'font-awesome'}}
                leftIconOnPress={() => this.props.navigation.pop()}
            >
                <FormDetail description={data["description"]} title={data["title"]}/>
                <Hr lineColor="#D1D1D1" width={1.3} text="Location" textStyles={{
                    color: '#D1D1D1',
                    fontSize: 18,
                    marginBottom: 10,
                    marginTop: 10
                }}/>
                {
                    typeAnnonce !=='Demande' ?
                        <Mapview location={data['address']}/>
                        :
                        null
                }

                {
                    typeAnnonce !=='Demande' ?
                        <Adresselocation time='25min' adresse={data['address']}/>
                        :
                        null
                }

                <Contactbutton showActionSheet={this.showActionSheet} navigation={this.props.navigation} typeAnnonce={this.props.typeAnnonce} currentUser={this.props.currentUser} user={data['user']}/>
                <ActionSheet
                    ref={o => (this.ActionSheet = o)}
                    title={'Moyen de contact'}
                    options={optionArray}
                    cancelButtonIndex={2}
                    onPress={index => {
                        if(index === 0){
                            this.fetchEmailToContact(data['user'].id);
                        }else if(index === 1){
                            alert("Ce service sera bientôt disponible !");

                            // if (this.props.currentUser>0) {
                            //     SendBirdService.createGroupOneToOne(this.props.currentUser, data['user'].id, `${typeAnnonce}_${data['user'].id}`).then((result)=> this.handlerStartChat(result));
                            //
                            // }else{
                            //     console.log('[DemandeAdType] currente user is null', this.props.currentUser);
                            //     alert('Vous n\'êtes connecté au service de messagerie')
                            // }
                        }else
                            return;
                    }}
                />
            </ParallaxScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    fixedSection: {
        flex: 1,
        justifyContent: 'space-between',
        width: "100%"
    }
});