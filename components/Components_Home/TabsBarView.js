import React from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import Tabs from './tabs';
import Categorie from "./Categorie";
import Colors from "../../constants/Colors";

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
                                <ScrollView>
                                {Object.keys(data.type[typeAnnonce]).map((categorieX) =>

                                    <Categorie typeAnnonce={typeAnnonce}
                                               key={index}
                                               navigation={navigation}
                                               categorie={ data.type[typeAnnonce][categorieX]} />
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
        alignItems: 'flex-start',
        backgroundColor: '#fff',
    },
    header: {
        margin: 10,
        color: Colors.tintColor,
        fontSize: 26,
    },
    text: {
        marginHorizontal: 20,
        color: '#e74c3c',
        textAlign: 'center',
        fontSize: 18,
    },
});
