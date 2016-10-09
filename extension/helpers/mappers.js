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
    },
    getCountryFromLocationName: function(locationName, callback){
        $.getJSON('../countryCodes.json', function(data) {
            console.log(data);
            console.log(locationName);

            for (var key in data) {
                var locationString = locationName.toLowerCase().trim() + "";
                var countryName = data[key].toLowerCase().trim() + "";
                console.log(locationString + " " + countryName);
                if(locationString.includes(countryName) && countryName != '' && countryName != ' '){
                    console.log("SUCCESS");
                    callback(key);
                    break;
                }
            }
        });

    }
};
