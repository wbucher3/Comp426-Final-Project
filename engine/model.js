/* handles all the game logic */

// http://pixijs.download/v4.4.0/docs/index.html

/** lane (x, y) from left to right
 * add 170 starting from left to right
 * 1 (100, 350)
 * 2 (270, 350)
 * 3 (440, 350)
 * 4 (510, 350)
 * 5 (780, 350)
 * 
*/

export default class Model {
 
    constructor() {

        // Numbers for determining game and background size based on screen
        const scaleWidth = screen.width * (7/12) ;
        const scaleHeight = screen.height * (7/12) ;
        const piecesWidth = screen.width * (1/14);
        const piecesHeight = screen.height * (2/14);


        // creates the pixi app 
        this.app = new PIXI.Application({width: scaleWidth , height: scaleHeight});


        //sets up the background and adds it to the stage
        let background = new PIXI.Sprite.from("../images/background.png");
        background.height = scaleHeight;
        background.width = scaleWidth;
        this.app.stage.addChild(background);


        //creates the player and adds it to the stage
        this.player = {
            sprite: new PIXI.Sprite.from("../images/ram.png"),
            isDead:false, 
        };
        this.player.sprite.x = 440; //place holder values, i doubt (0,0) will work
        this.player.sprite.y = 350; 
        this.player.sprite.width = piecesWidth;
        this.player.sprite.height = piecesHeight ;
        this.app.stage.addChild(this.player.sprite);



        //when obstactles are spawned, they are added to this array
        //when they move off the screen, they are removed from this array
        // an array of obstacle objects 
        let obstacleArray = [] ; 
        
    }

    //this will be used by the view to append the app to the dom
    getApp() {
        return this.app;
    }

    //moves the user to the left
    left (){
        if (this.player.sprite.x !== 100) {
            this.player.sprite.x-= 170 ;
        }
    }
    //moves the user to the right
    right() {
        if (this.player.sprite.x !== 780){
            this.player.sprite.x+= 170 ;
        }
    }

    //checks to see if an enemy has intersected with the player
    // if true, then the game will end
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
        sprite= new PIXI.Sprite.from("../images/devil.png");
        this.sprite.x = 0; 
        this.sprite.y = 0; 

    }
    move(){
        //this needs to decrease the x postion of the obstacle 
        //it will look like its moving toward the player
    }
    // functions to handle the dimensions of the obstacle

}


Model.Event = {
    LOSE: 1
}