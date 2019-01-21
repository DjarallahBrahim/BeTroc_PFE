import React from 'react';
import AppNavigator from "./src/navigation/AppNavigator";
import {
    Notifications,
} from 'expo';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

// This refers to the function defined earlier in this guide
import * as ExpoNotificationToken from "./src/Services/NotificationService/ExpoNotificationToken";
import * as SendbirdNotification from "./src/Services/NotificationService/SendbirdNotification";
import SendBirdService from "./src/Services/chatService/SendBirdService";

export default class App extends React.Component {
    state = {
        notification: {},
    };

    componentDidMount() {
        ExpoNotificationToken.registerForPushNotificationsAsync().then((token)=>{
            SendbirdNotification.registerForPushNotificationsAsync(SendBirdService.getInstance(),token)
                .then()
        });

        // Handle notifications that are received or selected while the app
        // is open. If the app was closed and then opened by tapping the
        // notification (rather than just tapping the app icon to open it),
        // this function will fire on the next tick after the app starts
        // with the notification data.
        this._notificationSubscription = Notifications.addListener(this._handleNotification);
    }

    _handleNotification = (notification) => {
        alert(notification);
    };

    render() {
        return (
            <View style={styles.container}>
                <AppNavigator />
            </View>
        );
    }
}
//   render() {
//       return (
//         <View style={styles.container}>
//           <AppNavigator />
//         </View>
//       );
//     }
// }



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
