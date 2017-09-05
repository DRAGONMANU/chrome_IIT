var body = document.body;
var textContent = body.textContent;

var n = textContent.search("Please ");
var myString = textContent.substring(n, n+40);
var splits = myString.split(' ', 10);
var add = textContent.search("Please add");
var enter1 = textContent.search("Please enter first");
var enter2 = textContent.search("Please enter second");
var subtract = textContent.search("Please subtract");
var nameValue = "100";

if(add!=-1)
{
	nameValue = parseInt(splits[4],10)+parseInt(splits[6],10);
}
else if(subtract!=-1)
{
	nameValue = parseInt(splits[4],10)-parseInt(splits[6],10);
}
else if(enter1!=-1)
{
	nameValue = parseInt(splits[6],10);
}
else
{
	nameValue = parseInt(splits[8],10);
}

var delayMillis = 10;


var userid = "";
chrome.storage.sync.get('username',function (data) {
	userid=data.username;
});

var pass = "";
chrome.storage.sync.get('password',function (data) {
	pass=data.password;
});

var auto = false;
chrome.storage.sync.get('auto',function (data) {
	auto=data.auto;
});

var button = document.getElementById("loginbtn");

var m = textContent.search("Invalid login");
setTimeout(function() {
	document.getElementsByName("username")[0].value = userid;
	document.getElementsByName("password")[0].value = pass;
 	document.getElementById("valuepkg3").value = nameValue;
 	if(auto & m==-1)
		button.click();
<<<<<<< HEAD
	if(m!=-1)
		alert("Please check your username and password in the extension settings");
=======
>>>>>>> origin/master
}, delayMillis);
