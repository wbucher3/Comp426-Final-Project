/* handle the display of game and webpage */
import Model from "./model.js";
import model from "./model.js"

export default class View {
    constructor(model) {
        this.model = model ;        
        this.$root =  document.getElementById("root");

        let landing = this.landingPage() ;
        this.$root.appendChild(landing) ;
        document.getElementById("start").addEventListener("click", this.startGame);


    }

    startGame = () => {
        //overall id tag
        let page = document.createElement("article");
        page.setAttribute("id", "game");
        page.setAttribute("class", "game")

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
        button.setAttribute("class", "button is-large is-fullwidth");
        button.setAttribute("id", "start");
        button.setAttribute("style", "background-color: #25b4fc ;color:white;")
        button.innerHTML = "Start Game!";

        let howTo = document.createElement("div") ;
        howTo.innerHTML = `
        <div class="section">
            <div class="columns">
                <div class="columns is-half">
                    <h1 class="howToTitle">How to Play!</h1>
                </div>
            </div>
            <div class="container">
                <dl class="content is-large">
                    <li>Move the Ram Side to Side using 'A' or 'D' or Left and Right Arrow keys</li>
                    <li>Headbutt the Dookies storming the court! They are having a hard time accepting their L!
                    <li>If 3 Dookies get past, it's game over!</li>
                    <li>Headbutt Enough Dookies to Earn a spot on the Leaderboard!</li>
                </dl>
            </div>
        </div>
        
        <div class="columns">
                <div class="column is-half">
                    <h1 class="leaderboard">
                        <a href="./leaderboard.html">View the Leaderboard</a>
                    </h1>
                </div>
            </div>
        `


        //adds all contents to one item and returns the item
        content.appendChild(button) ;
        content.appendChild(howTo);
        //article tag, used to remove to play game
        //content goes in here
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

        let playAgain = document.createElement("button");
        playAgain.setAttribute("class", "button");
        playAgain.setAttribute("id", "playAgain");
        playAgain.addEventListener("click", this.tryAgain)
        playAgain.innerHTML = "Play Again? this doesnt work lmao"

        // Need to actually create the leaderboard
        let leaderboard = document.createElement("div");
        leaderboard.innerHTML = "Your final score is " + this.model.score + "! (Future leaderboard location)";

        page.append(leaderboard);
        page.appendChild(playAgain);
        this.$root.appendChild(page);

        // Replaces the game with the scorePage
        document.getElementById("game").replaceWith(page);
    }

    tryAgain() {
        this.model = new Model()
        this.startGame();
    }
    
}