/* handles all the game logic */
import {Application, Sprite} from 'pixi.js'


/*i think the easiest way to make this game work is to have the player remain stationary
and the obstacles move toward the player. then the player can either duck or jump
honestly this is super similar to how our bird game worked. The main difference is instead of randomly
placing the enemies, there are only two locations, ground or air.*/

export default class Model {
    constructor() {
        
        const app = new Application(1080, 480) ;

        let background = new Sprite.fromImage("../images/background.png");

        app.stage.addChild(background) ; 


        let player = {
            sprite: new Sprite.fromImage("../images/player.png"),
            isDead:false, 
        }
        player.sprite.x = 0; //place holder values, i doubt (0,0) will work
        player.sprite.y = 0; 


        /*https://pixijs.download/dev/docs/PIXI.Sprite.html
            doc for the sprite object within PIXI */


        //when obstactles are spawned, they are added to this array
        //when they move off the screen, they are removed from this array
        // an array of obstacle objects 
        let obstacleArray = [] ; 

        //basically going to make the whole game in here and append it using the view

        
    }
    //this will be used by the view to append the app to the dom
    getApp() {
        return this.app;
    }

    jump() {
        //increase the player's y postion
        // sleep for a bit then lower them back down
    }
    duck() {
        //lower the player's y postion
        // different sprite image? 
        // does it duck for a second then go up or on key release (hold to duck)? 
    }

    collision() {
        // check to see if any obstacles from array intersected with the player
        // set the player to Dead if this is true
        // end the game
        //do some type of listener?
    }

    spawnObstacle() {
        // randomly choose a ground or flying enemy
        // add it to the obstacle array
    }

    removeObstacle() {
        //removes the obstacle from the array of obstacles
    }
}


// some boiler plate code, dont know what to do with this just yet

class obstacle {
    constructor() {

    }
    move(){
        //this needs to decrease the x postion of the obstacle 
        //it will look like its moving toward the player
    }
    // functions to handle the dimensions of the obstacle

}
class flyinyObstactle extends obstacle {
    constructor() {
        sprite= new Sprite.fromImage("../images/flyingOb.png");
        this.sprite.x = 0; 
        this.sprite.y = 0; 
    }
    
}

class groundObstactle extends obstacle {
    constructor() {
        sprite= new Sprite.fromImage("../images/groundOb.png");
        this.sprite.x = 0;
        this.sprite.x = 0; 
    }
}