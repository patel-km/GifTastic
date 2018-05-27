//We will have 3 onclick functions for buttons -- one for existing buttons, one for the submit input, and one for the new buttons

//We will also have an onclick function to start and stop the gifs displayed. IF the gif is playing, a click stops the animation. If gif is still, a click makes the gif play.

// BUTTONS EVENTS __________________________________________________________________________________________________________________________________________________
    
    //onclick event listener for user input
    //create a new button and print it to the screen
    $("#submit").on("click", function () {
        var input = $("#mood-input").val().trim();
        var newButton = $("<button>").addClass("new");

        newButton.attr("data-item", input);
        newButton.text(input);

        $("#moodButtons").append(newButton);

        $("<input>").empty();

    //onclick event listener for new buttons
    //same function as existing buttons, but just calling it by its diff class
        $(".new").on("click", function () {

            $("#mood-gifs").empty();
            
            var mood = $(this).attr("data-item");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + mood + "&api_key=nbFBZtTWn5t69XGfIAyKL0wRNdAlEuBk&limit=10"
            
            $.ajax({
            url: queryURL,
            method: "GET"
            })
            .then(function(response) {
                
                var results = response.data;
                for (var i = 0; i < results.length; i++) {
    
                    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                
                        var rating = results[i].rating;
                        var p = $("<p>").text("Rating: " + rating);
                        var moodImage = $("<img>");
                        moodImage.attr("src", results[i].images.fixed_height.url);
                    
                    $("#mood-gifs").append(p);
                    $("#mood-gifs").append(moodImage);
    
                    console.log("works")
                    }
                }   
            })
            });
    });

    
    //onclick event listener for existing buttons
    $(".existing").on("click", function () {

        //clear old results
        $("#mood-gifs").empty();

        //to add the button's topic to the queryURL
        var mood = $(this).attr("data-item");

        //queryURL and API key
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + mood + "&api_key=nbFBZtTWn5t69XGfIAyKL0wRNdAlEuBk&limit=10"
        
        //ajax GET method
        $.ajax({
        url: queryURL,
        method: "GET"
      })

        //then function to say what to do with the gifs once pulled from GIPHY
        .then(function(response) {
            
            var results = response.data;
            //for all the results pulled, only print the ones that are NOT rated R or PG-13
            for (var i = 0; i < results.length; i++) {

                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                

                //store the gif rating and print it to screen
                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                //create an image tag to store the pulled gif into. Set src to the Gif link from giphy, within that new img tag.
                //display that gif in a still format
                    var moodImage = $("<img>");
                    moodImage.attr("src", results[i].images.fixed_height.url);
                
                //appending rating text and mood gifs to the appropriate div
                $("#mood-gifs").append(p);
                $("#mood-gifs").append(moodImage);
                }
            }   
        })
        });


   
    




// GIF START/STOP EVENTS ____________________________________________________________________________________________________________________________________________

    //onclick event to make gifs be "still" or "animated"
    //"_s.gif" = still gif
    $("<img>").on("click", function() {
      var gifStatus = $(this).attr("data-state= 'still'");

      if (gifStatus === "still") {
        $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))

        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });