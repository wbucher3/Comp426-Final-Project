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
        this.scaleWidth = screen.width * (7/12) ;
        this.scaleHeight = screen.height * (7/12) ;
        this.piecesWidth = screen.width * (1/14);
        this.piecesHeight = screen.height * (2/14);


        // creates the pixi app 
        this.app = new PIXI.Application({width: this.scaleWidth , height: this.scaleHeight});


        //sets up the background and adds it to the stage
        let background = new PIXI.Sprite.from("../images/background.png");
        background.height = this.scaleHeight;
        background.width = this.scaleWidth;
        this.app.stage.addChild(background);


        //creates the player and adds it to the stage
        this.player = {
            sprite: new PIXI.Sprite.from("../images/ram.png"),
            isDead:false, 
        };
        this.player.sprite.x = (this.scaleWidth /2) - (this.piecesWidth/2); //always makes ram in center
        this.player.sprite.y = (this.scaleHeight/2) + (this.piecesHeight/2); 
        this.player.sprite.width = this.piecesWidth;
        this.player.sprite.height = this.piecesHeight ;
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
        if (this.player.sprite.x >= this.scaleWidth * 3/20) {
            this.player.sprite.x -= (this.piecesWidth * 1.3)  ;
        }
    }
    //moves the user to the right
    right() {
        if (this.player.sprite.x <= this.scaleWidth * 7/10){
            this.player.sprite.x += (this.piecesWidth * 1.3) ;
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