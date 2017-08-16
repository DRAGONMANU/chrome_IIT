chrome.contextMenus.create({
  id: "Toolkit",
  title: "Toolkit",
  contexts:["selection"],
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
		//alert(proxy);		
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

