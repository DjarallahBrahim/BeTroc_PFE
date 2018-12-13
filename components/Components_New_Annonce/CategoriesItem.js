import React from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

export default class CategoriesItem extends React.Component {


    constructor(props){
        super(props);

    }
    render() {
        var data = this.props.item;
        console.log(data.subCatg)
        var imgs = data.imgUrl;
        return (
            <View style={styles.container}>
                <View style={styles.categorietitle}>
                    <View style={{borderBottomWidth: 1, borderBottomColor: "#b1b1b1", width: 15, marginBottom: 8}}/>
                    <Text style={{fontSize: 18, fontWeight: 'normal', color: "#999999"}}> TITLE</Text>
                    <View style={{borderBottomWidth: 1, borderBottomColor: "#b1b1b1", width: "100%", marginBottom: 8}}/>
                </View>
                {

                }

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#fff',
    },
    categorietitle: {
        flexDirection:"row",
        backgroundColor: '#fff',
    },
    subCategories: {
        flexDirection:"row",
        alignItems:"center",
        marginVertical:10,
        marginHorizontal:5
    },
    categorieRow: {
        flexDirection:"column",
    },
    iconContainer: {
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.1)',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#fff',
        borderRadius:100,
        padding:5
    }
});