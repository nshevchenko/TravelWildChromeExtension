
var UI = {

  populateAnimalList: function(value) {
      var container = $(".animal_list");
      var row = $(".animal_row");
      for (var i = 0; i < value; i++) {
          container.append(UI.createAnimalTradeRow("Tiger"));
      }
  },
  createAnimalTradeRow: function (animalName){
      return "<div class='animal_row'>" +
                       "<p class='title_animal'>" + animalName + "</p>" +
                       "</div>"
  },

};
