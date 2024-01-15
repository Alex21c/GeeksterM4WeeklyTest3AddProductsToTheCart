'use strict';
let model = new Model(db);
let view = new View(db);
let controller = new Controller(view, model);


let productsTable = document.querySelector('table#products');
productsTable.addEventListener('click', (event)=>controller.request(event));
// console.log(productsTable);

// Lazy Loading of Image
document.addEventListener("DOMContentLoaded", view.lazyLoadImages);