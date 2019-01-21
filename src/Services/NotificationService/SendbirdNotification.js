import {Platform} from "react-native";

export async function registerForPushNotificationsAsync(sb, TOKEN) {
    console.log('sb instance and token: ', sb.toString(), TOKEN);
    if (sb) {
        if (Platform.OS === 'ios') {
            sb.registerAPNSPushTokenForCurrentUser(TOKEN, function (response, error) {
                if (error) {
                    console.log('error with register APNS Push Token For Current User [ios]', error.message ,' ', error.code)
                    return false;
                }
                else {
                    console.log('[APNS IOS] response is: ', response);

                    return true;
                }

                // Do something in response to a successful registeration.
            });
        } else {
            sb.registerGCMPushTokenForCurrentUser(TOKEN, function (response, error) {
                if (error) {
                    console.log('error with register GCMP Push Token For Current User [ios]', error.message ,' ', error.code)
                    return false;
                }
                else{
                    console.log('[GCMP Android] response is: ', response);
                    return true;
                }

                // Do something in response to a successful registeration.
            });
        }
    }else {
        console.log('sendbird not valid')
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