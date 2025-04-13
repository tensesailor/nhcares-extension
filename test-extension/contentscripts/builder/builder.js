//remove custom html if user leaves builder page
window.addEventListener("hashchange", function() {
    if (window.location.hash === "#/builder") {
        onBuilderPageLoad();
    } else {
        const existingTable = document.getElementById("custom-div");
        if (existingTable) {
            existingTable.remove();
        };
    };
});

//add custom sidebar button when page loaded
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

//builds the custom page for schedule builder
function onBuilderPageLoad() {
    const elementObserver = new MutationObserver((mutationsList, observer) => {
        const element = document.querySelector(".page-not-found");
        if (element && window.location.hash === "#/builder") {
            observer.disconnect();
            element.remove();

            //fetch prebuilt html and attach to body
            fetch(chrome.runtime.getURL("contentscripts/builder/builder.html"))
                .then(response => response.text())
                .then(html => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, "text/html");
                    const importedContent = doc.body.firstChild;
                    document.body.appendChild(importedContent);

                    //set css attributes of some elements
                    const form = document.getElementById("time-inputs-form");
                    //form.setAttribute("action", "javascript:;");
                    form.addEventListener("submit", function(event) {
                        event.preventDefault();
                        submitForm(new FormData(form));
                    });
                })
                .catch(error => console.error("Error loading builder.html:", error));
        };
    });

    elementObserver.observe(document.body, { childList: true, subtree: true });
};

function formatTime(date) {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    hours = hours % 12;
    hours = hours ? hours : 12;
  
    if (minutes === 0) {
      return `${hours} ${ampm}`;
    } else {
      return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
    }
};

async function submitForm(data) {
    const resultsTableBody = document.getElementById("results-table-body");
    resultsTableBody.querySelectorAll("tr").forEach(row => row.remove());

    const inputs = Object.fromEntries(data);

    const start = new Date();
    const end = new Date();
    start.setDate(start.getDate() + 28);
    end.setDate(end.getDate() + 34);

    const startmonth = (start.getMonth() + 1).toString().padStart(2, "0");
    const startday = start.getDate().toString().padStart(2, "0");
    const endmonth = (end.getMonth() + 1).toString().padStart(2, "0");
    const endday = (end.getDate() + 1).toString().padStart(2, "0");

    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const promises = [];

    for (const day of days) {
        if (inputs[`${day}-begin-time`] && inputs[`${day}-end-time`]) {
            const [starthour, startminute] = inputs[`${day}-begin-time`].split(":");
            const [endhour, endminute] = inputs[`${day}-end-time`].split(":");

            const url = `https://nhcares.alayacare.com/api/v1/scheduler/scheduled_visits?1=1&day_of_week=${day}&visit_status=vacant&visit_status=offered&client_group_ids=${inputs["group"]}&count=999&page=1&sort_by=start_date&sort_order=asc&time_zone=America%2FVancouver&start_date_from=${start.getFullYear()}-${startmonth}-${startday}T07%3A00%3A00.000Z&start_date_to=${end.getFullYear()}-${endmonth}-${endday}T06%3A59%3A59.999Z&start_time_from=${starthour}%3A${startminute}&end_time_to=${endhour}%3A${endminute}`;

            promises.push(fetch(url).then(response => response.json()));
        }
    }

    try {
        const results = await Promise.all(promises);
        var list = [];

        results.forEach(data => {
            data.items.forEach(item => {
                entry = list.find(entry => entry.id === item.client.id);
                const duration = (item.end_at - item.start_at) / 3600;
                const date = new Date(item.start_at * 1000);
                const dayOfWeek = days[date.getDay()];
                var starttime = new Date(item.start_at * 1000);
                starttime = formatTime(starttime);
                var endtime = new Date(item.end_at * 1000);
                endtime = formatTime(endtime);
                if (entry) {
                    entry.hours += duration;
                    entry.shifts[dayOfWeek].push({Beginning: starttime, Ending: endtime});
                } else {
                    entry = {id: item.client.id, hours: duration, name: item.client.name, shifts: {sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: []}}
                    list.push(entry);
                    entry.shifts[dayOfWeek].push({Beginning: starttime, Ending: endtime});
                }
            });
        });
        
        list.sort((a, b) => b.hours - a.hours);

        console.log(list);

        const resultsTableBody = document.getElementById("results-table-body");

        //populate results table
        list.forEach(entry => {
            const row = document.createElement("tr");

            const hoursCell = document.createElement("td");
            hoursCell.style.border = "4px solid green";
            hoursCell.innerText = entry.hours;
            row.appendChild(hoursCell);

            const nameCell = document.createElement("td");
            nameCell.style.border = "4px solid blue";
            nameCell.innerText = entry.name;
            row.appendChild(nameCell);

            Object.keys(entry.shifts).forEach(key => {
                const shiftCell = document.createElement("td");
                shiftCell.style.border = "4px solid purple";    
                shiftCell.innerText = entry.shifts[key].map(shift => `${shift.Beginning} to ${shift.Ending}`).join("\n");
                row.appendChild(shiftCell);
            });

            /*const shiftsCell = document.createElement("td");
            shiftsCell.innerText = JSON.stringify(entry.shifts, null, 2);
            row.appendChild(shiftsCell);*/

            resultsTableBody.appendChild(row);
        });

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

