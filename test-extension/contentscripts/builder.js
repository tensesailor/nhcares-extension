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

const form = document.createElement("form");
form.setAttribute("id", "time-inputs-form");
form.setAttribute("action", "javascript:;");
form.addEventListener("submit", function(event) {
    event.preventDefault();
    submitForm(new FormData(form));
});

const table = document.createElement("table");
table.setAttribute("id", "time-inputs-table");
table.style.width = "auto";
table.style.borderCollapse = "collapse";
table.style.marginLeft = "100px";
table.style.float = "left";

const groupContainer = document.createElement("div");
const groupLabel = document.createElement("label");
groupLabel.innerText = "Group: ";

const submitButton = document.createElement("button");
submitButton.setAttribute("type", "submit");
submitButton.innerText = "Search";
submitButton.style.marginRight = "20px";
groupContainer.appendChild(submitButton);

const groupInput = document.createElement("select");
groupInput.setAttribute("name", "group");
groupContainer.appendChild(groupLabel);
groupContainer.appendChild(groupInput);
table.appendChild(groupContainer);

const groupOptions = {
    "Albany": 1012,
    "Brookings": 6584,
    "Coos Bay": 1003,
    "Eugene": 1004,
    "Florence": 1008,
    "La Grande": 3048,
    "Lincoln City": 1002,
    "Longview": 10908,
    "PDX - East": 3047,
    "PDX - West": 10582,
    "Pendleton": 10067,
    "Redmond": 6583,
    "Roseburg": 1011,
    "Salem": 1005,
    "Vancouver": 6582,
    "Warrenton": 10068
};
for (const group in groupOptions) {
    const option = document.createElement("option");
    option.value = groupOptions[group];
    option.innerText = group;
    groupInput.appendChild(option);
}

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

form.appendChild(table);

function onBuilderPageLoad() {
    const elementObserver = new MutationObserver((mutationsList, observer) => {
        const element = document.querySelector(".page-not-found");
        if (element && window.location.hash === "#/builder") {
            observer.disconnect();
            element.remove();
            document.body.appendChild(form);
        };
    });

    elementObserver.observe(document.body, { childList: true, subtree: true });
};

function submitForm(data) {
    const inputs = Object.fromEntries(data);
    console.log(inputs);
    var start, end = new Date();
    start.setDate(start.getDate() + 28);
    end.setDate(end.getDate() + 35);

    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    for (const day in days) {
        if (inputs[`${days[day]}-begin-time`] && inputs[`${days[day]}-end-time`]) {
            const [starthour, startminute] = inputs[`${days[day]}-begin-time`].split(":");
            const [endhour, endminute] = inputs[`${days[day]}-end-time`].split(":");
            fetch('https://nhcares.alayacare.com/api/v1/scheduler/scheduled_visits?1=1&day_of_week='+days[day]+'&visit_status=vacant&visit_status=offered&client_group_ids='+input["group"]+'&count=999&page=1&sort_by=start_date&sort_order=asc&time_zone=America%2FVancouver&start_date_from='+start.getFullYear()+'-'+start.getMonth()+'-'+start.getDate()+'T07%3A00%3A00.000Z%3A00.000Z&start_date_to='+end.getFullYear()+'-'+end.getMonth()+'-'+end.getDate()+'T06%3A59%3A59.999Z%3A59.999Z&start_time_from=12%3A00&end_time_to=12%3A00&start_time_to='+starthour+'%3A'+startminute+'&end_time_from='+endhour+'%3A'+endminute)
        };
    };
};
