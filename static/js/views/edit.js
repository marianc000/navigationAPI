import { showDiv } from './views.js';

const div = editDiv;
const inputs = [...div.querySelectorAll('[name]')];
const textArea = inputs.find(i => i.tagName === 'TEXTAREA');

console.log(textArea);

export function renderEdit(tag) {
    showDiv(div);
    textArea.style.height = null; // to resize after save
    return fetch('/api/' + tag).then(r => r.json())
        .then(data => {
            inputs.forEach(e => e.value = data[e.name]);
            requestAnimationFrame(() => textArea.style.height = (textArea.scrollHeight + 12) + "px");
        });
}

export function renderNew(tag) {
    showDiv(div);
    textArea.style.height = null; // to resize after save
    inputs.forEach(e => e.value = null);
}

saveBtn.addEventListener("click", save);

function save() {
    const data = {};
    inputs.forEach(e => data[e.name] = e.value);
    return fetch('/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(() => renderEdit(data.tag));
}

listBtn.addEventListener("click", () => {
    if (navigation.entries()[navigation.currentEntry.index - 1]?.url === document.baseURI) {
        navigation.back();
    } else { // Fall back to a normal push navigation
        location.assign("");
    }
});