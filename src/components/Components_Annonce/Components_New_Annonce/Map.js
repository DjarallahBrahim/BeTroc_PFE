import React from 'react';
import {
    StyleSheet,
    Text,
    NetInfo,
    Dimensions,
    View, TouchableHighlight
} from 'react-native';
import {Constants, MapView, Location, Permissions} from 'expo';
import { Icon } from 'react-native-elements'
import Colors from "../../../constants/Colors";

export default class MapLocation  extends React.Component {

    constructor(){
        super();
        this.state = {
            mapRegion: { coords:{}},
            status: false,
            location: {coords: { latitude: 35.93, longitude: -0.2287205122411251, latitudeDelta: 36.79613959045596, longitudeDelta: 42.08840411156416}},
            deviceIsOffLine:false,
            place:{
                markerShow:false,
                coordinate:{
                    latitude: '', longitude: ''
                },
                title:'',
                description:''
            },
            showsUserLocation:false,
            adLocation:{
                    latitude: '', longitude: ''
                }

        }

        };

     async componentWillMount() {
       await NetInfo.getConnectionInfo().then(async (connectionInfo) => {
            if(connectionInfo.type !== "none"){
               await this._checkGPS();
                this.setState({deviceIsOffLine: false});
            }else
                this.setState({deviceIsOffLine: true})
        });

    }


    _checkGPS = async() => {
        let result = await Location.getProviderStatusAsync();
        if(result.locationServicesEnabled !== true)
            alert("Please allow Location service ");
    };

    _getLocationAsync = async () => {

        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        if (status === 'granted') {
            let location = await Location.getCurrentPositionAsync({});
            location.coords.latitudeDelta = 0.0922;
            location.coords.longitudeDelta = 0.0421;

            const adLocation = {};
            adLocation.longitude = location.coords.longitude;
            adLocation.latitude = location.coords.latitude;
            this.setState({status:true, showsUserLocation:true, location,adLocation});
        }
    };


    addMarker = (evt,region) => {
            const {coordinate} = evt.nativeEvent;
            if( Object.keys(region).length !== 0 && region.constructor === Object) {
                this.setState({
                    place: {
                        markerShow: true,
                        coordinate,
                        title: 'Find Pusheen!',
                        description: 'Pusheen has been dropped at this location.'
                    },
                    location: {
                        coords: region
                    },
                    status:true,
                    adLocation:coordinate
                });
            }else{
                this.setState({
                    place: {
                        markerShow: true,
                        coordinate,
                        title: 'Find Pusheen!',
                        description: 'Pusheen has been dropped at this location.'
                    },
                    status:true,
                    adLocation:coordinate
                });
            }


    };


    render() {
        const locationHandler = this.props.navigation.getParam("locationHandler", {});
        const navigation = this.props.navigation.getParam("navigation", {});

        regions = {};
        return (
            <View style={{flex:1}}>
                {
                    this.state.deviceIsOffLine?
                        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                            <Text>Your device is offline</Text>
                        </View>
                        :
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
                            onLongPress={(event)=> this.addMarker(event,regions)}
                            onRegionChangeComplete={(region) =>{
                                 regions =  region;

                            }}
                              >


                                {
                                   this.state.place.markerShow?
                                       <MapView.Marker
                                        coordinate={this.state.place.coordinate}
                                        title={this.state.place.title}
                                        description={this.state.place.description}
                                        />: null
                                }
                             </MapView>
                            <TouchableHighlight
                                underlayColor={'transparent'}
                                style={styles.locationButton}
                                onPress={()=> this._getLocationAsync()}>
                                <Icon
                                    name='location-arrow'
                                    type='font-awesome'
                                    size={25}
                                    color='#4f90f7'/>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={this.state.status ? styles.valideButtonEnabled: styles.valideButtonDisabled}
                                onPress={async ()=> {
                                    if(this.state.status){
                                        const geoLocationRevers = await Location.reverseGeocodeAsync(this.state.adLocation);
                                        const address = `${geoLocationRevers[0].street}, ${geoLocationRevers[0].city},${geoLocationRevers[0].postalCode}, ${geoLocationRevers[0].region},${geoLocationRevers[0].country}`
                                        locationHandler(address, this.state.adLocation);
                                        navigation.pop();
                                    }else
                                        alert('Aucune adresse sélectionnée')
                                }}
                                underlayColor={'transparent'}>
                                <Text style={{fontSize:20, fontWeight:'500', paddingHorizontal:25, paddingVertical:8, color:'white'}}> Valider </Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={styles.indication}
                                underlayColor={'transparent'}>
                                <Text style={{fontSize:15, fontWeight:'300', paddingHorizontal:10, paddingVertical:5, color:'#7f7f81'}}> Long clique pour sélectionner l'adresse </Text>
                            </TouchableHighlight>
                        </View>
                }
            </View>

        );
    }
}

const styles = StyleSheet.create({
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
    locationButton:{
        position: 'absolute',
        top:'13%',
        right:5,
        bottom:0,
        backgroundColor:'rgba(250, 250, 250,1)',
        width:38, height:38,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 1,},
    valideButtonEnabled:{
        position: 'absolute',
        alignSelf: 'center',
        bottom:12,
        backgroundColor: Colors.tintColor,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 1,
    },
    valideButtonDisabled:{
        position: 'absolute',
        alignSelf: 'center',
        bottom:12,
        backgroundColor: '#625962',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 1,
    },
    indication:{
        position: 'absolute',
        alignSelf: 'center',
        top:5,
        backgroundColor:'rgba(250, 250, 250,1)',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 1,}
});