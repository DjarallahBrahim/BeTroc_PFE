import {Platform} from "react-native";

export async function registerForPushNotificationsAsync(sb, TOKEN) {
    console.log('[SendbirdNotification] try to register for push notifications Async with sendbird server');
    if (sb) {
        if (Platform.OS === 'ios') {
            sb.registerAPNSPushTokenForCurrentUser(TOKEN, function (response, error) {
                if (error) {
                    console.log('error with register APNS Push Token For Current User [ios]', error.message ,' ', error.code)
                    return false;
                }
                else if(response === 'pending') {
                    console.log('[SendbirdNotification] [APNS IOS] response is: ', response);
                    console.log('[SendbirdNotification] [sendbird object is] response is: ');
                    console.log(sb);
                    console.log('[SendbirdNotification] [Expo token is] response is: ');
                    console.log(TOKEN);
                }else if(response === 'success'){
                    console.log('[SendbirdNotification] [APNS IOS] response is: ', response);
                    return true;
                }else
                    return false;

                // Do something in response to a successful registeration.
            });
        } else {
            sb.registerGCMPushTokenForCurrentUser(TOKEN, function (response, error) {
                if (error) {
                    console.log('error with register GCMP Push Token For Current User [Android]', error.message ,' ', error.code)
                    return false;
                }
                else if(response === 'pending') {
                    console.log('[SendbirdNotification] [GCMP Android] response is: ', response);
                }else if(response === 'success'){
                    console.log('[SendbirdNotification] [GCMP Android] response is: ', response);
                    return true;
                }else
                    return false;
            });
        }
    }else {
        console.log('[SendbirdNotification] sendbird not valid: the value of object is');
        console.log(sb);
        return false;
    }
}

export async function setPushNotification(sb,TOKEN, enable, os) {
    if (enable) {
        if (os === 'ios') {
            sb.registerAPNSPushTokenForCurrentUser(TOKEN, function(response, error) {
                if (error) {
                    return;
                }else
                    console.log('[IOS] Notification turning on status: ', response)


                // Do something in response to a successful registeration.
            });
        } else {
            sb.registerGCMPushTokenForCurrentUser(TOKEN, function(response, error) {
                if (error) {
                    return;
                }else
                    console.log('[Android] Notification turning on status: ', response)

                // Do something in response to a successful registeration.
            });
        }
    } else {
        if (os === 'ios') {
            sb.unregisterAPNSPushTokenForCurrentUser(TOKEN, function(response, error) {
                if (error) {
                    return;
                }

                // Do something in response to a successful unregisteration.
            });
        } else {
            sb.unregisterGCMPushTokenForCurrentUser(TOKEN, function(response, error) {
                if (error) {
                    return;
                }

                // Do something in response to a successful unregisteration.
            });
        }
    }
}