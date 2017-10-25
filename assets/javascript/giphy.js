

function displayInfo() {
  var instrument = $(this).attr("data-instrument");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    instrument + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
      url: queryURL,
      method: "GET"
    })
    
    .done(function(response) {
      
      var results = response.data;

      $("#gif-spot").empty();
      for (var i = 0; i < results.length; i++) {
        
        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
          var gifDiv = $("<div class='item'>");
          var rating = results[i].rating;
          var p = $("<p>").text("Rating: " + rating.toUpperCase());
          var instrumentImage = $("<img>");
          instrumentImage.attr("src", results[i].images.fixed_height_still.url);
          instrumentImage.attr("data-state", "still");
          instrumentImage.attr("data-still", results[i].images.fixed_height_still.url);
          instrumentImage.attr("data-animate", results[i].images.fixed_height.url);
          gifDiv.append(p);
          gifDiv.append(instrumentImage);
          $("#gif-spot").prepend(gifDiv);
        }
      }

      $(".item > img").on("click", function() {
  
        var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });

  });
}
$("button").on("click", function() {
      
  
  displayInfo();
});
var newInstrument = ["Saxophone", "Flute", "Trumpet", "Synthesizer", "Guitar", "Drums", "Cello", "Bass", "Electric Violin", "Sitar"];

function renderButtons() {
  $("#instruments").empty();
 for (var i = 0; i < newInstrument.length; i++) {
    var a = $("<button>");
    a.addClass("instrument-added");
    a.attr("data-instrument", newInstrument[i]);
    a.text(newInstrument[i]);
    $("#instruments").append(a);
 }
}

$("#add-instrument").on("click", function(event) {
  event.preventDefault();

  var instrument = $("#instrument-input").val().trim();
  instrument = instrument.charAt(0).toUpperCase() + instrument.slice(1);
  newInstrument.push(instrument);

  renderButtons();
});

$(document).on("click", ".instrument-added", displayInfo);

renderButtons();