chrome.runtime.onMessage.addListener( (message) => {

    if (document.evaluate(`//span[text()="New Filters"]`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue){
        document.evaluate(`//a[text()="${message[0].toString()}"]`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.parentElement.parentElement.querySelector(".datatable-column___facility").firstChild.innerText = message[1];
        document.evaluate(`//a[text()="${message[0].toString()}"]`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerText = message[2];
    }

    else {
        document.evaluate(`//a[text()="${message[0].toString()}"]`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.parentElement.parentElement.children[3].firstElementChild.innerText = message[1];
        document.evaluate(`//a[text()="${message[0].toString()}"]`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerText = message[2];
    };

    return Promise.resolve();
});

