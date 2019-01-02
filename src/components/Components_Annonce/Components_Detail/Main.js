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

export default class Main extends React.Component {


    renderHeader(){
        const {data, typeAnnonce} = this.props;
        const images = [
            data["imgUrl"],
            data["imgUrl"],
            data["imgUrl"],
            data["imgUrl"],
        ];
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
                    <AnnonceDetailBar etat={data["etat"]} type={typeAnnonce} date={data['date']}/>
                </View>
            </View>
        )
    }
    render() {
        const {data} = this.props;
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
                <Mapview location={data['location']}/>
                <Adresselocation time='25min' adresse={data['adresse']}/>
                <Contactbutton idUser={data['idUser']}/>
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