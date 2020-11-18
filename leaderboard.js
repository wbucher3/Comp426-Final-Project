/**this view assumes each entry has the attributes 
 *  object {
 *      id: number, (just numerate like they did for twitter, idk if we need this)
 *      name: string,
 *      score: number,
 *      }
 * 
 * maybe a date field???
 */

//gets the data from the backend

import {getAllScores, getSearchData, getName} from "./APIcalls.js" 



 
const playAgain = function() {
    window.location.href = './game.html';
}



const renderTable = function(data) {
    let table = document.createElement("table"); 
    table.setAttribute("class", "table is-fullwidth is-hoverable"); 
    table.setAttribute("id", "table");

    for (let i = 0 ; i < data.length ; i++) {
        let overall = document.createElement("tr");

        let name = document.createElement("td");
        name.innerText = data[i].user;

        let score = document.createElement("td");
        score.innerText = data[i].score ; 

        overall.appendChild(name);
        overall.appendChild(score);

        table.appendChild(overall);

    }
    return table;
}

//rough draft of what rendering the leaderboard might be
const renderPage = async function(data) {
    let username = await getName() 
    username = username.data ;

    let whole = document.createElement("div"); 

    let buttonDiv = document.createElement("div"); 

    let againButton = document.createElement("button");
    againButton.setAttribute("class", "button is-large is-fullwidth growButton");
    againButton.setAttribute("id", "playAgain");
    againButton.innerHTML = "Play Again, " + username + "?";
    againButton.addEventListener("click", playAgain);

    buttonDiv.appendChild(againButton);


    let page = document.createElement("div");
    page.setAttribute("class", "content leaderBoardPadding");


    let controlDiv = document.createElement("div");
    controlDiv.setAttribute("class", "control searchBarPadding");

    let searchBar = document.createElement("input");
    searchBar.setAttribute("class", "input");
    searchBar.setAttribute("placeholder", "Search for User...");
    searchBar.setAttribute("id", "searchBar");

    let searchButton = document.createElement("button");
    searchButton.setAttribute("class", "button is-fullwidth growButton");
    searchButton.innerHTML = "Search";
    searchButton.setAttribute("id", "searchButton")
    searchButton.addEventListener("click", handleRenderTable)

    controlDiv.appendChild(searchBar);
    controlDiv.appendChild(searchButton);

    let boxxer = document.createElement("div");
    boxxer.setAttribute("class", "box" );

    boxxer.innerHTML = "<p class='leaderBoardTitle'>Top 5 Scores</p>";

    let table = renderTable(data);

    
    
    boxxer.appendChild(table);
    page.appendChild(boxxer);
    whole.appendChild(buttonDiv);
    whole.appendChild(controlDiv);
    whole.appendChild(page);

    return whole;

}


const handleRenderTable = async function() {
    let searchTerm = document.getElementById("searchBar").value;
    if (searchTerm.length == 0) {
        let data = await getAllScores();
        document.getElementById("table").replaceWith(renderTable(data.data));

    } else {
        let data = await getSearchData(searchTerm);
        document.getElementById("table").replaceWith(renderTable(data.data));
    }
}
 

//loads everything in
const domLoader = async function() {
    let $root = document.getElementById("root") ; 
    let dataArray = await getAllScores(); 
    
    let tableResult = await renderPage(dataArray.data) ;

    $root.appendChild(tableResult);
}
//kicks off the webpage
domLoader();