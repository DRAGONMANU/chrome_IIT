chrome.contextMenus.create({
  id: "Toolkit",
  title: "Toolkit asdSS",
  contexts:["selection"],
});

chrome.contextMenus.onClicked.addListener(function myFunction(selectedText) {
    alert('Hey, Hoss! You just clicked me  \n'+ selectedText.selectionText);
});