const notifContainer = document.getElementById("notifications");
const modalTitle = notifContainer.querySelector(".modalTitle");
const modalContent = notifContainer.querySelector(".modalContent");
const modalButtons = notifContainer.querySelector(".modalButtons")

let notifOpen = false;
let notifQueue = [];

export function closeNotification() {
    const next = notifQueue.shift()

    if (next) {
        _showNotification(next.title, next.content, next.buttons)
    } else {
        notifContainer.style.display = "none";
        notifOpen = false;
    }
}

export function _showNotification(title, content, buttons = [
  {
    text: "Close",
    listener: closeNotification
  }
]) {
    notifContainer.style.display = "";
    modalTitle.innerText = title;
    modalContent.innerText = content;

    const buttonsFragment = document.createDocumentFragment()

    for (const button of buttons) {
      const buttonEl = document.createElement("button")
      buttonEl.appendChild(document.createTextNode(button.text))
      buttonEl.addEventListener("click", button.listener)

      buttonsFragment.appendChild(buttonEl)
    }
    
    modalButtons.replaceChildren(buttonsFragment)
}

export function showNotification(title, content, buttons) {
    if (notifOpen) {
        notifQueue.push({title, content, buttons})
        return;
    }

    notifOpen = true;

    _showNotification(title, content, buttons)
}