console.log("devlisteneractive");
document.body.style.backgroundColor = "orange";

chrome.devtools.network.onRequestFinished.addListener(request => {
    request.getContent((body) => {
      if (request.request && request.request.url) {
        if (request.request.url.includes("https://nhcares.alayacare.com/api/v1/scheduler/scheduled_visits")) {
            const obj = JSON.parse(body);
        }

        //if url contains client search?
      }
    });
  });