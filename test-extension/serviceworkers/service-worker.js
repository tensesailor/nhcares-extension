console.log("Service worker is running");

chrome.webRequest.onCompleted.addListener(
    function(details) {
        if (details.initiator === "https://nhcares.alayacare.com") {
            console.log(details);
            let tab = details.tabId;
            fetch(details.url)
            .then(response => response.json())
            .then(data => {
                for (let i in data.items) {
                    fetch(`https://nhcares.alayacare.com/api/v2/patients/clients/${data.items[i].client.id}`)
                    .then(clientresponse => clientresponse.json())
                    .then(clientdata => chrome.tabs.sendMessage(tab, [data.items[i].id, clientdata]))
                    .catch(clienterror => console.error("Error fetching client:", clienterror));
                };
            })
            .catch(error => console.error("Error fetching visits:", error));
        }
    },
    { urls: ["https://nhcares.alayacare.com/api/v1/scheduler/scheduled_visits*"] }
);