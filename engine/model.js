/* handles all the game logic */

/*i think the easiest way to make this game work is to have the player remain stationary
and the obstacles move toward the player. then the player can either duck or jump
honestly this is super similar to how our bird game worked. The main difference is instead of randomly
placing the enemies, there are only two locations, ground or air.*/

// http://pixijs.download/v4.4.0/docs/index.html

/** lanes
 * 1
 * 2
 * 3  (430, 350)
 * 4
 * 5
 * 
*/

export default class Model {

    
    constructor() {

        
        const scaleWidth = screen.width * (7/12) ;
        const scaleHeight = screen.height * (7/12) ;
        const piecesWidth = screen.width * (1/14);
        const piecesHeight = screen.height * (2/14);

        
        let app = new PIXI.Application({width: scaleWidth , height: scaleHeight});

        document.getElementById('root').appendChild(app.view);

        let background = new PIXI.Sprite.from("../images/background.png");
        background.height = scaleHeight;
        background.width = scaleWidth;

        app.stage.addChild(background);


        this.player = {
            sprite: new PIXI.Sprite.from("../images/ram.png"),
            isDead:false, 
        }
        console.log(this.player)
        this.player.sprite.x = 450; //place holder values, i doubt (0,0) will work
        this.player.sprite.y = 350; 
        this.player.sprite.width = piecesWidth;
        this.player.sprite.height = piecesHeight ;

        app.stage.addChild(this.player.sprite);



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
        console.log( "(" + this.player.sprite.x  + ", " + this.player.sprite.y + ")")
    }
    right() {
        this.player.sprite.x+= 10 ;
        console.log( "(" + this.player.sprite.x  + ", " + this.player.sprite.y + ")")

        //lower the player's y postion
        // different sprite image? 
        // does it duck for a second then go up or on key release (hold to duck)? 
    }

    collision() {
        // check to see if any obstacles from array intersected with the player
        // set the player to Dead if this is true
        // end the game
        // do some type of listener?

        // depending on how big the ram and enemy's are we will need adjustments

        for (enemy in this.obstacleArray) {
            let enemyBounds = enemy.getBounds();
            let playerBounds = this.player.getBounds();
            if (enemyBounds.x + enemyBounds.width > playerBounds.x && 
                    enemyBounds.x < playerBounds.x + playerBounds.width && 
                    enemyBounds.y + enemyBounds.height > playerBounds.y && 
                    enemyBounds.y < playerBounds.y + playerBounds.height) {
                this.updateListener(Model.Event.LOSE);
            }
        }

    }

    onLose() {

    }

    distance(enemy) {
        // The distance formula
        return Math.sqrt((enemy.x - this.player.x) ** 2 + (enemy.y - this.player.y) ** 2)
        // √((x_2-x_1)²+(y_2-y_1)²)
    }

    spawnObstacle() {
        // randomly choose a ground or flying enemy
        // add it to the obstacle array
    }

    removeObstacle() {
        //removes the obstacle from the array of obstacles
    }

    addListener(listener) {
        let idx = this.listeners.findIndex((l) => l == listener);
        if (idx == -1) {
            this.listeners.push(listener);
        }
    }

    updateListener(event) {
        this.listeners.forEach((l) => {
            if (l.event === event) {
                l.func()
            }
        });
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

Model.Event = {
    LOSE: 1
}