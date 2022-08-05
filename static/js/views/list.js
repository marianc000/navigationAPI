import { showDiv } from './views.js';

const div = listDiv;

export function renderList() {
    showDiv(div);
    return fetch('/api').then(r => r.json())
        .then(data => data.sort((a, b) => a.tag.localeCompare(b.tag)))
        .then(data => tableDiv.innerHTML = table(data));
}

function table(data) {
    return '<div class="table"><div class="row"><div class="tag">Tag</div><div class="section">Section</div><div class="description">Descrition</div></div>' +
        data.map(o => `<a href="edit/${o.tag}"><div>${o.tag}</div><div>${o.num}</div><div>${o.description}</div></a>`).join('') + '</div>';
}

newBtn.addEventListener("click", () => navigation.navigate('edit/'));