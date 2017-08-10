window.onload = function() {
  document.getElementById('save').onclick = function() {
    var username = document.getElementById('username').value;
    var pass = document.getElementById('password').value;
    var auto = document.getElementById('autologin').checked;
    chrome.storage.sync.set({'username': username},function() {});
    chrome.storage.sync.set({'password': pass},function() {}); 
    chrome.storage.sync.set({'auto': auto},function() {}); 
  }
}