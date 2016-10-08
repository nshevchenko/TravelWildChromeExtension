var destinationClassId = {
  expedia: 'acol-going-to'
};

var mappers = {
  mapWebsiteNameToClassId: function (websiteName){
    for (var key in destinationClassId) {
      if(websiteName.includes(key.toString())){
        return destinationClassId[key];
      }
    }
  }
};
