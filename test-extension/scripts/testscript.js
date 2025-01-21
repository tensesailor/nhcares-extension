const domObserver = new MutationObserver((_mutationList, observer) => {
    const nav = document.querySelector("div.sideNav");
    
    if (nav) {
        domObserver.disconnect();
        btn = document.createElement("li");
        btn.setAttribute("data-v-52b1fb15", true);
        btn.setAttribute("data-acl", "schedule/admin");
       nav.firstElementChild.appendChild(btn);

        link = document.createElement("a");
        link.setAttribute("data-v-024a2701", true);
        link.setAttribute("data-v-52b1fb15", true);
        link.setAttribute("href", "#/builder");
        btn.appendChild(link);

        img = document.createElement ("i")
        img.setAttribute("data-v-52b1fb15", true);
        img.setAttribute("class", "ph-calendar-blank");
        link.appendChild(img);

        title = document.createElement("span");
        title.setAttribute("data-v-52b1fb15", true);
        title.innerText = "Builder";
        link.appendChild(title);
     }
});

domObserver.observe(document.body, {childList: true, subtree: true});