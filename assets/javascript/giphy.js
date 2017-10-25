$("button").on("click", function() {
      
      var instrument = $(this).attr("data-instrument");

      
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        instrument + "&api_key=dc6zaTOxFJmzC&limit=10";

      
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        
        .done(function(response) {
          
          var results = response.data;

          
          for (var i = 0; i < results.length; i++) {
            
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              var gifDiv = $("<div class='item'>");
              var instrumentImage = $("<img>");
              instrumentImage.attr("src", results[i].images.fixed_height_still.url);
              instrumentImage.attr("data-state", "still");
              instrumentImage.attr("data-still", results[i].images.fixed_height_still.url);
              instrumentImage.attr("data-animate", results[i].images.fixed_height.url);
              gifDiv.append(instrumentImage);

              $("#gif-spot").prepend(gifDiv);
            }
          }
        });
    });