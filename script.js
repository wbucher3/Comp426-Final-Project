/*this is the main game script
it will run the MVC */

import Model from './engine/model.js' 
import View from './engine/view.js '

let model = null ; 
let view = null ; 

window.addEventListener('load',() =>   {
    model = new Model();
    view = new View(model);
    
});

window.addEventListener("keydown", (e)  => {
    switch(e.which) {
        case 37: 
        case 65:
            model.left();
            break;
        case 39:
        case 68: 
            model.right() ;
            break;

        case 40:
        case 38:
            break;
        default:
            return;
    }
    e.preventDefault() ;
});