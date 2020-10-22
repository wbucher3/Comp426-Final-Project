/* handles all the game logic */
import {Application, Sprite} from './node_modules/pixi.js'

export default class Model {
    constructor() {
        let player = {
            sprite= new Sprite.fromImage("../images/player.png"),
            isDead:false,
        }
        let background = {
            sprite= new Sprite.fromImage("../images/background.png"),

        }

        let obstacles = {
            sprite= new Sprite.fromImage("../images/obstacle.png")

            
        }
        
    }
}