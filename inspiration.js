/**
 * load in kanye west api 
 * render a page with a quote from it
 * 
 *  yes this is happening
 * 
 * I am going to fix some of the styling for this
 * but i want to finish other stuff first like the 
 * death screen 
 */

const getQuote = async function() {
    try {
        const result = await axios({
            method: 'get',
            url: 'https://api.kanye.rest',
        });
        return result;

    } catch (error) {
        return error;
    }
}

const renderQuote = function(quote) {
    let whole = document.createElement("article");
    whole.setAttribute("id", "kanyeQuote");

    let hero = document.createElement("section");
    hero.setAttribute("class", "hero is-fullheight");

    let heroBody = document.createElement("div");
    heroBody.setAttribute("class", "hero-body");

    let container = document.createElement("div");
    container.setAttribute("class", "container");

    let textBody = document.createElement("h1");
    textBody.setAttribute("class", "title is-primary")
    textBody.innerText = quote ; 

    let author = document.createElement("h5");
    author.setAttribute("class", "subtitle is-italic");
    author.innerText = " - Kanye Omari West";

    let backDiv = document.createElement("div");
    backDiv.setAttribute("class", "content");
    backDiv.innerHTML = "<h1><a href=./game.html>Play Again</a></h1>"


    container.appendChild(textBody);
    container.appendChild(author);
    heroBody.appendChild(container);
    hero.appendChild(heroBody)
    hero.appendChild(backDiv)
    whole.appendChild(hero);

    return whole;
}

const domLoader = async function() {
    let $root = document.getElementById("root");

    let quote = await getQuote();
    console.log(quote);
    let blockquote = renderQuote(quote.data);

    $root.appendChild(blockquote);
}

domLoader();