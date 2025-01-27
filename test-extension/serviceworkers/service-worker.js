console.log("Service worker is running");

chrome.webRequest.onCompleted.addListener(
    function(details) {
        if (details.initiator === "https://nhcares.alayacare.com") {
            let items = copyRequest(details.url);
        }
    },
    { urls: ["https://nhcares.alayacare.com/api/v1/scheduler/scheduled_visits*"] }
);

function copyRequest(url) {
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("Fetched data:", data.items);
            return data;
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}