const buttonMap = {
    "load_btn":"load_dropdown",
    "save_btn":"save_dropdown"
};

function showDropdown(buttonID) {
    let content = document.getElementById(buttonMap[buttonID]);
    content.classList.toggle("show");
}
function hideAllDropdowns() {
    var dropdowns = document.getElementsByClassName("dropdown_content");
    for (const content of dropdowns) {
        if (content.classList.contains("show")) 
            content.classList.toggle("show");
    }
}

var activeDropdown = null;
window.addEventListener("click", event => {
    hideAllDropdowns();
    if (!event.target.classList.contains("dropdown_btn")) {
        activeDropdown = null;
        return;
    }
    if (activeDropdown === event.target) {
        activeDropdown = null;
        return;
    }
    showDropdown(event.target.id);
    activeDropdown = event.target;
});