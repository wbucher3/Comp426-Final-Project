# Comp426-Final-Project
Final Project for Comp426 at UNC - Chapel Hill

<b> Group:</b><br>
	Rebekah Seawell<br>
	William Bucher<br>

<b>Description:</b><br>
	Hit the Dookies and last as long as you can!

<b>API Documentation:</b><br>

<ol>
<li><b>getAllScores</b></li>
<em>Purpose:</em><br>
	Retrieves a list of all of the scores as an object array.<br>
<em>Endpoint:</em><br>
	GET https://comp426projectbackend.herokuapp.com/allScores<br>
<em>Request Params:</em><br>
	This route does not accept request params.<br>
<em>Response:</em><br>
	Responds with an array containing the selected scores.<br><br>

<li><b>getName</b></li>
<em>Purpose:</em><br>
	Retrieves the username of the current user.<br>
<em>Endpoint:</em><br>
	GET https://comp426projectbackend.herokuapp.com/user<br>
<em>Request Params:</em><br>
	This route does not accept request params.<br>
<em>Response:</em><br>
	Responds with a string that is the current user's username.<br><br>

<li><b>getSearchData</b></li>
<em>Purpose:</em><br>
	Retrieves the username that corresponds closely to the search term given.<br>
<em>Endpoint:</em><br>
	GET https://comp426projectbackend.herokuapp.com/search/:searchTerm<br>
	Note: Replace ":searchTerm" in the above route with the search term of the usernames to find.<br>
<em>Request Params:</em><br>
	This route does not accept request params, but the search term of the username must be specified in the URL.<br>
<em>Response:</em><br>
	Responds with an array of usernames that match the search term.<br><br>
	
<li><b>postScore</b></li>
<em>Purpose:</em><br>
	Creates a user's first score from the game.<br>
<em>Endpoint:</em><br>
	POST https://comp426projectbackend.herokuapp.com/score<br>
<em>Request Params:</em><br>
	score (number) - Required. The score the user received at the end of their first game.<br>
<em>Response:</em><br>
	Responds with an array of all the IDs of the user's scores.<br><br>

<li><b>updateScore</b></li>
<em>Purpose:</em><br>
	Updates the highest score the user has made.<br>
<em>Endpoint:</em><br>
	PUT https://comp426projectbackend.herokuapp.com/score/:id<br>
	Note: Replace ":id" in the above route with the id of the user's score.<br>
<em>Request Params:</em><br>
	score (number) - Required. The score the user received that is higher than their current top score.<br>
<em>Response:</em><br>
	Responds with the score object.<br><br>

<li><b>signup</b></li>
<em>Purpose:</em><br>
	Creates a new account.<br>
<em>Endpoint:</em><br>
	POST https://comp426projectbackend.herokuapp.com/signup<br>
<em>Request Params:</em><br>
	username (string) - Required. The username of the new account with a max of 12 characters.<br>
	password (string or number) - Required. The password of the new account.<br>
<em>Response:</em><br>
	Upon successful creation, this route responds with true.<br><br>

<li><b>login</b></li>
<em>Purpose:</em><br>
	Login to the user's account.<br>
<em>Endpoint:</em><br>
	POST https://comp426projectbackend.herokuapp.com/login<br>
<em>Request Params:</em><br>
	username (string) - Required. The username of the existing account with a max of 12 characters.<br>
	password (string or number) - Required. The password of the existing account.<br>
<em>Response:</em><br>
	Upon successful login, this route responds with true.<br><br>

<li><b>logOut</b></li>
<em>Purpose:</em><br>
	Log out of the current user's account.<br>
<em>Endpoint:</em><br>
	GET https://comp426projectbackend.herokuapp.com/logout<br>
<em>Request Params:</em><br>
	This route does not accept request params.<br>
<em>Response:</em><br>
	Upon successfully logging out, this route responds with true.<br><br>

<li><b>checkLogin</b></li>
<em>Purpose:</em><br>
	Check if the user is currently logged into their account.<br>
<em>Endpoint:</em><br>
	GET https://comp426projectbackend.herokuapp.com/checkLogin<br>
<em>Request Params:</em><br>
	This route does not accept request params.<br>
<em>Response:</em><br>
	Response with a boolean of true or false depending on if the user is logged in.<br><br>
</ol>
