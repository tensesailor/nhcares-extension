console.log("Service worker initiated");

browser.webRequest.onHeadersReceived.addListener(
    function(details) {
        console.log(details);
    },
    {urls: ["https://nhcares.alayacare.com/#/scheduling/scheduled_visits"]}
);

console.log("Listener initiated");