browser.webRequest.onBeforeRequest.addListener(
    function(details) {
        var filter = browser.webRequest.filterResponseData(details.requestId);

        let decoder = new TextDecoder("utf-8");
        let encoder = new TextEncoder();
        var obj = [];

        filter.ondata = (event) => {
            let str = decoder.decode(event.data, { stream: true });
            obj.push(str);
            filter.write(event.data);
        };

        filter.onstop = (event) => {
            obj = obj.toString();
            
            console.log(obj);
            var arr = JSON.parse(obj);
            console.log(arr);

            filter.close();
          };
    },
    {urls: 
        ["https://nhcares.alayacare.com/api/v1/scheduler/scheduled_visits*"]
    },
    ['blocking']
);