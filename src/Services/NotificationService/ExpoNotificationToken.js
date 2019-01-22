import { Permissions, Notifications } from 'expo';


export async function registerForPushNotificationsAsync() {
    console.log(`[ExpoNotificationToken] try to get EXPO NOTIFICATION TOKEN`);
    const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
        console.log('[ExpoNotificationToken] existingStatus Notification granted')
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
        console.log('[ExpoNotificationToken] finalStatus Notification not granted');

        return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();

    console.log("[ExpoNotificationToken] Geting Push notification Token: ",token);

    return token;
}