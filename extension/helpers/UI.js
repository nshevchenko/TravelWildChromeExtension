
var UI = {

  populateAnimalList: function(animalList) {
      var container = $("#animal_list");
      for(var animalObj in animalList){
          console.log(animalList[animalObj].Quantity);
          container.append(UI.createAnimalTradeRow(animalList[animalObj]));
      }
  },
  createAnimalTradeRow: function (animalObj){
      var taxon =  animalObj.Taxon[0];
      var quantity = animalObj.Quantity;
      var use = "";
      var purpose = "";

      for (var key in animalObj.Terms){
          use += "<div class='item'><u>" + animalObj.Terms[key] + " </u></div>";
      }
      for (var key in animalObj.Purpose){
          purpose += "<div class='item'><u>" + animalObj.Purpose[key] + " </u></div>";
      }


      return "<div class='row' id='animal_row'>" +
                "<div class='title_small' id='title_animal'><b>" + taxon + "</b></div>" +
                "<div class='quantity_text'> Quantity: " + Math.round(quantity) + "</div>" +
                "<div class='used_line'><div class ='row_subtitle'>Used for: " + use.toString() + "<div>" +
                "<div class='used_line'><div class ='row_subtitle'>Purpose: " + purpose.toString() + "<div>" +
            "</div>";
  }


  // createCityInfoList: function(value) {
  //     var container = $("#city_list");
  //     for (var i = 0; i < value; i++) {
  //         container.append(UI.createCityRow("Careful Faggots"));
  //     }
  // },
  // createCityRow : function(cityInfo) {
  //     return "<div class='row' id='city_list'>" +
  //                      "<p id='city_title'>" + cityInfo + "</p>" +
  //                      "</div>";
  // }
};
