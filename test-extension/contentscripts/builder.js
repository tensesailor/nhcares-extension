document.addEventListener("DOMContentLoaded", function() {
    const domObserver = new MutationObserver((_mutationList, observer) => {
        const nav = document.querySelector("div.sideNav");
        
        if (nav) {
            domObserver.disconnect();
            const btn = document.createElement("li");
            btn.setAttribute("data-v-52b1fb15", true);
            btn.setAttribute("data-acl", "schedule/admin");
            nav.firstElementChild.appendChild(btn);
    
            const link = document.createElement("a");
            link.setAttribute("data-v-024a2701", true);
            link.setAttribute("data-v-52b1fb15", true);
            link.setAttribute("href", "#/builder");
            btn.appendChild(link);
    
            const img = document.createElement("i");
            img.setAttribute("data-v-52b1fb15", true);
            img.setAttribute("class", "ph-calendar-blank");
            link.appendChild(img);
    
            const title = document.createElement("span");
            title.setAttribute("data-v-52b1fb15", true);
            title.innerText = "WIP";
            link.appendChild(title);
        };
    });
    
    domObserver.observe(document.body, { childList: true, subtree: true });

    if (window.location.hash === "#/builder") {
        onBuilderPageLoad();
    };
});

const table = document.createElement("table");
table.setAttribute("id", "time-inputs-table");
table.style.width = "auto";
table.style.borderCollapse = "collapse";
table.style.marginRight = "0";
table.style.float = "right";

const groupContainer = document.createElement("div");
const groupLabel = document.createElement("label");
groupLabel.innerText = "Group: ";
const groupInput = document.createElement("input");
groupInput.setAttribute("type", "text");
groupInput.setAttribute("name", "group");
groupInput.setAttribute("placeholder", "Group");
groupContainer.appendChild(groupLabel);
groupContainer.appendChild(groupInput);
table.appendChild(groupContainer);

const headerRow = document.createElement("tr");
const emptyHeaderCell = document.createElement("th");
headerRow.appendChild(emptyHeaderCell);

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
daysOfWeek.forEach(day => {
    const dayHeader = document.createElement("th");
    dayHeader.innerText = day;
    dayHeader.style.padding = "5px";
    headerRow.appendChild(dayHeader);
});

table.appendChild(headerRow);

const times = ["Begin Time", "End Time"];
times.forEach(time => {
    const row = document.createElement("tr");
    const timeHeader = document.createElement("th");
    timeHeader.innerText = time;
    timeHeader.style.padding = "5px";
    row.appendChild(timeHeader);

    daysOfWeek.forEach(day => {
        const cell = document.createElement("td");
        const input = document.createElement("input");
        input.setAttribute("type", "time");
        input.setAttribute("name", `${day.toLowerCase()}-${time.toLowerCase().replace(" ", "-")}`);
        cell.appendChild(input);
        cell.style.padding = "5px";
        row.appendChild(cell);
    });

    table.appendChild(row);
});

function onBuilderPageLoad() {
    const elementObserver = new MutationObserver((mutationsList, observer) => {
        const element = document.querySelector(".page-not-found");
        if (element && window.location.hash === "#/builder") {
            observer.disconnect();
            element.remove();
            document.body.appendChild(table);
        };
    });

    elementObserver.observe(document.body, { childList: true, subtree: true });
}

window.addEventListener("hashchange", function() {
    if (window.location.hash === "#/builder") {
        onBuilderPageLoad();
    } else {
        const existingTable = document.getElementById("time-inputs-table");
        if (existingTable) {
            existingTable.remove();
        };
    };
});