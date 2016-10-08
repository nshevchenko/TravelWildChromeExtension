

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
  console.log(classId);
  if(classId != null) {
      requests.getClassIdValue(classId, onClassIdFound);
  }
}

function onClassIdFound(msg) {
    msg = msg || {};
    console.log('onResponse', msg.response);

    helloFilip(msg.response);
}

function helloFilip(value) {
    UI.populateAnimalList(4);
    UI.createCityInfoList(2);
}

function identifyClientBrowser(){
  _clientBrowser = navigator ? navigator.userAgent.toLowerCase() : "other";
}

// start of the program
$(document).ready(function () {
    begin();
    // helloFilip(4);
});
