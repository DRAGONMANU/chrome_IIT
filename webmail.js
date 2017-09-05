var body = document.body;
var textContent = body.textContent;

var n = textContent.search("--\n");
var myString = textContent.substring(n+3, n+110);
var sad = myString.replace("\n"," ").replace("\r"," ").replace(","," ").replace(/(\r\n|\n|\r)/gm," ");
var splits = sad.replace(',',' ').split(' ', 100);

var temp = 0;
var size = splits.length;
for (var i = 0; i < size; i++)
{
	if(temp==2 && (splits[i]=="" || splits[i]==" "))
	{
		splits = splits.slice(0,i-1);
		size = i-1;
		break;
	}
	if(splits[i]=="" || splits[i]==" ")
	{
		temp++;
		continue;
	}
	else
		temp=0;
}

document.getElementsByTagName("td")[6].className = "input";

String.prototype.replaceAt=function(index, char)
{
    var a = this.split("");
    a[index] = char;
    return a.join("");
}

var nameValue = "    ";
var num = 100;
var id=0;
var not = false;
var k=0;
var str = " ";
var re = /("."|-.-|:.:|'.'|\/.\/|_._)/;
var qu = /(.*\?)/;
var count = 0;

for (var i = 0; i < size; i++)
{
	if(splits[i]=="not")
		not = true;
	else if(splits[i]=="chars" && splits[i+2]!="small")
	{
		num=parseInt(splits[i-1],10);
		num = splits[i+2].charCodeAt()-num;
		if(!not)		
		{
			nameValue=nameValue.replaceAt(id,String.fromCharCode(num));
			id++;	
		}
		else
			not = false;
		i = i+2;
	}
	else if(splits[i]=="chars" && splits[i+2]=="small")
	{
		num=parseInt(splits[i-1],10);
		num = splits[i+3].charCodeAt()-num;
		if(!not)		
		{
			nameValue=nameValue.replaceAt(id,String.fromCharCode(num));
			id++;	
		}
		else
			not = false;
		i = i+3;
	}
	else if(re.test(splits[i]) && splits[i+1].charAt(0)=='+')
	{
		num = parseInt(splits[i+1].slice(-1));
		num = num + splits[i].charCodeAt(1);
		if(!not)		
		{
			nameValue=nameValue.replaceAt(id,String.fromCharCode(num));
			id++;
		}
		else
			not = false;
	}
	else if(re.test(splits[i]))
	{
		if(!not)		
		{
			nameValue=nameValue.replaceAt(id,splits[i].charAt(1));
			id++;			
		}
		else
			not = false;		
	}
	else if(qu.test(splits[i]))
	{
		k=i;
	}
	else if(splits[i]=="=")
	{
		count = 0;
		num = parseFloat(splits[i+1]);
		while(i>k+1)
		{
			if(splits[i-2]=="-")
				num = num + parseInt(splits[i-1]);
			if(splits[i-2]=="/")
				num = num * parseInt(splits[i-1]);
			if(splits[i-2]=="*")
				num = num / parseInt(splits[i-1]);
			if(splits[i-2]=="+")
				num = num - parseInt(splits[i-1]);
			i=i-2;
			count=count+2;

		}
		nameValue=nameValue.replaceAt(id,num.toString());
	 	id++;
	 	i = i + count;
	}
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

var delayMillis = 10;
var button = document.getElementById("rcmloginsubmit");

var m = textContent.search("Login failed");

setTimeout(function() 
{
	document.getElementsByName("_user")[0].value = userid;
	document.getElementsByName("_pass")[0].value = pass;
 	document.getElementsByName("captcha_input")[0].value = nameValue;
 	if(auto & m==-1)
		button.click();
	if(m!=-1)
		alert("Please check your username and password in the extension settings");
}, delayMillis);

