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

import {getAllScores} from "./APIcalls.js" 

const getData = function() {
    //return an array of data objects 
}

//rough draft of what rendering the leaderboard might be
const renderTable = function(data) {
    let page = document.createElement("div");
    page.setAttribute("class", "content");
    page.setAttribute("id", "table");

    let table = document.createElement("table"); 

    for (let i = 0 ; i < 50 ; i++) {
        let overall = document.createElement("tr");

        let name = document.createElement("td");
        name.innerText = data[i].name;

        let score = document.createElement("td");
        score.innerText = data[i].score ; 

        overall.appendChild(name);
        overall.appendChild(score);

        table.appendChild(overall);

    }

}
 

//loads everything in
const domLoader = async function() {
    let $root = document.getElementById("root") ; 
    let dataArray = await getAllScores(); 
    console.log(dataArray);
  //  let table = renderTable(dataArray.body) ;
}
//kicks off the webpage
domLoader();