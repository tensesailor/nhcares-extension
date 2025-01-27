console.log("Service worker is running");

chrome.webRequest.onCompleted.addListener(
    function(details) {
        console.log("Request intercepted:", details.url);
        // You can add additional logic here if needed
    },
    { urls: ["https://nhcares.alayacare.com/api/v1/scheduler/scheduled_visits*"] }
);