import React from 'react';
import {
    RefreshControl,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import Tabs from './tabs';
import Categorie from "./Categorie";
import Colors from "../../constants/Colors";
import DemandeAdType from "./DemandeAdType";

export default class TabsBarView extends React.Component {
    constructor(props) {
        super(props);
        this.categories = ["Echange", "Demande", "Don"]

    }

    render() {
        const data= this.props.data;
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Tabs>
                    {
                        this.categories.map( (typeAnnonce, index)=>
                            <View key={index} title={typeAnnonce} style={styles.content}>
                                <ScrollView
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={this.props.refreshing}
                                            onRefresh={this.props.onRefresh}
                                        />
                                    }>
                                {Object.keys(data.type[typeAnnonce]).map((categorieX) =>

                                    typeAnnonce !== "Demande"?
                                        <Categorie typeAnnonce={typeAnnonce}
                                               key={index}
                                               navigation={navigation}
                                               categorie={ data.type[typeAnnonce][categorieX]} />
                                        :
                                        <DemandeAdType  navigation={navigation}
                                                        categorie={ data.type[typeAnnonce][categorieX]}
                                                        key={index}/>
                                )}
                                </ScrollView>
                            </View>
                         )
                    }
                    </Tabs>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',


    },
    content: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',

    },
    text: {
        marginHorizontal: 20,
        color: '#e74c3c',
        textAlign: 'center',
        fontSize: 18,
    },
});