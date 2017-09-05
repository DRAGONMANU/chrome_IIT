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

var delayMillis = 500;
var button = document.getElementsByName("logon")[0];

var body = document.body;
var textContent = body.textContent;

var n = textContent.search("Failed");

setTimeout(function() 
{
	console.log(n);
 	document.getElementsByName("userid")[0].value = userid;
	document.getElementsByName("pass")[0].value = pass;
	if(auto && n==-1)
		button.click();
	if(n!=-1)
		alert("Please check your username and password in the extension settings");
}, delayMillis);
