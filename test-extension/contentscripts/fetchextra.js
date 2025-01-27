browser.runtime.onMessage.addListener( (message) => {
    
    if ((document.evaluate(`//span[text()="New Filters"]`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue)){
        document.evaluate(`//a[text()="${message[0].toString()}"]`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.parentElement.parentElement.querySelector(".datatable-column___facility").firstChild.innerHTML = message[1].demographics.city;// + " " + message[1].demographics.zip;
    }

    else {
        document.evaluate(`//a[text()="${message[0].toString()}"]`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.parentElement.parentElement.children[3].firstElementChild.innerHTML = message[1].demographics.city;// + " " + message[1].demographics.zip;
    };

    return Promise.resolve();
});

