window.onload = function() {

	var userid = "";
	chrome.storage.sync.get('username',function (data) {
		userid=data.username;
	});

	var password = "";
	chrome.storage.sync.get('password',function (data) {
		password=data.password;
	});
	var auto1 = false;
	chrome.storage.sync.get('auto',function (data) {
	auto1=data.auto;
	});
	var proxy = false;
	chrome.storage.sync.get('proxy',function (data) {
	proxy=data.proxy;
	});
	var dual = false;
	chrome.storage.sync.get('dual', function(data){
		dual=data.dual;
	});
	var moodle = false;
	chrome.storage.sync.get('moodle',function (data) {
	moodle=data.moodle;
	});

	var webmail = false;
	chrome.storage.sync.get('webmail',function (data) {
	webmail=data.webmail;
	});
	
	var delayMillis = 10;
	setTimeout(function() {

		if(typeof userid==="undefined")
			userid = 'Enter Kerebros username';
		
	 	document.getElementById('username').value = userid;
	 	document.getElementById('password').value = password;
	 	document.getElementById('autologin').checked = auto1;
		document.getElementById('proxy').checked = proxy;
		document.getElementById('dual').checked = dual;
		document.getElementById('moodle').checked = moodle; 
		document.getElementById('webmail').checked = webmail; 
	}, delayMillis);

	document.getElementById('proxy').onclick = function() {
		var proxy = document.getElementById('proxy').checked;
	    chrome.storage.sync.set({'proxy': proxy},function() {});
	    //console.log(proxy);
	    chrome.runtime.sendMessage('proxy');
	}
	document.getElementById('dual').onclick = function() {
		var dual = document.getElementById('dual').checked;
	    chrome.storage.sync.set({'dual': dual},function() {});
	    //console.log(dual);
	    chrome.runtime.sendMessage('dual');
	}
	document.getElementById('moodle').onclick = function() {
		var moodle = document.getElementById('moodle').checked;
	    chrome.storage.sync.set({'moodle': moodle},function() {});
	    //console.log(moodle);
		chrome.runtime.sendMessage('moodle');
	}
	
	document.getElementById('webmail').onclick = function() {
		var webmail = document.getElementById('webmail').checked;
	    chrome.storage.sync.set({'webmail': webmail},function() {});
	    //console.log(webmail);
		chrome.runtime.sendMessage('webmail');
	}
	
	
  	document.getElementById('save').onclick = function() {
    var username = document.getElementById('username').value;
    var pass = document.getElementById('password').value;
    var auto = document.getElementById('autologin').checked;
    chrome.storage.sync.set({'username': username},function() {});
    chrome.storage.sync.set({'password': pass},function() {}); 
    chrome.storage.sync.set({'auto': auto},function() {}); 
  	};
}