chrome.contextMenus.create({
  id: "Toolkit",
  title: "Toolkit",
  contexts:["selection"],
});

var assignment = [];
var subject = [];
var deadline = [];
var link = [];
var number = 0;
var lastno = -1;
var first = true;
var looptime = 7000;  //7 second time limit

$(function() {
	engine();
	setInterval(engine,looptime);
});

function engine() {
	$.get('https://moodle.iitd.ac.in/my/',function(data) {
		var htmlData = data;
		if($data = $(htmlData).find('.content').length == 0) {
			console.log('null');
			var firstTime = {
				type: "basic",
				title: "Moodle Notifier",
				message: "PLease click to login and receive notifications",
				iconUrl: "moodle.png",
				isClickable: true,
				requireInteraction: true
			}
			chrome.notifications.create("https://moodle.iitd.ac.in/login/index.php",firstTime,callback);
		}
		else {

			console.log('logged');
			$data = $(htmlData).find('.content').eq($data = $(htmlData).find('.content').length-1); // 8 is for upcoming activities
			$data.find('.footer').remove();
			for(i=0;i<$data.find('.event').length;i++) {
				subject[i]=($(data).find('.course').eq(i).text());
			}
			for(i=0;i<$data.find('.event').length;i++) {
				deadline[i]=($(data).find('.date').eq(i).text());
			}
			for(i=0;i<$data.find('.event').length;i++) {
				assignment[i]=($(data).find('.event').eq(i).contents().get(1).text);
			}
			for(i=0;i<$data.find('.event').length;i++) {
				link[i]=($(data).find('.event').eq(i).contents().get(1).href);
			}
			number = $data.find('.event').length;
		}

	});
	if(lastno!=number)
	{
		lastno = number;
		for(i=0;i<number;i++) {
		var noti = {
			type: "basic",
			title: assignment[i],
			contextMessage: deadline[i],
			message: subject[i],
			iconUrl: "moodle.png",
			isClickable: true,
			requireInteraction: true	
		}
		chrome.notifications.create(link[i],noti);
		}
	}
};

chrome.notifications.onClicked.addListener(function(notificationId, byUser) {
	chrome.tabs.create({url: notificationId});
	chrome.notifications.clear(notificationId,function(){});
});

chrome.contextMenus.onClicked.addListener(function myFunction(selectedText) {
    alert('Hey! You just clicked me\n'+ selectedText.selectionText);
});

chrome.runtime.onMessage.addListener(function(response, sender, sendResponse) {
	var proxy = false;
	chrome.storage.sync.get('proxy',function (data) {
	proxy=data.proxy;
	});
	var delayMillis = 10;
	setTimeout(function() {
		if(proxy) {
			var config = {
				mode: "pac_script",
				pacScript: {
					url : "http://www.cc.iitd.ernet.in/cgi-bin/proxy.btech",
					mandatory : true
				}
			};
		}
		else {
			var config = {
				mode: "direct"
			};
		}
		chrome.proxy.settings.set(
			{value: config},
			function() {}
		);
	}, delayMillis);
});


