import React from 'react';
import {
    Image,
    StyleSheet,
    TouchableHighlight,
    View,
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

export default class MainTMP extends React.Component {

    generateArrayOfPic(images){
        var imagesArr= [];
        images.map((img, idx)=>{
          imagesArr.push('http://vps628622.ovh.net/api/downloadImage/'+img.name)
        })
        return imagesArr;
    }
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
                                             resizeMode: 'cover'
                                         }}/>
                                     </View>
                                 </TouchableHighlight>
                             )}
                />
                <View style={{height: 50}}>

                    {
                    typeAnnonce !=='Demande' ?
                        <AnnonceDetailBar etat={data["state"]} type={typeAnnonce} date={data['creationDate']}/>
                        :
                        null
                    }
                </View>
            </View>
        )
    }
    render() {
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

                <Contactbutton idUser={data['user']}/>
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