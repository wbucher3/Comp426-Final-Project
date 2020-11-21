import {getAllScores, getSearchData, getName, logOut} from "./APIcalls.js" 
 
const playAgain = function() {
    window.location.href = './game.html';
}



//inspiration from  https://www.w3schools.com/howto/howto_js_autocomplete.asp
//convert their html to es6 
const renderSearchBar = function() {
    let mainForm = document.createElement("form");
    mainForm.setAttribute("autocomplete", "off");

    let innerDiv = document.createElement("div");
    innerDiv.setAttribute("class", "autocomplete");
    innerDiv.setAttribute("style", "width:100%;")


    let searchBar = document.createElement("input");
    searchBar.setAttribute("class", "input");
    searchBar.setAttribute("placeholder", "Search for User...");
    searchBar.setAttribute("id", "searchBar");

    innerDiv.appendChild(searchBar);
    mainForm.appendChild(innerDiv);


    return mainForm
}


/**this code is from 
 * https://www.w3schools.com/howto/howto_js_autocomplete.asp
 */
const getAutoCompleteScript = function(array) {
    return `
    
    function autocomplete(inp, arr) {
        /*the autocomplete function takes two arguments,
        the text field element and an array of possible autocompleted values:*/
        var currentFocus;
        /*execute a function when someone writes in the text field:*/
        inp.addEventListener("input", function(e) {
            var a, b, i, val = this.value;
            /*close any already open lists of autocompleted values*/
            closeAllLists();
            if (!val) { return false;}
            currentFocus = -1;
            /*create a DIV element that will contain the items (values):*/
            a = document.createElement("DIV");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");
            /*append the DIV element as a child of the autocomplete container:*/
            this.parentNode.appendChild(a);
            /*for each item in the array...*/
            for (i = 0; i < arr.length; i++) {
              /*check if the item starts with the same letters as the text field value:*/
              if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
              }
            }
        });
        /*execute a function presses a key on the keyboard:*/
        inp.addEventListener("keydown", function(e) {
            var x = document.getElementById(this.id + "autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode == 40) {
              /*If the arrow DOWN key is pressed,
              increase the currentFocus variable:*/
              currentFocus++;
              /*and and make the current item more visible:*/
              addActive(x);
            } else if (e.keyCode == 38) { //up
              /*If the arrow UP key is pressed,
              decrease the currentFocus variable:*/
              currentFocus--;
              /*and and make the current item more visible:*/
              addActive(x);
            } else if (e.keyCode == 13) {
              /*If the ENTER key is pressed, prevent the form from being submitted,*/
              e.preventDefault();
              if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
              }
            }
        });
        function addActive(x) {
          /*a function to classify an item as "active":*/
          if (!x) return false;
          /*start by removing the "active" class on all items:*/
          removeActive(x);
          if (currentFocus >= x.length) currentFocus = 0;
          if (currentFocus < 0) currentFocus = (x.length - 1);
          /*add class "autocomplete-active":*/
          x[currentFocus].classList.add("autocomplete-active");
        }
        function removeActive(x) {
          /*a function to remove the "active" class from all autocomplete items:*/
          for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
          }
        }
        function closeAllLists(elmnt) {
          /*close all autocomplete lists in the document,
          except the one passed as an argument:*/
          var x = document.getElementsByClassName("autocomplete-items");
          for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
              x[i].parentNode.removeChild(x[i]);
            }
          }
        }
        /*execute a function when someone clicks in the document:*/
        document.addEventListener("click", function (e) {
            closeAllLists(e.target);
        });
      }
      
      var names = [`+ array +`];
      autocomplete(document.getElementById("searchBar"), names);
      
    `
}

const handleLogOut = async function() {
  await logOut();
  window.location.href = '../index.html';
}



const renderTable = function(inputData, name) {

    //sorts data from largest to smallers
    let data = inputData.sort(function(a, b){return b.score-a.score});

    let table = document.createElement("table"); 
    table.setAttribute("class", "table is-fullwidth is-hoverable"); 
    table.setAttribute("id", "table");

    if (data.length === 0) {
        let messageReturn = document.createElement("p");
        messageReturn.setAttribute("class", "p");
        messageReturn.innerText = "No Scores in Database from the Username of '" + name + "'";
        return messageReturn;
    }

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

    let logOutDiv = document.createElement("div");
    logOutDiv.setAttribute("class", "logOutLeaderBoardPadding"); 

    let logOutButton = document.createElement("button");
    logOutButton.setAttribute("class", "button is-fullwidth growButton");
    logOutButton.setAttribute("id", "logout");
    logOutButton.innerText = "Logout"
    logOutButton.addEventListener("click", handleLogOut)
    logOutDiv.appendChild(logOutButton);


    let page = document.createElement("div");
    page.setAttribute("class", "content leaderBoardPadding");


    let controlDiv = document.createElement("div");
    controlDiv.setAttribute("class", "control searchBarPadding");

    let searchBar = renderSearchBar();

    let people = data.map(person => '"'+person.user +'"');


    let barScript = document.createElement("script");
    barScript.innerHTML = getAutoCompleteScript(people);

    let searchButton = document.createElement("button");
    searchButton.setAttribute("class", "button is-fullwidth growButton");
    searchButton.innerHTML = "Search";
    searchButton.setAttribute("id", "searchButton")
    searchButton.addEventListener("click", handleRenderTable)


    controlDiv.appendChild(logOutDiv);
    controlDiv.appendChild(searchBar);

    
    controlDiv.appendChild(barScript);
    controlDiv.appendChild(searchButton);

    let boxxer = document.createElement("div");
    boxxer.setAttribute("class", "box" );

    boxxer.innerHTML = "<p class='leaderBoardTitle'>Scores</p>";

    let table = renderTable(data, "");

    
    
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
        document.getElementById("table").replaceWith(renderTable(data.data, searchTerm));

    } else {
        let data = await getSearchData(searchTerm);
        document.getElementById("table").replaceWith(renderTable(data.data, searchTerm));
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