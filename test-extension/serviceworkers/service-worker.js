console.log("Service worker is running");

chrome.webRequest.onCompleted.addListener(
    function(details) {
        if (details.initiator === "https://nhcares.alayacare.com") {
            let visits = fetch(details.url)
            .then(response => response.json())
            .then(data => {
                for (var i in data.items) {
                    let test = fetch(`https://nhcares.alayacare.com/api/v2/patients/clients/${data.items[i].client.id}`)
                    .then(clientresponse => clientresponse.json())
                    .then(clientdata => console.log(clientdata))
                    .catch(clienterror => console.error("Error fetching client:", clienterror));
                };
            })
            .catch(error => console.error("Error fetching visits:", error));
        }
    },
    { urls: ["https://nhcares.alayacare.com/api/v1/scheduler/scheduled_visits*"] }
);

