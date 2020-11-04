/* handles all the game logic */

/*i think the easiest way to make this game work is to have the player remain stationary
and the obstacles move toward the player. then the player can either duck or jump
honestly this is super similar to how our bird game worked. The main difference is instead of randomly
placing the enemies, there are only two locations, ground or air.*/

// http://pixijs.download/v4.4.0/docs/index.html

export default class Model {

    
    constructor() {
    
        let app = new PIXI.Application({width: 1080, height: 480});

        document.body.appendChild(app.view);

        let background = new PIXI.Sprite.from("../images/background.jpg");

        app.stage.addChild(background);


        this.player = {
            sprite: new PIXI.Sprite.from("../images/player.png"),
            isDead:false, 
        }
        console.log(this.player)
        this.player.sprite.x = 0; //place holder values, i doubt (0,0) will work
        this.player.sprite.y = 0; 

        app.stage.addChild(this.player.sprite);

        for (let i = 0 ; i < 100 ; i++) {
            this.player.sprite.x += 1
        }


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

    left (){
        this.player.sprite.x-= 10 ;
    }
    right() {
        this.player.sprite.x+= 10 ;
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
        sprite= new PIXI.Sprite.from("../images/flyingOb.png");
        this.sprite.x = 0; 
        this.sprite.y = 0; 
    }
    
}

class groundObstactle extends obstacle {
    constructor() {
        sprite= new PIXI.Sprite.from("../images/groundOb.png");
        this.sprite.x = 0;
        this.sprite.x = 0; 
    }
}