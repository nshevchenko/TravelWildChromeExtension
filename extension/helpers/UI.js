
var UI = {

    populateAnimalList: function(animalList) {
        console.log(animalList);
        for(var i in animalList){
            var animalObj = animalList[i];
            requests.getWikiLink(i, animalObj, this.onWikiLinkReceived);
        }
    },

    onWikiLinkReceived: function(i, data, animalObj) {
        var container = $("#animal_list");
        animalObj.link = data[3][0];
        var animalCell = createAnimalRow(i, animalObj);
        container.append(animalCell);
        if(animalObj.link != '' && typeof animalObj.link != 'undefined'&& animalObj.link != null){
            addOnClickListeners();
        } else {
            disableWikipediaLogo();
        }

        function disableWikipediaLogo(){
            $('#wikipedia_logo' + i).hide();
        }

        function addOnClickListeners(){
            var link = document.getElementById('animal_row' + i);
            console.log("create tab with link " + animalObj.link);
            link.addEventListener("click", function(){

                chrome.tabs.create({ url: animalObj.link });
            }, false);
        }

        function createAnimalRow (i, animalObj){
            var taxon =  animalObj.Taxon;
            var name =  animalObj.Name;
            var use = "";
            var purpose = "";

            if(name == '' || name == null){
              name = taxon;
            }
            for (var key in animalObj.Terms){
              use += "<div class='item'><u>" + animalObj.Terms[key] + " </u></div>";
            }
            for (var key in animalObj.Purpose){
              purpose += "<div class='item'><u>" + animalObj.Purpose[key] + " </u></div>";
            }
            return "<div class='row' id='animal_row" + i + "'><a id='link_url'>" +
                    "<div class='title_small' id='title_animal'><b>" + name + "</b></div>" +
                    "<div class='quantity_text'> Quantity: " + Math.round(animalObj.Quantity) + "</div>" +
                    "<div class='used_line'><div class ='row_subtitle'>Used for: " + use.toString() + "</div></div></br>" +
                    "<div class='used_line'><div class ='row_subtitle'>Purpose: " + purpose.toString() + "/<div></div>" +
                    "<img class='wikipedia_logo' id='wikipedia_logo" + i + "' src='../images/wikilogo.png'>" +
                "</a></div>";
        }
    }
};
