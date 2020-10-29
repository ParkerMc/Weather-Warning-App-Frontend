function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
    if (window.MobileAccessibility) {
        window.MobileAccessibility.usePreferredTextZoom(false);
    }
    // Add similar listeners for other events
}