var captcha = document.getElementsByClassName('captcha-image')[0];

var delayMillis = 0;

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

var nameValue = 'asd';

setTimeout(function() {
	document.getElementsByName("username")[0].value = userid;
	document.getElementsByName("password")[0].value = pass;
 	document.getElementsByName("captcha")[0].value = nameValue;
}, delayMillis);
