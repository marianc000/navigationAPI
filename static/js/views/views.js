export function showDiv (div) {
    [...div.parentElement.children]. forEach(e => e.style.display = 'none');
    div.style.display = 'block';
}
