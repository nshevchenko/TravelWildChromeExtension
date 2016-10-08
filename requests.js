var requests = {
  getClassIdValue: function (classId, onClassIdFound){
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var tab = tabs[0];
      chrome.tabs.getSelected(null, function(tab) {
          chrome.tabs.sendMessage(tab.id, {action: "hello", classid: classId}, onClassIdFound);
        });
      });
  }
};
