/*this is the main game script
it will run the MVC */

import Model from './engine/model.js' 
import Controller from './engine/controller.js'
import View from './engine/view.js '

let model = null ; 
let controller = null ; 
let view = null ; 

window.addEventListener('load',() =>   {
    model = new Model();
    view = new View(model);
    controller = new Controller(model, view) ;
    
 });

 document.onkeydown = (e) => {
    switch(e.which) {
        case 38: //up arrow
            controller.jump();
            break;
        case 40: //down arrow
            controller.duck() ;
            break;

        default:
            return;
    }
    e.preventDefault() ;
 };

