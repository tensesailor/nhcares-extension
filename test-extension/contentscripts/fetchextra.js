console.log("Content script is running");

chrome.runtime.onMessage.addListener( (message) => {

    if (document.evaluate(`//span[text()="New Filters"]`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue){
        document.evaluate(`//a[text()="${message[0].toString()}"]`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.parentElement.parentElement.querySelector(".datatable-column___facility").firstChild.innerHTML = message[1].demographics.city;// + " " + message[1].demographics.zip;
        let visibletags = document.evaluate(`//a[text()="${message[0].toString()}"]`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.parentElement.parentElement.querySelector(".datatable-column___approval_status").firstChild.firstChild;
        if (message[1].tags.includes("Male Caregiver")){
            if (message[1].tags.includes("Female Caregiver")){
                visibletags.innerHTML = "No CG Preference";
            } else {
                visibletags.innerHTML = "Male CG Only";
            };
        } else if (message[1].tags.includes("Female Caregiver")){
            visibletags.innerHTML = "Female CG Only";
        } else {
            visibletags.innerHTML = "No CG Preference";
        };

        let vital = message[1].tags.findIndex(element => element.includes("Vital"));
        if (vital > -1){
            visibletags.innerHTML += ", " + message[1].tags[vital];
        };
    }

    else {
        document.evaluate(`//a[text()="${message[0].toString()}"]`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.parentElement.parentElement.children[3].firstElementChild.innerHTML = message[1].demographics.city;// + " " + message[1].demographics.zip;
        let visibletags = document.evaluate(`//a[text()="${message[0].toString()}"]`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.parentElement.parentElement.children[9];
        if (message[1].tags.includes("Male Caregiver")){
            if (message[1].tags.includes("Female Caregiver")){
                visibletags.innerHTML = "No CG Preference";
            } else {
                visibletags.innerHTML = "Male CG Only";
            };
        } else if (message[1].tags.includes("Female Caregiver")){
            visibletags.innerHTML = "Female CG Only";
        } else {
            visibletags.innerHTML = "No CG Preference";
        };

        let vital = message[1].tags.findIndex(element => element.includes("Vital"));
        if (vital > -1){
            visibletags.innerHTML += ", " + message[1].tags[vital];
        };
    };

    return Promise.resolve();
});

