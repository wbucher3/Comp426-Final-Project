/* handle the display of game and webpage */
import model from "./model.js"

export default class View {
    constructor(model) {
        this.model = model ;        
        this.$root =  document.getElementById("root");

        //WANNA GET RID OF LANDING PAGE FOR TESTING???
        //comment out these three lines below!!
        let landing = this.landingPage() ;
        this.$root.appendChild(landing) ;
        document.getElementById("start").addEventListener("click", this.startGame);

        //THEN
        //uncomment this line
    //$root.appendChild(this.model.getApp().view);   


        /**IDEA
         * we made a landing page that loads initial that says "play" button
         * then when the button is pressed, we used .replaceChild 
         * to replace the start screen with the game screen
         * 
         * this also allows us to replace the game screen with a loss screen
         * this loss screen will also display the top 10 leaderboard
         */

         /**ISSUE
          * the game starts even when it's not appending since the model is made prior 
          * to getting appending. we need to make it so the model is made when it
          * is appended to the game page
          */

    }

    startGame = () => {
        //overall id tag
        let page = document.createElement("article");
        page.setAttribute("id", "game");

        //gets the app from the model
        //must be an arrow function or this will cause undefined errors
        let app = this.model.getApp().view ;
        page.appendChild(app);

        //replaces the landing page with the game
        document.getElementById("landingPage").replaceWith(page);

        // Starts the ticker
        this.model.app.ticker.add(delta => this.model.ticks(delta)); 
    
        // Shows score and leaderboared page
        this.model.onLose(game => {
            this.scorePage();
            this.model.app.ticker.stop();
            this.model.app.destroy(true, true);
        })
    }

    landingPage() {
        //creates the overall id tag
        let page = document.createElement("article");
        page.setAttribute("id", "landingPage");

        //first content div tag, everything lives in here
        let content = document.createElement("div") ;
        content.setAttribute("class", "");


        //start button
        let button = document.createElement("button");
        button.setAttribute("class", "button");
        button.setAttribute("id", "start");
        button.innerHTML = "Start Game!";

        //adds all contents to one item and returns the item
        content.appendChild(button) ;
        page.appendChild(content);
        return page;
    }

    // If they make it onto the leaderboad they will enter their
    // name on this page
    scorePage() {
        //creates the overall id tag
        let page = document.createElement("div");
        page.setAttribute("id", "scorePage");
        page.setAttribute("class", "block");

        //first content div tag, everything lives in here
        let content = document.createElement("form");
        content.setAttribute("class", "columns is-multiline justify-center");
 
        page.appendChild(content);

        let leftRam = document.createElement("img");
        leftRam.setAttribute("src", "../images/ram.png");
        leftRam.setAttribute("class", "column");
        leftRam.style.background = "black";
        leftRam.style.margin = "0em 6em 0em";

        content.appendChild(leftRam)

        let field = document.createElement("div");
        field.setAttribute("class", "field mx-4 column");

        content.appendChild(field);

        let rightRam = document.createElement("img");
        rightRam.setAttribute("src", "../images/ram.png");
        rightRam.setAttribute("class", "column");
        rightRam.style.background = "black";
        rightRam.style.margin = "0em 6em 0em";

        content.appendChild(rightRam)

        let label = document.createElement("label");
        label.setAttribute("class", "label title");
        label.innerHTML = "NAME";

        field.appendChild(label);

        let control = document.createElement("div");
        control.setAttribute("class", "control");

        field.appendChild(control);

        let input = document.createElement("input");
        input.setAttribute("class", "input");
        input.setAttribute("type", "text");
        input.setAttribute("name", "name")

        control.appendChild(input);

        // Need to actually create the leaderboard
        let leaderboard = document.createElement("div");
        leaderboard.innerHTML = "Your final score is " + this.model.score + "! (Future leaderboard location)";

        page.append(leaderboard);

        this.$root.appendChild(page);

        // Replaces the game with the scorePage
        document.getElementById("game").replaceWith(page);
    }
}