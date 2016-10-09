var requests = {
  getClassIdValue: function (classId, onClassIdFound){
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var tab = tabs[0];
      chrome.tabs.getSelected(null, function(tab) {
          chrome.tabs.sendMessage(tab.id, {action: "hello", classid: classId}, onClassIdFound);
        });
      });
  },
  getCountryInfo: function(countryCode, callback) {
      $.get( "http://45.55.212.203/country_data?country=" + countryCode + "",
      function(data, status) {
          console.log(data);
          callback(data);
      });
  }


};
