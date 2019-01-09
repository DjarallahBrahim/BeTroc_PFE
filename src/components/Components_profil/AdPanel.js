import React from 'react';
import {
    Dimensions, FlatList,
    StyleSheet,
    Text, TouchableHighlight,
    View,Animated
} from 'react-native';
import { Icon } from 'react-native-elements'

export default class AdPanel extends React.Component {

    constructor() {
        super();
        this.state = {

            animation   : new Animated.Value(),
            minHeight:'',
            maxHeight:'',


        };
        this._setMaxHeight= this._setMaxHeight.bind(this)

    }

    generateTitleArray(ad){
        let titleArray = [];
        ad.map((ad, index) => {
            titleArray.push(ad.title);
        });

        titleArray.length ===0 ? titleArray.push("Aucune annonce"):null;

        return titleArray;
    }

    _keyExtractor = (item, index) => index.toString();

    _setMinHeight(event){
        if(this.state.minHeight === '')
        {
            this.setState({
                minHeight : event.nativeEvent.layout.height,
                animation: new Animated.Value(event.nativeEvent.layout.height),
            });
        }
    }

    _setMaxHeight(event,length)
    {
        if (this.state.maxHeight === '')
        {
            if(length===0)
                length+=2;
            this.setState({
                maxHeight: event.nativeEvent.layout.height*length,
            });
        }
    }

    toggle(){
        //Step 1
        let initialValue    = this.state.expanded? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
            finalValue      = this.state.expanded? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

        this.setState({
            expanded : !this.state.expanded  //Step 2
        });

        this.state.animation.setValue(initialValue);  //Step 3
        Animated.spring(     //Step 4
            this.state.animation,
            {
                toValue: finalValue
            }
        ).start();  //Step 5
    }

    render() {
        return (
            <Animated.View style={[styles.container2,{height: this.state.animation}]} >

                <View style={styles.titleContainer} onLayout={this._setMinHeight.bind(this)}>
                    <TouchableHighlight onPress={this.toggle.bind(this)}
                                        style={{flex:1,backgroundColor:'white', borderRadius:5,
                                            borderWidth:0.7, borderColor:'#c0c0c0',
                                            paddingVertical:5}}
                                        underlayColor="#ede">
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingHorizontal:8}}>
                            <Text style={{fontSize:14, fontWeight:'500'}}> {this.props.type}: {this.props.size}</Text>
                            <Icon
                                name='angle-down'
                                type='font-awesome'
                                size={25}
                            />
                        </View>
                    </TouchableHighlight>
                </View>

                <View style={{padding     : 10,
                    paddingTop : 0}}
                      onLayout={(event)=> this._setMaxHeight(event,this.props.data.length)}>
                    <FlatList
                        data={this.generateTitleArray(this.props.data)}
                        renderItem={({item,index}) =>
                            <TouchableHighlight onPress={()=> {
                                if(item !=='Aucune annonce')
                                    this.props.navigation.navigate('AnnonceDetail',
                                        {'navigation':this.props.navigation,'typeAnnonce': 'Demande',
                                            'data':this.props.data[index]})
                            }}
                                                style={{marginVertical:5, paddingHorizontal:5}}
                                                underlayColor="#ede">
                                <Text style={{fontSize:13, color:'#000'}}>{item}</Text>
                            </TouchableHighlight>}
                        keyExtractor={this._keyExtractor}
                    />
                </View>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'column',
        marginHorizontal:5,
        marginVertical:30
    },
    container2: {
        backgroundColor: 'white',
        overflow:'hidden',
        marginVertical:10
    },titleContainer : {
        flexDirection: 'row'
    },
});