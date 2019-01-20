import React, { Component } from 'react'
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    Modal,
    ActivityIndicator,
    FlatList,
    RefreshControl
} from 'react-native'
import styles from './List.Styles'
import sendBird from '../../Services/chatService/SendBridConst'
import fetchDataAd from "../../Services/fetchDataAd";

export default class ListOfChat extends Component {

    constructor (props) {
        super(props)
        this.state = {
            dialogVisible: false,
            inviteEmail: '',
            groupName: '',
            isLoading: false,
            arrGroup: [],
            currentUser:this.props.currentUser
        }
    }

    componentDidMount () {
        // fetchDataAd.getUserAuth().then((idUser)=> {
        //     this.setState({currentUser:idUser},()=>this.getListGroup())
        // })
        this.getListGroup()

    }

    getListGroup = () => {
        this.setState({isLoading: true});
        let channelListQuery = sendBird.GroupChannel.createMyGroupChannelListQuery();
        channelListQuery.includeEmpty = true;
        channelListQuery.limit = 20; // pagination limit could be set up to 100

        if (channelListQuery.hasNext) {
            channelListQuery.next((channelList, error) => {
                if (error) {
                    console.error(error)
                } else {
                    this.setState({arrGroup: channelList})
                }
            });
            this.setState({isLoading: false})
        }
    };

    // openModal = () => {
    //     this.setState({dialogVisible: true})
    // }
    //
    // closeModal = () => {
    //     this.setState({dialogVisible: false})
    // }

    // onDialogCancel = () => {
    //     this.setState({
    //         dialogVisible: false,
    //         inviteEmail: '',
    //         groupName: ''
    //     })
    // }
    //
    // onDialogDone = () => {
    //     this.setState({
    //         dialogVisible: false,
    //         isLoading: true,
    //     })
    //
    //     if (this.state.currentUser.trim() && this.state.inviteEmail.trim()) {
    //         let userIds = [this.state.currentUser, this.state.inviteEmail]
    //         sendBird.GroupChannel.createChannelWithUserIds(userIds, false, this.state.groupName, null, null,
    //             (createdChannel, error) => {
    //                 if (error) {
    //                     console.log('Invite fail')
    //                 } else {
    //                     console.log('Invite successful')
    //                     this.getListGroup()
    //                 }
    //                 this.setState({isLoading: false})
    //             })
    //     } else {
    //         Toast.show('Please input all fields')
    //         this.setState({isLoading: false})
    //     }
    // }

    renderItem = ({item}) => {
        let peerInfo = {};
        for (let i = 0; i < item.members.length; i++) {
            let info = item.members[i];
            if (info.userId !== this.state.currentUser) {
                peerInfo = info;
                break
            }
        }
        return (
            <TouchableOpacity style={styles.viewWrapItem} onPress={() =>
                this.props.navigation.navigate('ChatScreen', {channelUrl: item.url, currentUser:this.state.currentUser})
            }>
                <View>
                    <Image style={styles.viewAvatar} source={{uri: item.coverUrl}}/>
                    {peerInfo.connectionStatus === 'online' ?
                        <View style={styles.statusIndicator}/> :
                        null}
                </View>
                <View>
                    <Text style={styles.viewTextNameGroup}>
                        Group name: {item.name}
                    </Text>
                    <Text style={styles.viewTextMail}>
                        Email: {peerInfo.userId}
                    </Text>
                    <Text style={styles.viewTextMail}>
                        Nickname: {peerInfo.nickname ? peerInfo.nickname : 'Not available'}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    };



    render () {
        return (
            this.state.currentUser>0?
            <View style={styles.viewContainer}>
                {/*List group chat*/}
                <FlatList
                    refreshControl={
                        <RefreshControl
                            onRefresh={this.getListGroup}
                            refreshing={this.state.isLoading}
                        />
                    }
                    style={styles.viewContainer}
                    data={this.state.arrGroup}
                    renderItem={(value) => this.renderItem(value)}
                    keyExtractor={(item, index) => index.toString()}
                />



                {/* Loading */}
                {this.state.isLoading ?
                    <View style={styles.viewLoading}>
                        <ActivityIndicator size="large"/>
                    </View> :
                    null}

            </View>:null

        )
    }
}