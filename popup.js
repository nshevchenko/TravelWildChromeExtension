

function begin(){
  queryGetCurrentWebsiteName();
}

function queryGetCurrentWebsiteName(){
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    onReadWebsite(tabs[0].url);
  });
}

function onReadWebsite(websiteName){
  console.log(websiteName);
  var classId = mappers.mapWebsiteNameToClassId(websiteName);
  if(classId != null) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var tab = tabs[0];
    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendMessage(tab.id, {action: "hello", classid: classId}, onClassIdFound);
      });
    });
  }
}

function onClassIdFound(msg) {
    msg = msg || {};
    console.log('onResponse', msg.response);
    $("");
    helloFilip(msg.response);
}

function helloFilip(value) {
    UI.populateAnimalList(4);
    for (var i = 0; i < value/2; i++) {
        container.append(UI.createAnimalTradeRow("N of Faggots"));
    }
}

function identifyClientBrowser(){
  _clientBrowser = navigator ? navigator.userAgent.toLowerCase() : "other";
}

// start of the program
$(document).ready(function () {
    begin();
    // helloFilip(4);
});
