/*this is the main game script
it will run the MVC */

import Model from './engine/model.js' 
import Controller from './engine/controller.js'
import View from './engine/view.js '

let model = null ; 
let controller = null ; 
let view = null ; 

$(document).ready(() => {
    model = new Model();
    view = new View(model);
    controller = new Controller(model, view) ;
    
 });

