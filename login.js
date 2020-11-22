import {login, signup} from './APIcalls.js'

const renderContent = function() {
    let whole = document.createElement("div");
    whole.setAttribute("class", "loginPadding");

    let box = document.createElement("div");
    box.setAttribute("class", "box loginContentPadding");

    //username 
    let userText = document.createElement("p");
    userText.setAttribute("class", "loginLabels");
    userText.innerText = "Username"

    let username = document.createElement("input");
    username.setAttribute("class", "input");
    username.setAttribute("placeholder", "Username");
    username.setAttribute("id", "usernameField");

    //password
    let passText = document.createElement("p");
    passText.setAttribute("class", "loginLabels");
    passText.innerText = "Password"

    let password = document.createElement("input");
    password.setAttribute("class", "input");
    password.setAttribute("placeholder", "Password");
    password.setAttribute("id", "passwordField");
    


    //button stuff

    let buttonSection = document.createElement("div");
    buttonSection.setAttribute("class", "section");

    let buttonDiv = document.createElement("div");
    buttonDiv.setAttribute("class", "columns")

    let leftButton = document.createElement('div');
    leftButton.setAttribute("class", "column");

    let signUp = document.createElement("button");
    signUp.setAttribute("id", "signUp");
    signUp.setAttribute("class", "button is-medium is-fullwidth growButton");
    signUp.innerText = "Sign Up"
    signUp.addEventListener("click", handleSignUp);


    leftButton.appendChild(signUp);
    buttonDiv.appendChild(leftButton);

    let rightButton = document.createElement('div');
    rightButton.setAttribute("class", "column");

    let signIn = document.createElement("button");
    signIn.setAttribute("id", "Login");
    signIn.setAttribute("class", "button is-medium is-fullwidth growButton");
    signIn.innerText = "Login"
    signIn.addEventListener("click", handleLogin);


    rightButton.appendChild(signIn);
    buttonDiv.appendChild(rightButton);
    buttonSection.appendChild(buttonDiv)

        
    box.appendChild(userText);
    box.appendChild(username);
    box.appendChild(passText);
    box.appendChild(password);
    box.appendChild(buttonSection);
    whole.appendChild(box);
    return whole;
}   

const handleLogin = async function() {
    let username = document.getElementById("usernameField").value;
    let password = document.getElementById("passwordField").value ;
    //console.log( username + " " + password);
    let result = await login(username, password);

    if (result.data == true) {
        location.href = "./game.html"
    }
}

const handleSignUp = async function() {
    let username = document.getElementById("usernameField").value;
    let password = document.getElementById("passwordField").value ;
    //console.log( username + " " + password);
    let result = await signup(username, password);

    if (result.data == true) {
        handleLogin();
    }
}

const domLoader = function() {
    let $root = document.getElementById("root") ; 
    let content = renderContent() ;
    $root.appendChild(content); 
}

domLoader();