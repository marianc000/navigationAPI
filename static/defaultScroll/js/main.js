import { renderList } from '/js/views/list.js';
import { renderEdit, renderNew } from '/js/views/edit.js';
import { addRoute, start } from './router.js';


addRoute(/^$/, renderList);

addRoute(/^edit\/([a-z]+)$/, id => renderEdit(id));

addRoute(/^edit(\/)?$/, renderNew);

start();