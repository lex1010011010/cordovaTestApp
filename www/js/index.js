function InAppBrowser() {
    const url = 'https://www.salesforce.com/products/platform/overview/'
    const options = 'location=no,zoom=no'
    var ref = cordova.InAppBrowser.open(url, '_blank', options);

    // ref.addEventListener('loadstart', loadstartCallback);
    // ref.addEventListener('loadstop', loadstopCallback);
    // ref.addEventListener('loaderror', loaderrorCallback);
    // ref.addEventListener('exit', exitCallback);

    function loadstartCallback(event) {
        navigator.splashscreen.show()

        alert('Loading started: ' + event.url)
    }

    function loadstopCallback(event) {
        alert('Loading finished: ' + event.url)
    }

    function loaderrorCallback(error) {
        alert('Loading error: ' + error.message)
    }

    function exitCallback() {
        console.log('Browser is closed...')
    }
}

function oneSignal() {
    window.plugins.OneSignal.setLogLevel({ logLevel: 6, visualLevel: 0 });
    document.getElementById('deviceready').classList.add('ready');


    var notificationOpenedCallback = function (jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    };
    // Set your iOS Settings
    var iosSettings = {};
    iosSettings["kOSSettingsKeyAutoPrompt"] = false;
    iosSettings["kOSSettingsKeyInAppLaunchURL"] = false;

    window.plugins.OneSignal
        .startInit("9b24b389-b7c6-4759-9888-8d146043656e")
        .handleNotificationOpened(notificationOpenedCallback)
        .iOSSettings(iosSettings)
        .inFocusDisplaying(window.plugins.OneSignal.OSInFocusDisplayOption.Notification)
        .endInit();

    // The promptForPushNotificationsWithUserResponse function will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 6)
    window.plugins.OneSignal.promptForPushNotificationsWithUserResponse(function (accepted) {
        console.log("User accepted notifications: " + accepted);
    });

}


document.addEventListener('deviceready', onDeviceReady, false);


function onDeviceReady() {
    // alert('TOKEN')
    navigator.splashscreen.show()
    setTimeout(function () {
        navigator.splashscreen.hide()
        InAppBrowser()
    }, 5000);
}