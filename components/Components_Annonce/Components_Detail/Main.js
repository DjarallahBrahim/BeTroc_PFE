import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {Icon} from 'react-native-elements'
import Hr from "react-native-hr-component";

import AnnonceDetailBar from "./AnnonceDetailBar";
import FormDetail from "./FormDetail";
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Mapview from "./Mapview";
import Adresselocation from "./Adresselocation";
import Contactbutton from "./Contactbutton";

import Colors from "../../../constants/Colors";

export default class Main extends React.Component {


    render() {
        const {data, typeAnnonce} = this.props;
        return (
            <ParallaxScrollView
                onScroll={() => {
                }}

                headerBackgroundColor="#fff"
                stickyHeaderHeight={STICKY_HEADER_HEIGHT}
                parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
                backgroundSpeed={10}
                renderBackground={() => (

                    <View key="background">
                        <Image source={{
                            uri: data["imgUrl"],
                        }}
                            style={{  width: '100%', height: 270, resizeMode: 'cover' }}
                        />
                        <View style={{
                            position: 'absolute',
                            top: 0,
                            width: window.width,
                            backgroundColor: 'rgba(225,225,225,.4)',
                            height: PARALLAX_HEADER_HEIGHT
                        }}/>
                    </View>
                )}

                renderForeground={() => (

                    <View key="fixed-header" style={styles.fixedSection}>
                        <View>
                        </View>
                        <View style={{height: 50}}>
                            <AnnonceDetailBar etat={data["etat"]} type={typeAnnonce} date={data['date']}/>
                        </View>
                    </View>


                )}
                renderStickyHeader={() => (
                    <View key="sticky-header" style={styles.stickySection}>
                        <Icon
                            name='chevron-left'
                            color="#F44C45"
                            size={50}
                            onPress={() => {
                                this.props.navigation.pop()
                            }}
                            iconStyle={{top: 7}}

                        />
                        <Text style={styles.stickySectionText}
                              onPress={() => this.props.navigation.pop()}>Back</Text>
                    </View>
                )}

            >


                <FormDetail description={data["description"]} title={data["title"]}/>
                <Hr lineColor="#D1D1D1" width={1.3} text="Location" textStyles={{
                    color: '#D1D1D1',
                    fontSize: 18,
                    marginBottom: 10,
                    marginTop: 10
                }}/>
                <Mapview location={data['location']}/>
                <Adresselocation time='25min' adresse={data['adresse']}/>//TODO Calculer le temps
                <Contactbutton idUser={data['idUser']}/>
            </ParallaxScrollView>
        )
    }
}


const PARALLAX_HEADER_HEIGHT = 300;
const STICKY_HEADER_HEIGHT = 70;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    divider: {
        color: '#D1D1D1',
        fontSize: 18,
        marginBottom: 10,
        marginTop: 10
    },
    stickySection: {
        height: STICKY_HEADER_HEIGHT,
        justifyContent: 'flex-start',
        backgroundColor: '#ededed',
        flexDirection: 'row',
        alignItems: "center",

    },
    stickySectionText: {
        color: Colors.tintColor,
        fontSize: 16,
        right: 8,
        fontWeight: "bold",
        top: 7
    },
    fixedSection: {
        flex: 1,
        justifyContent: 'space-between',
    }
});