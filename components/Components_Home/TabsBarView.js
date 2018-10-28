import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Tabs from './tabs';
import CardList from "./CardList";
import Categorie from "./Categorie";

export default class TabsBarView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            annonces: [
                {
                    title: 'Image Title',
                    image: 'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/6/image.jpeg'
                },
                {
                    title: 'Image Title',
                    image: 'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/6/image.jpeg'
                },
                {
                    title: 'Image Title',
                    image: 'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/6/image.jpeg'
                }
            ],
            annonces2: [
                {
                    title: 'Image Title 2',
                    image: 'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg'
                },
                {
                    title: 'Image Title 2',
                    image: 'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg'
                },
                {
                    title: 'Image Title 2',
                    image: 'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg'
                }
            ]

        }
    }





    render() {
        return (
            <View style={styles.container}>
                <Tabs>
                    {/* First tab */}
                    <View title="Èchange" style={styles.content}>
                        <ScrollView>
                            <Categorie data={ this.state.annonces} />
                            <Categorie data={ this.state.annonces} />
                            <Categorie data={ this.state.annonces} />

                        </ScrollView>
                    </View>
                    {/* Second tab */}
                    <View title="Demande" style={styles.content}>
                        <ScrollView>
                            <Categorie data={ this.state.annonces2}/>
                        </ScrollView>
                    </View>
                    {/* Third tab */}
                    <View title="Don" style={styles.content}>
                        <ScrollView>
                            <Categorie data={ this.state.annonces} />
                        </ScrollView>
                    </View>

                </Tabs>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    // App container
    container: {
        flex: 1,                            // Take up all screen
        backgroundColor: '#fff',         // Background color

    },
    // Tab content container
    content: {
        flex: 1,                            // Take up all available space
        justifyContent: 'center',           // Center vertically
        alignItems: 'center',               // Center horizontally
        backgroundColor: '#fff',         // Darker background for content area
    },
    // Content header
    header: {
        margin: 10,                         // Add margin
        color: '#F07818',                   // White color
        // fontFamily: 'Avenir',            // Change font family
        fontSize: 26,                       // Bigger font size
    },
    // Content text
    text: {
        marginHorizontal: 20,               // Add horizontal margin
        color: '#e74c3c',                   // Text color
        textAlign: 'center',                // Center
        // fontFamily: 'Avenir',
        fontSize: 18,
    },
});