/* handle the display of game and webpage */
import {getAllScores, getName} from "../APIcalls.js" 

export default class View {
    constructor(model) {
        this.model = model ;        
        this.landingPage() ;
    }

    renderScore() {
        let score = this.model.getScore(); 
        let miss = this.model.getMisses();
        let speed = this.model.getSpeed();

        let gameInfoDiv = document.createElement("div");
        gameInfoDiv.setAttribute("id", "currentScore");
        
        let scoreText = document.createElement("h2");
        scoreText.setAttribute("class", "scoreText");
        scoreText.innerText = "Score: " + score


        let speedText = document.createElement("h2");
        speedText.setAttribute("class", "scoreText");
        speedText.innerText = "Speed: " + Math.floor(speed);

        let livesLeft = document.createElement("h2");
        livesLeft.setAttribute("class", "scoreText");
        livesLeft.innerText = "Lives Left: " + (3 - miss);

        gameInfoDiv.appendChild(scoreText);
        gameInfoDiv.appendChild(livesLeft);
        gameInfoDiv.appendChild(speedText);

        return gameInfoDiv;

    }


    startGame = () => {
        //overall id tag
        let app = this.model.getApp().view ;

        let page = document.createElement("article");
        page.setAttribute("id", "game");
        page.setAttribute("class", "game")

        let columnDiv = document.createElement("div");
        columnDiv.setAttribute("class", "columns");

        // let leftcol = document.createElement("div");
        // leftcol.setAttribute("class", "column");
        // let leftBox = document.createElement("div");
        // leftBox.setAttribute("class", "box scoreBox");
        // leftBox.innerText = "thank you for playing!"
        // leftcol.appendChild(leftBox);
        
        let centerCol = document.createElement("div");
        centerCol.setAttribute("class", "column is-four-fifths is-fullwidth")
        let gameDiv = document.createElement("div");
        gameDiv.setAttribute("class", "column"); 
        gameDiv.appendChild(app);
        centerCol.appendChild(gameDiv);


        let rightcol = document.createElement("div");
        rightcol.setAttribute("class", "column");

        let scoreBoxPosition = document.createElement("div");
        scoreBoxPosition.setAttribute("class", "scorePadding")

        let scoreBox = document.createElement("div");
        scoreBox.setAttribute("class", "box");

        
        scoreBox.appendChild(this.renderScore());
        scoreBoxPosition.appendChild(scoreBox);
        rightcol.appendChild(scoreBoxPosition);


        //columnDiv.appendChild(leftcol);
        columnDiv.appendChild(centerCol);
        columnDiv.appendChild(rightcol); 

        page.appendChild(columnDiv);

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

        this.model.onHit(game => {
            let score = this.model.getScore();
            let miss = this.model.getMisses();
            document.getElementById("currentScore").replaceWith(this.renderScore())
        })
        this.model.onMiss(game => {
            let score = this.model.getScore();
            let miss = this.model.getMisses();
            document.getElementById("currentScore").replaceWith(this.renderScore())
        })

    }

    async getUsername() {
        let name = await getName() ; 
        name = name.data;
        return name;
    }

    async landingPage() {
        //overall id tag with div that holds everything. used to replace things
        let content = document.createElement("div") ;
        content.setAttribute("id", "landingPage");

         //start button or sign in/up buttons
         //VARIABLE FOR TESTING
         //
         //
        // let signedIn = await this.areyousignedin()
        // console.log(signedIn);
        let signedIn = true;
        let username = await this.getUsername();

        if (signedIn) {
            //this div gets the spacing right
            let buttonDiv = document.createElement("div");
            buttonDiv.setAttribute("class", "startPadding")

            let button = document.createElement("button");
            button.setAttribute("class", "button is-large is-fullwidth growButton ");
            button.setAttribute("id", "start");
            button.innerHTML = "Welcome back, " + username + ", Ready to Play?";
            button.addEventListener("click", this.startGame);

            //adds button to main page
            buttonDiv.appendChild(button)
            content.appendChild(buttonDiv) ;
        } else {
            //this div gets spacing right
            let buttonsDiv = document.createElement("div");
            buttonsDiv.setAttribute("class", "startPadding");

            let dosButtons = document.createElement("div");
            dosButtons.setAttribute("class", "columns");

            let leftSpace = document.createElement("div");
            leftSpace.setAttribute("class", "column");

            let button1 = document.createElement("button");
            button1.setAttribute("class", "button is-large is-fullwidth growButton");
            button1.setAttribute("id", "start");
            button1.innerHTML = "Make an Account";
            button1.addEventListener("click", this.loadLoginPage);

            leftSpace.appendChild(button1);
            dosButtons.appendChild(leftSpace);

            let rightSpace = document.createElement("div");
            rightSpace.setAttribute("class", "column");

            let button2 = document.createElement("button");
            button2.setAttribute("class", "button is-large is-fullwidth growButton");
            button2.setAttribute("id", "start");
            button2.innerHTML = "Sign into your Account";
            button2.addEventListener("click", this.loadLoginPage);

            rightSpace.appendChild(button2);
            dosButtons.appendChild(rightSpace);
            buttonsDiv.appendChild(dosButtons)
            content.appendChild(buttonsDiv);
        }

       
        
        //lower box contains howto and leaderboard button
        let lowerBox = document.createElement("div");
        lowerBox.setAttribute("class", "");

        let boxDiv = document.createElement("div");
        boxDiv.setAttribute("class", "box");

        let sectionDiv = document.createElement("div");
        sectionDiv.setAttribute("class", "howToPadding");
        sectionDiv.innerHTML = '<h1 class="howToTitle">How to Play!</h1>';

        let containerDiv = document.createElement("div");
        containerDiv.setAttribute("class", "container");

        let contentList = document.createElement("dl");
        contentList.setAttribute("class", "content is-large");
        contentList.innerHTML = `   <li>Move the Ram Side to Side using 'A' and 'D' or Left and Right Arrow keys</li>
                                    <li>Headbutt the Dookies storming the court! They are having a hard time accepting their L!
                                    <li>If 3 Dookies get by you, it's game over!</li>
                                    <li>Headbutt Enough Dookies to Earn a spot on the Leaderboard!</li>`


        let boardLink = document.createElement("div");
        boardLink.setAttribute("class", "boardLinkPadding"); 
        boardLink.innerHTML = ` <h1 class="leaderboard">
                                    <a href="./leaderboard.html">View the Leaderboard</a>
                                </h1>`

        //combines all the stuff in the lower box
        containerDiv.appendChild(contentList);
        containerDiv.appendChild(boardLink);
        sectionDiv.appendChild(containerDiv);
        boxDiv.appendChild(sectionDiv);
        lowerBox.appendChild(boxDiv);

        //adds all contents to one item and returns the item
        content.appendChild(lowerBox);
        this.$root = document.getElementById("root");
        this.$root.appendChild(content) ;
        return;
    }

    async scorePage() {
        //for testing view of the score board
        let data = await getAllScores();
        data = data.data;
        // let data = [
        //     {
        //         username: "DrJazzy",
        //         score: 420
        //     },
        //     {
        //         username: "LazyCow",
        //         score: 419
        //     },
        //     {
        //         username: "PogChamp420",
        //         score: 365
        //     },
        //     {
        //         username: "poopyhead",
        //         score:  204
        //     },
        //     {
        //         username: "imBad",
        //         score: 3
        //     }
        // ];
        //creates the overall id tag
        let page = document.createElement("div");
        page.setAttribute("id", "scorePage");

        //play again
        let buttonDiv = document.createElement("div"); 

        let againButton = document.createElement("button");
        againButton.setAttribute("class", "button is-large is-fullwidth growButton");
        againButton.setAttribute("id", "playAgain");
        againButton.innerHTML = "Wanna try Again, {username}?";
        againButton.addEventListener("click", this.tryAgain)

        buttonDiv.appendChild(againButton);

        //div for columns to separate them from button
        let lowerContent = document.createElement("div");
        lowerContent.setAttribute("class", "section");

        //overall column div
        let columnsDiv = document.createElement("div");
        columnsDiv.setAttribute("class", "columns")

        //left ram graphic
        let leftRam = document.createElement("div");
        leftRam.setAttribute("class", "column");
        let leftBox = document.createElement("div");
        leftBox.setAttribute("class", "box devilCenter");
        leftBox.innerHTML = "<img class='leftDevil' src='../images/devil.png'>";
        leftRam.appendChild(leftBox);

        //right ram graphic
        let rightRam = document.createElement("div");
        rightRam.setAttribute("class", "column");
        let rightBox = document.createElement("div");
        rightBox.setAttribute("class", "box devilCenter");
        rightBox.innerHTML = "<img src='../images/devil.png'>";
        rightRam.appendChild(rightBox);
        

        //middle column info
        let middleInfo = document.createElement("div");
        middleInfo.setAttribute("class", "column is-half");
        //ygets score
        let yourScore = document.createElement("div");
        yourScore.setAttribute("class", "box");
        yourScore.innerHTML = '<p class="yourScore">Your Score:'+ this.model.getScore() +'</p>';
        //kanye quote
        let kanyeQuote = document.createElement("div");
        kanyeQuote.setAttribute("class", "content");
        kanyeQuote.innerHTML = "Hard Loss? <a href='./inspiration.html'>Maybe Kanye West could make you feel better.</a>";


        let leaderBoard = document.createElement("div");
        leaderBoard.setAttribute("class", "box");
        leaderBoard.innerHTML = "<p class='yourScore'>Top 5 Scores</p>";

        let leaderTable = document.createElement("table");
        leaderTable.setAttribute("class", "table is-fullwidth is-hoverable"); 

        //will the array be pre-sorted?
        /**TODO 
         * change for loop to a length of 5
         * make sure the data is sorted starting with the
         * largest value
         */
        console.log(data);
        let temp = "";
        for (let i = 0 ; i < data.length ; i++) {
            let name = data[i].user;
            let score = data[i].score;

            temp = temp + '<tr> <td>'+name+'</td><td>'+score+'</td></tr>';
        }
        
        let linktoWhole = document.createElement("div");
        linktoWhole.setAttribute("class", "content");
        linktoWhole.innerHTML = "<a href='../leaderboard.html'>View Full Leaderboard</a>"


        leaderTable.innerHTML = temp;

        leaderBoard.appendChild(leaderTable);
        leaderBoard.appendChild(linktoWhole);

        //combines everything into one doc element, lowerContent
        yourScore.appendChild(kanyeQuote);
        middleInfo.appendChild(yourScore);
        middleInfo.appendChild(leaderBoard);
       
        columnsDiv.appendChild(leftRam);
        columnsDiv.appendChild(middleInfo);
        columnsDiv.appendChild(rightRam);

        lowerContent.appendChild(columnsDiv);

        
        //appends everything to main 
        page.appendChild(buttonDiv);
        page.appendChild(lowerContent);
        this.$root.appendChild(page);

        // Replaces the game with the scorePage
        document.getElementById("game").replaceWith(page);
    }

    tryAgain() {
        location.reload();
    }; 
    
    loadLoginPage(){
        location.href = "../login.html"
     
    }
    
}
