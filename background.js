/*
chrome.contextMenus.create({
  id: "Toolkit",
  title: "Toolkit",
  contexts:["selection"],
});
*/
var assignment = [];
var subject = [];
var deadline = [];
var link = [];
var number = 0;
var unread = 0;
var lastno = -1;
var first = true;
var looptime = 3000*60*60;  //3 hour time limit
var moodle = false;
var webmail = false;
var exist = false;

$(function() {	
	engine();
	setInterval(engine,looptime);
});

function engine() {
	chrome.storage.sync.get('moodle',function (data) {
		moodle=data.moodle;
	});
	chrome.storage.sync.get('webmail',function (data) {
		webmail=data.webmail;
	});	
	var delayMillis = 10;
	setTimeout(function() {
		if(moodle) {
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
					chrome.notifications.create("https://moodle.iitd.ac.in/login/index.php",firstTime);
				}
				else {
					chrome.notifications.clear("https://moodle.iitd.ac.in/login/index.php",function(){});
					console.log('logged');
					//$data = $(htmlData).find('.content').eq($data = $(htmlData).find('.content').length-1); // 8 is for upcoming activities
					$data = $(htmlData).find('.block_calendar_upcoming'); // 8 is for upcoming activities
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
					//$('body').append($data);
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
		}
		if(webmail) {
			var url = '';
			chrome.tabs.getAllInWindow(undefined, function(tabs) {
				for (var i = 0, tab; tab = tabs[i]; i++) {
					url = tab.url;		
					if(url.indexOf("webmail")!=-1)
						exist = true;
				}
			});
			if(!exist) {
				exist = false;
				$.get('https://webmail.iitd.ac.in/roundcube/?_task=mail&_mbox=INBOX',function(data) {
					var htmlData = data;
					if($data = $(htmlData).find('.button-logout').length == 0) {
						console.log('null');
						var firstTime = {
							type: "basic",
							title: "Webmail Notifier",
							message: "PLease click to login and receive notifications",
							iconUrl: "webmail.png",
							isClickable: true,
							requireInteraction: true
						}
						chrome.notifications.create("https://webmail.iitd.ac.in/roundcube/",firstTime);
					}
					else {
						var count = '';
						chrome.notifications.clear("https://webmail.iitd.ac.in/roundcube/",function(){});
						console.log('logged');
						count = ($(htmlData).find('span.unreadcount').eq(0).text()); // last one is for upcoming activities
						if(count.length==0)
							unread = 0;
						else
							unread = parseInt(count);
					}
				});
				if(unread > 0)
				{
					var noti = {
						type: "basic",
						title: "Webmail messages",
						message: "You have some new messages",
						iconUrl: "webmail.png",
						isClickable: true,
						requireInteraction: true	
					}
					chrome.notifications.create('https://webmail.iitd.ac.in/roundcube/?_task=mail&_mbox=INBOX',noti);
				}
			}
		}
	}, delayMillis);
};

chrome.notifications.onClicked.addListener(function(notificationId, byUser) {
	chrome.tabs.create({url: notificationId});
	chrome.notifications.clear(notificationId,function(){});
});
/*
chrome.contextMenus.onClicked.addListener(function myFunction(selectedText) {
    alert('Hey! You just clicked me\n'+ selectedText.selectionText);
});
*/
chrome.runtime.onMessage.addListener(function(response, sender, sendResponse) {
	//console.log(response);	
	if(response=='proxy') {
		var proxy = false;
		chrome.storage.sync.get('proxy',function (data) {
		
		proxy=data.proxy;
		});
		var dual = false;
		chrome.storage.sync.get('proxy',function (data) {
			dual=data.dual;
		});
		var delayMillis = 10;
		setTimeout(function() {
			if(proxy) {
				if (!dual){
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
						mode: "pac_script",
						pacScript: {
							url : "http://www.cc.iitd.ernet.in/cgi-bin/proxy.dual",
							mandatory : true
						}
					};
				}
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
	}
	if (response=='moodle') {
		engine();
	}
	if (response=='webmail') {
		engine();
	}
});


