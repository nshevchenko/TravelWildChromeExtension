
var UI = {

  populateAnimalList: function(value) {
      var container = $("#animal_list");
      for (var i = 0; i < value; i++) {
          container.append(UI.createAnimalTradeRow("Tiger"));
      }
  },
  createAnimalTradeRow: function (animalName){
      return "<div class='row' id='animal_row'>" +
                       "<p id='title_animal'>" + animalName + "</p>" +
                       "</div>";
  },


  createCityInfoList: function(value) {
      var container = $("#city_list");
      for (var i = 0; i < value; i++) {
          container.append(UI.createCityRow("Careful Faggots"));
      }
  },
  createCityRow : function(cityInfo) {
      return "<div class='row' id='city_list'>" +
                       "<p id='city_title'>" + cityInfo + "</p>" +
                       "</div>";
  }
};
