import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Constants, MapView, Permissions, Location} from 'expo';

export default class Mapview extends React.Component {
    state = {
        mapRegion: {
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0.002,
            longitudeDelta: 0.001,
        },
        hasLocationPermissions: false,
        locationResult: null
    };

    render() {
        return (
            <View style={styles.container}>

                    <MapView
                        zoomEnabled={true}
                        zoomControlEnabled={false}
                        scrollEnabled={false}
                        style={{alignSelf: 'stretch', height: 300}}
                        region={this.state.mapRegion}
                    >
                        <MapView.Marker
                            coordinate={this.state.mapRegion}
                            title="Marker"
                            description="Marker"
                        />
                        <MapView.Circle
                            center={this.state.mapRegion}
                            radius={50}
                            strokeColor="red"
                            fillColor='rgba(225, 8, 14, 0.2)'/>
                    </MapView>
            </View>
        );
    }

    componentDidMount(){
        Location.geocodeAsync(this.props.location).then((location)=> {
            this.setState({mapRegion:
                    {
                        latitude:location[0].latitude,
                        longitude:location[0].longitude,
                        latitudeDelta: 0.002,
                        longitudeDelta: 0.001,
                    }
            });
            console.log(this.state)
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        marginBottom:20
    },

});
