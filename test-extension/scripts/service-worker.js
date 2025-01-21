console.log("Service worker initiated");

chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        console.log("onBeforeRequest", details.url);

    },
    {
        urls: ["https://nhcares.alayacare.com/*"]
    }
)