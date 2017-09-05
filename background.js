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
var looptime = 100000;  //100 second time limit
var moodle = false;
var webmail = false;
var exist = false;
var mute = false;

$(function() {	
	engine();
	setInterval(engine,looptime);
});

function audioNotification(){
    var yourSound = new Audio('noti2.mp3');
    if(!mute){
		yourSound.play();
	}
}
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
			/* 	var textContent = htmlData;
				//alert($('#valuepkg3').text());
				//alert($(htmlData).find('#loginbtn').length);

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

				setTimeout(function() {
					$(data).find("#username").eq(0).attr('value',userid);
					$(data).find("#password").eq(0).attr('value',pass);
					$(data).find("#valuepkg3").eq(0).attr('value',nameValue);
					$(data).find("#username").val('asd');
					console.log($(data).find("#username").val());
					console.log($(data).find("#password").val());
					console.log($(data).find("#valuepkg3").val());					
					// $("#username").attr('value', userid);
					// $("#password").val(pass);
					// $("#valuepkg3").attr('value', nameValue);
					// console.log($("#username").text());
					// console.log($("#password").text());
					// console.log($("#valuepkg3").text());
					//alert($(data).text());
					//$("#loginbtn").click();
					$("#login").submit();
				}, delayMillis); */
				if($data = $(htmlData).find('.content').length == 0) {
					console.log('null');
					var firstTime = {
						type: "basic",
						title: "Moodle Notifier",
						message: "PLease click to login and receive notifications",
						iconUrl: "moodle.png",
						isClickable: true,
						buttons: [
							{ 
								title: 'Mute notifications',
								iconUrl: 'mute.png'
							},
							{ 
								title: 'Block notifications',
								iconUrl: 'block.png'
							},
						],
						requireInteraction: true
					}
					audioNotification();					
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
			}).fail(function(){
				var firstTime = {
					type: "basic",
					title: "Moodle Notifier",
					message: "PLease click to login and receive notifications",
					iconUrl: "moodle.png",
					isClickable: true,
					buttons: [
						{ 
							title: 'Mute notifications',
							iconUrl: 'mute.png'
						},
						{ 
							title: 'Block notifications',
							iconUrl: 'block.png'
						},
					],
					requireInteraction: true
				}
				audioNotification();					
				chrome.notifications.create("https://moodle.iitd.ac.in/login/index.php",firstTime);
			}
			);
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
				audioNotification();									
				}
			}
		}
		if(webmail) {
			var url = '';
			exist = false;
			chrome.tabs.getAllInWindow(undefined, function(tabs) {
				for (var i = 0, tab; tab = tabs[i]; i++) {
					url = tab.url;		
					if(url.indexOf("webmail")!=-1)
						exist = true;
				}
			});
			if(!exist) {
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
							buttons: [
								{ 
									title: 'Mute notifications',
									iconUrl: 'mute.png'
								},
								{ 
									title: 'Block notifications',
									iconUrl: 'block.png'
								},
							],
							requireInteraction: true
						}
						chrome.notifications.create("https://webmail.iitd.ac.in/roundcube/",firstTime);
						audioNotification();											
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
						message: "You have some unread messages",
						iconUrl: "webmail.png",
						isClickable: true,
						buttons: [
							{ 
								title: 'Mute notifications',
								iconUrl: 'mute.png'
							},
							{ 
								title: 'Block notifications',
								iconUrl: 'block.png'
							},
						],
						requireInteraction: true	
					}
					chrome.notifications.create('https://webmail.iitd.ac.in/roundcube/?_task=mail&_mbox=INBOX',noti);
					audioNotification();										
				}
			}
		}
	}, delayMillis);
};

chrome.notifications.onClicked.addListener(function(notificationId, byUser) {
	chrome.tabs.create({url: notificationId});
	chrome.notifications.clear(notificationId,function(){});
});

chrome.notifications.onButtonClicked.addListener(function(notifId, btnIdx) {
	console.log(btnIdx);
	if(btnIdx==1) {
		if(notifId=="https://webmail.iitd.ac.in/roundcube/"){
			webmail = false;
			chrome.storage.sync.set({'webmail': webmail},function() {});			
		}
		if(notifId=="https://moodle.iitd.ac.in/login/index.php"){
			moodle = false;
			chrome.storage.sync.set({'moodle': moodle},function() {});			
		}
	}
	if(btnIdx==0) {
		mute = true;
	}
	chrome.notifications.clear(notifId,function(){});
});

/*
chrome.contextMenus.onClicked.addListener(function myFunction(selectedText) {
    alert('Hey! You just clicked me\n'+ selectedText.selectionText);
});
*/
chrome.runtime.onMessage.addListener(function(response, sender, sendResponse) {
	//console.log(response);	
	// if(response=='proxy') {
	// 	var proxy = false;
	// 	chrome.storage.sync.get('proxy',function (data) {
		
	// 	proxy=data.proxy;
	// 	});
	// 	var delayMillis = 10;
	// 	setTimeout(function() {
	// 		if(proxy) {
	// 			var config = {
	// 				mode: "pac_script",
	// 				pacScript: {
	// 					url : "http://www.cc.iitd.ernet.in/cgi-bin/proxy.btech",
	// 					mandatory : true
	// 				}
	// 			};
	// 		}
	// 		else {
	// 			var config = {
	// 				mode: "direct"
	// 			};
	// 		}
	// 		chrome.proxy.settings.set(
	// 			{value: config},
	// 			function() {}
	// 		);
	// 	}, delayMillis);
	// }
	if (response=='moodle') {
		forcemoodle = true;
		engine();
	}
	if (response=='webmail') {
		engine();
	}
});


