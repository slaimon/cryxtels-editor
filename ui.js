export { Popup, DropdownMenu, SelectorWindow, windowClickHandler }

import examples from "./examples.js";

const textArea = document.getElementById("textarea");

var activePopup = null;

class Popup {
    constructor(elementID, buttonID) {
        this.isPopup = true;
        this.elementID = elementID;
        this.element = document.getElementById(elementID);
        this.buttonID = buttonID;
        this.buttonElement = document.getElementById(buttonID);
        
        this.buttonElement.addEventListener("click", (event) => {
            event.stopPropagation();
            this.show()
        });
    }
    show() {
        this.element.classList.toggle("show");
        if (activePopup) {
            activePopup.hide();
        }
        activePopup = this;
    }
    hide() {
        this.element.classList.toggle("show");
        activePopup = null;
    }
    clickHandler(event) {
        // close the popup if user clicked outside of it
        if (!event.target.closest(".popup"))
            this.hide();
    }
}

class DropdownMenu extends Popup {
    constructor(elementID, buttonID) {
        super(elementID, buttonID);
        this.isDropdownMenu = true;
    }
    clickHandler(event) {
        super.clickHandler(event);
        if (activePopup.buttonID == this.buttonID) {
            this.hide();
            return;
        }
    }
}

class SelectorWindow extends Popup {
    constructor(type, elementID, buttonID) {
        super(elementID, buttonID);
        this.isSelectorWindow = true;
        this.type = type;

        // HTML element where all objects of this class are appended
        this.baseElement = document.getElementById("selectorList");

        this.listElement = document.createElement("div");
        for (const example of examples[type]) {
            let listItem = document.createElement("li");
            listItem.classList.add("selector_item", "noselect");
    
            let icon = document.createElement("img");
            icon.setAttribute("src", "./icons/object-icon.svg");
            icon.classList.add("object_icon");
            listItem.appendChild(icon);
    
            let name = document.createElement("p");
            name.innerHTML = example.name;
            name.classList.add("selector_data", "selector_name");
            listItem.appendChild(name);
    
            let author = document.createElement("p");
            author.innerHTML = "by "+ example.author;
            author.classList.add("selector_data", "selector_author");
            listItem.appendChild(author);
    
            this.listElement.appendChild(listItem);
        }
    }
    show() {
        super.show();
        this.baseElement.appendChild(this.listElement);
    }
    hide() {
        this.baseElement.removeChild(this.listElement);
        super.hide();
    }
    clickHandler(event) {
        super.clickHandler(event);
        let item = event.target.closest(".selector_item"); 
        if (item) {
            let name = item.querySelector(".selector_name").innerHTML;
            let code = examples[this.type].find(x=>x.name===name).source;
            textArea.value = code;
            this.hide();
        }
    }
}


function windowClickHandler(event) {
    if (activePopup)
        activePopup.clickHandler(event);
}

// clickHandlers lack their arguments, but once I add them in everything stops working!! Why??