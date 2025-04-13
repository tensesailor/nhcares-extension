chrome.webRequest.onCompleted.addListener(
    function(details) {
        if (details.initiator === "https://nhcares.alayacare.com") {
            let tab = details.tabId;
            fetch(details.url)
            .then(response => response.json())
            .then(data => {
                for (let i in data.items) {
                    fetch(`https://nhcares.alayacare.com/api/v2/patients/clients/${data.items[i].client.id}`)
                    .then(clientresponse => clientresponse.json())
                    .then(clientdata => {

                        let location;

                        if (clientdata.demographics.city === "Portland"){
                            let hasdirection = false;
                            let cardinals = [" N", " NE", " E", " SE", " S", " SW", " W", " NW"];
                            for (let str in cardinals){
                                if (clientdata.demographics.address.includes(cardinals[str] + " ") || clientdata.demographics.address.includes(cardinals[str] + ". ")){
                                    location = cardinals[str] + " PDX";
                                    hasdirection = true;
                                    break;
                                };
                            };
                            if (!hasdirection){
                                location = "PDX";
                            };
                        } else {
                            location = clientdata.demographics.city;
                        };
                    
                        let visibletags;

                        if (clientdata.tags.includes("Male Caregiver")){
                            if (clientdata.tags.includes("Female Caregiver")){
                                visibletags = "No CG Preference";
                            } else {
                                visibletags = "Male CG Only";
                            };
                        } else if (clientdata.tags.includes("Female Caregiver")){
                            visibletags = "Female CG Only";
                        } else {
                            visibletags = "No CG Preference";
                        };

                        let vital = clientdata.tags.findIndex(element => element.includes("Vital"));
                        if (vital > -1){
                            visibletags += ", " + clientdata.tags[vital];
                        };

                        chrome.tabs.sendMessage(tab, [data.items[i].id, location, visibletags]);

                    })
                    .catch(clienterror => console.error("Error fetching client or sending data to content-script:", clienterror));
                };
            })
            .catch(error => console.error("Error fetching visits:", error));
        };
    },
    { urls: ["https://nhcares.alayacare.com/api/v1/scheduler/scheduled_visits*"] }
);