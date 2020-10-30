/* handles all the game logic */
import {Application, Sprite} from './node_modules/pixi.js'



/*i think the easiest way to make this game work is to have the player remain stationary
and the obstacles move toward the player. then the player can either duck or jump
honestly this is super similar to how our bird game worked. The main difference is instead of randomly
placing the enemies, there are only two locations, ground or air.*/

export default class Model {
    constructor() {
        let player = {
            sprite = new Sprite.fromImage("../images/player.png"),
            isDead:false,
            sprite.x = 0, //place holder values, i doubt (0,0) will work
            sprite.y = 0,  
            
        }
        /*https://pixijs.download/dev/docs/PIXI.Sprite.html
            doc for the sprite object within PIXI
            idk why there is an error for .x and .y, they are in the doc */


        //when obstactles are spawned, they are added to this array
        //when they move off the screen, they are removed from this array
        // an array of obstacle objects 
        let obstacleArray = [] ; 

        
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

export default class obstacle {
    constructor() {

    }
    // functions to handle the dimensions of the obstacle

}
export default class flyinyObstactle extends obstacle {
    constructor() {
        sprite= new Sprite.fromImage("../images/flyingEnemy.png")

    }
}

export default class groundObstactle extends obstacle {
    constructor() {
        sprite= new Sprite.fromImage("../images/flyingEnemy.png")

    }
}