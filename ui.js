export { setPopup, clickHandler }

const controlledBy = {
    "load_btn":"load_dropdown",
    "save_btn":"save_dropdown"
};
function showDropdown(contentID) {
    document.getElementById(contentID).classList.toggle("show");
    activeDropdown = contentID;
}
function hideDropdown() {
    if (activeDropdown === null)
        return;
    document.getElementById(activeDropdown).classList.toggle("show");
    activeDropdown = null;
}
function dropdownClickHandler(event) {
    let button = event.target.closest(".dropdown_btn");
    if (!button) {
        hideDropdown();
        return;
    }
    if (activeDropdown === controlledBy[button.id]) {
        hideDropdown();
        return;
    }
    hideDropdown();
    showDropdown(controlledBy[button.id]);
}

var activePopup = null;
function showPopup(popupID) {
    document.getElementById(popupID).classList.toggle("show");
    activePopup = popupID;
}
function hidePopup() {
    if (activePopup === null)
        return;
    document.getElementById(activePopup).classList.toggle("show");
    activePopup = null;
}
function popupClickHandler(event) {
    if (event.target.matches(".popup_content"))
        return;
    if (event.target.matches(".dropdown_option"))
        return;
    
    hidePopup();
}


var activeDropdown = null;
function clickHandler(event) {
    dropdownClickHandler(event);
    popupClickHandler(event);
}

function setPopup(buttonID, popupID) {
    let button = document.getElementById(buttonID);
    button.addEventListener("click", ()=>showPopup(popupID))
}