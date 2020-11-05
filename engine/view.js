/* handle the display of game and webpage */

export default class View {
    constructor(model) {
        this.model = model ;        
        const $root =  document.getElementById("root");

        //WANNA GET RID OF LANDING PAGE FOR TESTING???
        //comment out these three lines below!!
        let landing = this.landingPage() ;
        $root.appendChild(landing) ;
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
}