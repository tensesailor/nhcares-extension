browser.webRequest.onBeforeRequest.addListener(
    (details) => {
        console.log("Request incoming", details.url);
        let filter = browser.webRequest.filterResponseData(details.requestId);

        let decoder = new TextDecoder("utf-8");
        var obj = "";

        filter.ondata = (event) => {
            console.log("Data received");
            let str = decoder.decode(event.data, { stream: true });
            obj += str;
            filter.write(event.data);
        };

        filter.onstop = () => {
            console.log("Data stream end");
            
            const clients = JSON.parse(obj).items;
            
            for (var i in clients) {
                (function(id) {
                    let req = new XMLHttpRequest();
                    req.onload = () => {
                        let extraData = JSON.parse(req.responseText);
                        
                        chrome.tabs.query({active: true, currentWindow: true}).then((tabs) => {
                            console.log("Sending message to tab");
                                chrome.tabs.sendMessage(tabs[0].id, [id, extraData]);
                        })
                    };
                    req.open("GET", "https://nhcares.alayacare.com/api/v2/patients/clients/" + clients[i].client.id);
                    req.send();
                })(clients[i].id);
            };

            filter.close();
            console.log("Filter closed");
          };
    },
    {urls: 
        [
            "https://nhcares.alayacare.com/api/v1/scheduler/scheduled_visits*",
            "https://nhcares.alayacare.com/api/v1/patients/clients*"
        ]
    },
    ['blocking']
);