/* handle the display of game and webpage */

export default class View {
    constructor(model) {
        this.model = model ; 
        
        //game should be made in the model
        //we will append the pixi thing in here

        $('#root').append(this.model.getApp())


    }
}