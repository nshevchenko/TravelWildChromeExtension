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
  },

  getWikiLink: function(i, animal, callback) {
      var name = animal.Name;
      if(name == ''){
          name = animal.Taxon;
      }
      $.get( "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + animal.Taxon.replace(' ', '%20') + "&limit=1&namespace=0&format=json",
      function(data, status) {
          console.log(data);
          callback(i, data, animal);
      });
  }



};
