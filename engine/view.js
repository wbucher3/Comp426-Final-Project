/* handle the display of game and webpage */
import {getAllScores, getName, logOut, updateScore, postScore, checkLogin} from "../APIcalls.js" 

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

    async logOut() {
        await logOut();
        window.location.href = '../index.html';
    }

    async sendScore(score) {
        //is there a score post for this user?
        let username = await getName(); 
        username = username.data;

        let data = await getAllScores() ; 
        data = data.data;
        let usernames = data.map(thing => thing.user);
        
        //checks to see if they have a score in database
        let isInData = usernames.includes(username);

        if (isInData) {
            //we are checking to see if their new score is better than old one
            let currentScore = data.filter(thing => thing.user == username );
            
            if (currentScore[0].score < score) {
                //push score
                return await updateScore(currentScore[0].id, score);
            } else {
                return;
            }
            
        } else {
            //this is their first score
            return await postScore(score);
            
        }
    
    }


    startGame = () => {
        //overall id tag
        let app = this.model.getApp().view ;

        let page = document.createElement("article");
        page.setAttribute("id", "game");
        page.setAttribute("class", "game")

        let columnDiv = document.createElement("div");
        columnDiv.setAttribute("class", "columns");

        
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
        scoreBox.setAttribute("class", "box infobox");

        
        scoreBox.appendChild(this.renderScore());
        scoreBoxPosition.appendChild(scoreBox);
        rightcol.appendChild(scoreBoxPosition);


        columnDiv.appendChild(centerCol);
        columnDiv.appendChild(rightcol); 

        page.appendChild(columnDiv);

        //replaces the landing page with the game
        document.getElementById("landingPage").replaceWith(page);

        // Starts the ticker
        this.model.app.ticker.add(delta => this.model.ticks(delta)); 

        // Trying to limit fps so devils won't be extremely fast
        this.model.app.ticker.maxFPS = 59.99;
    
        // Shows score and leaderboared page
        this.model.onLose( async (game) =>  {

            await this.sendScore(this.model.getScore());
            
            this.model.app.ticker.stop();
            this.model.app.destroy(true, true);
            this.scorePage();
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
        let check = await checkLogin();
        
        let content = document.createElement("div") ;
        content.setAttribute("id", "landingPage");

        if (check.data) {
            let username = await this.getUsername();


            //this div gets the spacing right
            let buttonDiv = document.createElement("div");
            buttonDiv.setAttribute("class", "startPadding")

            let button = document.createElement("button");
            button.setAttribute("class", "button is-large is-fullwidth growButton ");
            button.setAttribute("id", "start");
            button.innerHTML = "Hello there, " + username + "! Click Here to Play!";
            button.addEventListener("click", this.startGame);

            //adds button to main page
            buttonDiv.appendChild(button)
            content.appendChild(buttonDiv) ;

        
            
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

            let logOutDiv = document.createElement("div");
            logOutDiv.setAttribute("class", "boardLinkPadding"); 

            let logOutButton = document.createElement("button");
            logOutButton.setAttribute("class", "button growButton");
            logOutButton.setAttribute("id", "logout");
            logOutButton.innerText = "Logout"
            logOutButton.addEventListener("click", this.logOut)
            logOutDiv.appendChild(logOutButton);


            //combines all the stuff in the lower box
            containerDiv.appendChild(contentList);
            containerDiv.appendChild(boardLink);
            containerDiv.appendChild(logOutDiv);
            sectionDiv.appendChild(containerDiv);
            boxDiv.appendChild(sectionDiv);
            lowerBox.appendChild(boxDiv);

            //adds all contents to one item and returns the item
            content.appendChild(lowerBox);
            this.$root = document.getElementById("root");
            this.$root.appendChild(content);
            return;
        } else {
            let container = document.createElement("div");
            container.setAttribute("class", "container has-text-centered");

            let textBody = document.createElement("h1");
            textBody.setAttribute("class", "title is-primary")
            textBody.innerText = "You must be logged in to play!"; 

            let backDiv = document.createElement("div");
            backDiv.setAttribute("class", "content is-size-7");
            backDiv.innerHTML = "<h1><a href=./index.html>Login</a></h1>"

            container.appendChild(textBody);
            container.appendChild(backDiv);

            this.$root = document.getElementById("root");
            this.$root.appendChild(container);
            return;
        }
    }

    async scorePage() {
        //for testing view of the score board
        let inputData = await getAllScores();
        inputData = inputData.data;
       
        //creates the overall id tag
        let page = document.createElement("div");
        page.setAttribute("id", "scorePage");

        //play again
        let buttonDiv = document.createElement("div"); 

        let username = await this.getUsername();

        let againButton = document.createElement("button");
        againButton.setAttribute("class", "button is-large is-fullwidth growButton");
        againButton.setAttribute("id", "playAgain");
        againButton.innerHTML = "Wanna try Again, " +username+"?";
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

        // log out button
        let logOutDiv = document.createElement("div");

        let logOutButton = document.createElement("button");
        logOutButton.setAttribute("class", "button is-small growButton");
        logOutButton.setAttribute("id", "logout");
        logOutButton.innerText = "Logout"
        logOutButton.addEventListener("click", this.logOut)
        logOutDiv.appendChild(logOutButton);

        //next box
        let leaderBoard = document.createElement("div");
        leaderBoard.setAttribute("class", "box");
        leaderBoard.innerHTML = "<p class='yourScore'>Top 5 Scores</p>";

        let leaderTable = document.createElement("table");
        leaderTable.setAttribute("class", "table is-fullwidth is-hoverable"); 

    
        let temp = "";
        let data = inputData.sort(function(a, b){return b.score-a.score});
        for (let i = 0 ; i < 5 ; i++) {
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
        yourScore.appendChild(logOutDiv)
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

    
}
