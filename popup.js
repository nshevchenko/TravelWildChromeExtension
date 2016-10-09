

function begin(){
  queryGetCurrentWebsiteName();
}

function queryGetCurrentWebsiteName(){
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    onReadWebsite(tabs[0].url);
  });
}

function onReadWebsite(websiteName){
  var classId = mappers.mapWebsiteNameToClassId(websiteName);
  if(classId != null) {
      requests.getClassIdValue(classId, onClassIdFound);
  } else {
      console.log("classID is null");
  }
}

function onClassIdFound(msg) {
    msg = msg || {};
    console.log('onResponse', msg.response);
    helloFilip(msg.response);
}

function helloFilip(value) {
    var response = requests.getCountryInfo("NO", onCountryInfoReceived);
}

function onCountryInfoReceived(data){
    console.log("data " + data);
    var responseObj = JSON.parse(data);
    for(var animalObj in responseObj){
        console.log(responseObj[animalObj].Quantity);
    }
    UI.populateAnimalList(4);
    UI.createCityInfoList(2);
}

// start of the program
$(document).ready(function () {
    begin();
    // helloFilip(4);
});
