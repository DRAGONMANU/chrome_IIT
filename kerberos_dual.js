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

setTimeout(function() 
{
 	document.getElementsByName("userid")[0].value = userid;
	document.getElementsByName("pass")[0].value = pass;
	if(auto)
		button.click();
}, delayMillis);
