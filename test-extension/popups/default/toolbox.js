// grab user's settings
const options = {};
const optionsForm = document.getElementById("optionsForm");

// submit new options on change
optionsForm.addEventListener("change", (event) => {
    const formData = new FormData(optionsForm);
    for (const [key, value] of formData.entries()) {
        options[key] = value;
    }
    chrome.storage.sync.set({ options });
});

// create form using current options
const data = await chrome.storage.sync.get("options");
Object.assign(options, data.options);

// Assign saved values to their respective HTML elements
for (const [key, value] of Object.entries(options)) {
    const element = optionsForm.elements[key];
    if (element) {
        if (element.type === "checkbox") {
            element.checked = Boolean(value);
        } else {
            element.value = value;
        }
    }
}
// display options JSON
const optionsDisplay = document.createElement("p");
optionsDisplay.textContent = `Current options: ${JSON.stringify(options)}`;
document.body.appendChild(optionsDisplay);