import React from 'react';
import {
    StyleSheet,
    Text,
    NetInfo,
    Dimensions,
    View, TouchableHighlight
} from 'react-native';
import {Constants, MapView, Location, Permissions} from 'expo';
import {Icon} from 'react-native-elements'
import Colors from "../../constants/Colors";
import MapAdService from "../../Services/MapAdService";
import RadioGroup from 'react-native-radio-buttons-group';
import SliderAdsComponent from "./SliderAdsComponent";

export default class MapViewScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            mapRegion: {coords: {}},
            status: false,
            location: {
                coords: {
                    latitude: 35.93,
                    longitude: -0.2287205122411251,
                    latitudeDelta: 36.79613959045596,
                    longitudeDelta: 42.08840411156416
                }
            },
            deviceIsOffLine: false,
            place: {
                markerShow: false,
                coordinate: {
                    latitude: '', longitude: ''
                },
                title: '',
                description: ''
            },
            showsUserLocation: false,
            adLocation: {
                latitude: '', longitude: ''
            },
            page: 0,
            exchangeMarkerList: [],
            donationMarkerList: [],
            donationMarker: true,
            exchangeMarker: false,
            typeAnnonce: [
                {
                    label: 'Don',
                    value: "Don",
                    color: 'blue'
                },
                {
                    label: 'Echange',
                    value: "Echange",
                    color: Colors.tintColor
                },

            ]

        }

    };


    _checkGPS = () => {
        return Location.getProviderStatusAsync()
            .then((result) => {
                if (result.locationServicesEnabled !== true) {
                    alert("Please allow Location service ");
                    return false;
                } else
                    return true
            });

    };

    _getLocationAsync = () => {
        this._checkGPS()
            .then((gpsResult) => {
                if (gpsResult) {
                    Permissions.askAsync(Permissions.LOCATION)
                        .then(({status}) => {
                            if (status === 'granted') {
                                Location.getCurrentPositionAsync({})
                                    .then((location) => {
                                        if (location) {
                                            location.coords.latitudeDelta = 0.0922;
                                            location.coords.longitudeDelta = 0.0421;

                                            const adLocation = {};
                                            adLocation.longitude = location.coords.longitude;
                                            adLocation.latitude = location.coords.latitude;
                                            this.setState({
                                                status: true,
                                                showsUserLocation: true,
                                                location,
                                                adLocation
                                            }, this._fetchData);
                                        } else
                                            alert('Nous avons un problème avec votre position')
                                    });

                            }
                        })
                }

            });
    };

    _checkConnectionAndGetLocation = () => {
        NetInfo.getConnectionInfo().then(async (connectionInfo) => {
            if (connectionInfo.type !== "none") {
                this.setState({deviceIsOffLine: false}, this._getLocationAsync);
            } else{

                this.setState({deviceIsOffLine: true}, ()=>alert('Vous êtes hors ligne !'))
            }
        });
    };

    _fetchData() {
        MapAdService.getDonationAds(this.state.adLocation.latitude, this.state.adLocation.longitude, 10, this.state.page)
            .then((response) => {
                if (response)
                    this._generateMarkerDonationList(response);
            });

        MapAdService.getExchageAds(this.state.adLocation.latitude, this.state.adLocation.longitude, 10, this.state.page)
            .then((response) => {
                if (response)
                    this._generateMarkerExchageList(response);
            })
    }

    _generateMarkerDonationList(data) {
        MapAdService.generateMarkersList(data)
            .then((markerList) => {
                if (markerList.length > 0)
                    this.setState({donationMarkerList: markerList})
            })
    }

    _generateMarkerExchageList(data) {
        MapAdService.generateMarkersList(data)
            .then((markerList) => {
                if (markerList.length > 0)
                    this.setState({exchangeMarkerList: markerList})
            })
    }

    onPressRadioButton = (data) => {
        //this.setState({ data });
        let selectedButton = data.find(e => e.selected === true);
        if (selectedButton.value === "Echange")
            this.setState({exchangeMarker: true, donationMarker: false});
        else if (selectedButton.value === "Don")
            this.setState({exchangeMarker: false, donationMarker: true});
    };

    componentDidMount() {
        this._checkConnectionAndGetLocation()
    }


    openAnnonceDon(id) {
        MapAdService.getDonationAdsByID(id).then((data) => {
            if (data) {
                this.props.navigation.navigate('AnnonceDetail',
                    {
                        'navigation': this.props.navigation, 'typeAnnonce': 'Don',
                        'data': data
                    })
            }
        })
    }

    openAnnonceEchange(id) {
        MapAdService.getExchangeAdsByID(id).then((data) => {
            if (data) {
                this.props.navigation.navigate('AnnonceDetail',
                    {
                        'navigation': this.props.navigation, 'typeAnnonce': 'Echange',
                        'data': data
                    })
            }
        })
    }







    render() {
        let regions = {};
        return (
            <View style={{flex: 1, justifyContent:'center'}}>
                {
                    this.state.deviceIsOffLine ?
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Text>Vous êtes hors ligne !</Text>
                        </View>
                        :
                        this.state.showsUserLocation ?
                            <View style={{flex: 1}}>
                                <MapView
                                    style={{flex: 1}}
                                    zoomEnabled={true}
                                    zoomControlEnabled={true}
                                    scrollEnabled={true}
                                    showsUserLocation={this.state.showsUserLocation}
                                    region={{
                                        latitude: this.state.location.coords.latitude,
                                        longitude: this.state.location.coords.longitude,
                                        latitudeDelta: this.state.location.coords.latitudeDelta,
                                        longitudeDelta: this.state.location.coords.longitudeDelta,

                                    }}
                                    onRegionChangeComplete={(region) => {
                                        regions = region;

                                    }}
                                >

                                    {this.state.exchangeMarker ? this.renderExchangeMarker() : null}
                                    {this.state.donationMarker ? this.renderDonationMarker() : null}
                                </MapView>
                                <TouchableHighlight
                                    underlayColor={'transparent'}
                                    style={styless.locationButton}
                                    onPress={() => this._getLocationAsync()}>
                                    <Icon
                                        name='location-arrow'
                                        type='font-awesome'
                                        size={25}
                                        color='#4f90f7'/>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    style={!this.state.sliderAds ? styless.valideButtonEnabled : styless.valideButtonDisabled}
                                    underlayColor={'transparent'}
                                    onPress={()=> this.setState({sliderAds: !this.state.sliderAds})}>
                                    <Text style={{
                                        fontSize: 18,
                                        fontWeight: '500',
                                        paddingHorizontal: 22,
                                        paddingVertical: 8,
                                        color: 'white'
                                    }}> {this.state.sliderAds ? "Cacher la list" : "Afficher une liste"} </Text>
                                </TouchableHighlight>
                                <View
                                    style={styless.indication}
                                    underlayColor={'transparent'}>
                                    <RadioGroup
                                        radioButtons={this.state.typeAnnonce}
                                        onPress={data => this.onPressRadioButton(data)}
                                        flexDirection='row'
                                    />
                                </View>
                                {this.state.sliderAds ?
                                    <SliderAdsComponent exchangeMarker={this.state.exchangeMarker}
                                                        exchangeMarkerList={this.state.exchangeMarkerList}
                                                        donationMarkerList={this.state.donationMarkerList} />: null}
                            </View> :
                            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                <Text>Téléchargement ...</Text>
                            </View>

                }
            </View>

        );
    }

    renderDonationMarker() {
        return this.state.donationMarkerList.map(marker => (
            <MapView.Marker
                key={marker.id}
                coordinate={marker.latlng}
                title={marker.title}
                description={marker.category}
                pinColor={'blue'}
                onCalloutPress={() => {
                    this.openAnnonceDon(marker.id);
                }}
            />
        ));
    }

    renderExchangeMarker() {
        return this.state.exchangeMarkerList.map(marker => (
            <MapView.Marker
                key={marker.id}
                coordinate={marker.latlng}
                title={marker.title}
                description={marker.category}
                pinColor={Colors.tintColor}
                onCalloutPress={() => {
                    this.openAnnonceEchange(marker.id);
                }}
            />
        ));
    }

}

const styless = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
    },
    mapContainer: {
        justifyContent: 'center',
        position: 'absolute',
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width
    },
    locationButton: {
        position: 'absolute',
        top: '13%',
        right: 5,
        bottom: 0,
        backgroundColor: 'rgba(250, 250, 250,1)',
        width: 38, height: 38,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 1,
    },
    valideButtonEnabled: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: 12,
        backgroundColor: '#2792b6',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 1,
    },
    valideButtonDisabled: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: 12,
        backgroundColor: '#625962',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 1,
    },
    indication: {
        position: 'absolute',
        alignSelf: 'center',
        top: 5,
        backgroundColor: 'rgba(250, 250, 250,1)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 1,
    }
});