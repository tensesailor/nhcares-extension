console.log("Service worker is running");

chrome.webRequest.onCompleted.addListener(
    function(details) {
        console.log("Request intercepted:", details.url);
        
    },
    { urls: ["https://nhcares.alayacare.com/api/v1/scheduler/scheduled_visits*"] }
);