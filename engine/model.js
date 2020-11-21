/* handles all the game logic */

// http://pixijs.download/v4.4.0/docs/index.html


export default class Model {
 
    constructor() {

        // Numbers for determining game and background size based on screen
        this.scaleWidth = screen.width * (7/12);
        this.scaleHeight = screen.height * (7/12);
        this.piecesWidth = screen.width * (1/14);
        this.piecesHeight = screen.height * (2/14);

        this.lose = false;

        // Score goes up in increments of 2 because basketball
        this.score = 0;

        // Keeps track of how many devils get passed the ram
        this.passed = 0;

        // The speed of the devils
        this.speed = 4;


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
        this.player.sprite.x = (this.scaleWidth / 2) - (this.piecesWidth / 2); //always makes ram in center
        this.player.sprite.y = (this.scaleHeight / 2) + (this.piecesHeight / 2); 
        this.player.sprite.width = this.piecesWidth;
        this.player.sprite.height = this.piecesHeight;
        this.app.stage.addChild(this.player.sprite);

        //when obstactles are spawned, they are added to this array
        //when they move off the screen, they are removed from this array
        // an array of obstacle objects 
        this.obstacleArray = [];

        this.devilsWidth = screen.width * (1/20);
        this.devilsHeight = screen.height * (2/14);

        this.spawnObstacle();

        this.listeners = [];

    }

    // the ticks are started in the view BTW
    ticks (delta) {

        // Makes the devil move across the screen.
        // Incresase number from 1 to 3 for other game
        for (let i = 0; i < 1; i++) {
            // Adjust the number being added to make the devil
            // move faster or slower
            this.obstacleArray[i].y += this.speed;
        }

        //just head and feet collision vs whole body collison
        if (this.noseCollision()) {
            //anything above 10.5 is really hard lmao
            if (this.speed <= 9.5) {
                this.speed = this.speed * 1.02;
            }
            
        }
       // this.collision();

        
        // this.app.stage.addChild(this.obstacleArray[0])

        // Devil has passed the stage
        if (this.obstacleArray[0].y > (this.scaleHeight)) {
            this.removeObstacle();
            this.spawnObstacle();
            this.passed++;
            this.updateListener(Model.Event.MISS);
            

            if (this.passed == 3) {
                this.updateListener(Model.Event.LOSE);
                this.lose = true;
            }
        }
        /*
        if (this.score == 20) {
            this.speed = 6
        } else if (this.score == 100) {
            this.speed = 8;
        } else if (this.score == 200) {
            this.speed = 9;
        } else if (this.score == 300) {
            this.speed = 10;
        }
        */
       
    }

    // helper method for ticks method
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    //this will be used by the view to append the app to the dom
    getApp() {
        return this.app;
    }
    getScore(){
        return this.score;
    }
    getMisses(){
        return this.passed;
    }
    getSpeed() {
        return this.speed;
    }

    noseCollision() {
        for (let i = 0; i < 1 ; i++) {
            let enemyBounds = this.obstacleArray[i].getBounds();
            let playerBounds = this.player.sprite.getBounds();

            //scales so the body of the ram is not included in the collision
            //increase the number to add more of the ram body in hitbox, 1 is whole body
            let ramNoseHeight = playerBounds.height * 1/2;

            //scales the starting y position and y height of devil
            //makes it so the hit box is just on the bottom of the devil
            //decrease the decimal to add more of the body back, 1 is the whole body
            let devilFeetStart = enemyBounds.y * 1.3
            let devilFeetHeight = enemyBounds.height - (devilFeetStart - enemyBounds.y) ; 

            //moves the ram's collision box down slightly so there isnt a gap when they hit
            //if you use the value 1.1, it perfectly stabs the ram in the eyes with the devil feet lol
            //increase the decimal to move it closer to the ram
            let newPlayerY = playerBounds.y * 1.03;


            //top part is X, bottom part is Y. i added the spacing while testing to quickly change things
            if (enemyBounds.x + enemyBounds.width > playerBounds.x && 
                    enemyBounds.x < playerBounds.x + playerBounds.width && 
                    devilFeetStart + devilFeetHeight > newPlayerY && 
                    devilFeetStart < newPlayerY + ramNoseHeight) {
                // The comment below this is for the other game idea.
                // this.updateListener(Model.Event.LOSE);

                
                this.score += 2;
                this.removeObstacle();
                this.spawnObstacle();
                this.updateListener(Model.Event.HIT);
                return true;
            }
            return false;
        }

    }

    //moves the user to the left if the game is running
    left () {
        if (!this.lose) {
            if (this.player.sprite.x >= this.scaleWidth * 3/20  && this.player.sprite !== undefined) {
                this.player.sprite.x -= (this.piecesWidth * 1.4);
            }
        }
    }
    //moves the user to the right if the game is running
    right() {
        if (!this.lose) {
            if (this.player.sprite.x <= this.scaleWidth * 7/10 ){
                this.player.sprite.x += (this.piecesWidth * 1.4) ;
            }   
        }
        
        //console.log(this.player.sprite.x + ", " + this.player.sprite.y);
        //console.log(this.player.sprite.getBounds());
    }

    //checks to see if an enemy has intersected with the player
    // if true, then the game will end
    collision() {
        // check to see if any obstacles from array intersected with the player
        // set the player to Dead if this is true
        // end the game
        // do some type of listener?

        // change 1 to 3 for other game
        for (let i = 0; i < 1 ; i++) {
            let enemyBounds = this.obstacleArray[i].getBounds();
            let playerBounds = this.player.sprite.getBounds();
            if (enemyBounds.x + enemyBounds.width > playerBounds.x && 
                    enemyBounds.x < playerBounds.x + playerBounds.width && 
                    enemyBounds.y + enemyBounds.height > playerBounds.y && 
                    enemyBounds.y < playerBounds.y + playerBounds.height) {
                // The comment below this is for the other game idea.
                // this.updateListener(Model.Event.LOSE);

                this.score += 2;
                this.removeObstacle();
                this.spawnObstacle();
                //console.log("Score: " + this.score)

            }
        }

    }

    onLose(callback) {
        this.addListener({
            event: Model.Event.LOSE,
            func: callback
        })
    }

    onHit(callback) {
        this.addListener({
            event: Model.Event.HIT,
            func: callback
        })
    }
    onMiss(callback) {
        this.addListener({
            event: Model.Event.MISS,
            func: callback
        })
    }
    
    

    spawnObstacle() {
        // for other game idea change 1 to 3
        for (let i = 0; i < 1; i++) {
            let devil = new PIXI.Sprite.from("../images/devil.png");

            devil.width = this.devilsWidth;
            devil.height = this.devilsHeight;

            devil.x = (this.scaleWidth / 2) - (this.devilsWidth / 2); 
            devil.y = -(this.scaleHeight / 4);
            // devil.y = (this.scaleHeight);
            
            this.obstacleArray.push(devil);
        }
        // randomly choose a ground or flying enemy
        // add it to the obstacle array

        // Determines which lane the devil will show up in
        let firstLocation = this.getRandomInt(5);

        // comments below this comment are for the other game idea

        // let secondLocation = this.getRandomInt(5);
        // let thirdLocation = this.getRandomInt(5);
        
        // These "checkDups" loops are for making sure the devils aren't
        // in the same lanes
        // let checkDups = true;
        // while (checkDups) {
        //     if (secondLocation != firstLocation) {
        //         checkDups = false;
        //     } else {
        //         secondLocation = this.getRandomInt(5);
        //     }
        // }

        // checkDups = true;

        // while (checkDups) {
        //     if (thirdLocation != firstLocation && thirdLocation != secondLocation) {
        //         checkDups = false;
        //     } else {
        //         thirdLocation = this.getRandomInt(5);
        //     }
        // }


        // Actually putting the devil in the lane
        let placed = true;
        while (placed) {
            if (firstLocation == 0) {
                this.obstacleArray[0].x -= (this.devilsWidth * 4);
                placed = false;
            } else if (firstLocation == 1) {
                this.obstacleArray[0].x -= (this.devilsWidth * 2);
                placed = false;
            } else if (firstLocation == 2) {
                this.obstacleArray[0].x = (this.scaleWidth / 2) - (this.devilsWidth / 2); 
                placed = false;
            } else if (firstLocation == 3) {
                this.obstacleArray[0].x += (this.devilsWidth * 2);
                placed = false;
            } else {
                this.obstacleArray[0].x += (this.devilsWidth * 4);
                placed = false;
            }
        }
        this.app.stage.addChild(this.obstacleArray[0])

        // placed = true;
        // while (placed) {
        //     if (secondLocation == 0) {
        //         this.obstacleArray[1].x -= (this.devilsWidth * 2 * 2);
        //         placed = false;
        //     } else if (secondLocation == 1) {
        //         this.obstacleArray[1].x -= (this.devilsWidth * 2);
        //         placed = false;
        //     } else if (secondLocation == 2) {
        //         this.obstacleArray[1].x = (this.scaleWidth/2) - (this.devilsWidth/2); 
        //         placed = false;
        //     } else if (secondLocation == 3) {
        //         this.obstacleArray[1].x += (this.devilsWidth * 2);
        //         placed = false;
        //     } else {
        //         this.obstacleArray[1].x += (this.devilsWidth * 2 * 2);
        //         placed = false;
        //     }
        // }
        // this.app.stage.addChild(this.obstacleArray[1])

        // placed = true;
        // while (placed) {
        //     if (thirdLocation == 0) {
        //         this.obstacleArray[2].x -= (this.devilsWidth * 2 * 2);
        //         placed = false;
        //     } else if (thirdLocation == 1) {
        //         this.obstacleArray[2].x -= (this.devilsWidth * 2);
        //         placed = false;
        //     } else if (thirdLocation == 2) {
        //         this.obstacleArray[2].x = (this.scaleWidth/2) - (this.devilsWidth/2); 
        //         placed = false;
        //     } else if (thirdLocation == 3) {
        //         this.obstacleArray[2].x += (this.devilsWidth * 2);
        //         placed = false;
        //     } else {
        //         this.obstacleArray[2].x += (this.devilsWidth * 2 * 2);
        //         placed = false;
        //     }
        // }
        // this.app.stage.addChild(this.obstacleArray[2])

    }

    removeObstacle() {
        //removes the obstacle from the array of obstacles and the stage

        // For other game idea
        // this.app.stage.removeChild(this.obstacleArray[2]);
        // this.obstacleArray.pop();
        // this.app.stage.removeChild(this.obstacleArray[1]);
        // this.obstacleArray.pop();
        this.app.stage.removeChild(this.obstacleArray[0]);
        this.obstacleArray.pop();
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

class Obstacle {
    constructor() {
        sprite= new PIXI.Sprite.from("../images/devil.png");
        this.devilsWidth = screen.width * (1/20);
        this.devilsHeight = screen.height * (2/14);

        devil.width = this.devilsWidth;
        devil.height = this.devilsHeight;
        this.sprite.x = (this.scaleWidth / 2) - (this.devilsWidth / 2); 
        // this.sprite.y = 0; 

    }
    move(){
        //this needs to decrease the x postion of the obstacle 
        //it will look like its moving toward the player
    }
    // functions to handle the dimensions of the obstacle

}


Model.Event = {
    LOSE: 1,
    HIT: 2,
    MISS: 3
}