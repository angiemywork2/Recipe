  
    // Initialize Firebase
    var config = {

    apiKey: "AIzaSyBazdBYpQeMv8fiKWqMHAML593iRvUENNA",
    authDomain: "mywatchparty-94719.firebaseapp.com",
    databaseURL: "https://mywatchparty-94719.firebaseio.com",
    projectId: "mywatchparty-94719",
    storageBucket: "mywatchparty-94719.appspot.com",
    messagingSenderId: "847390956477"
    
    };

    firebase.initializeApp(config);

    var database = firebase.database();

    var showTitle = "";
    var showRating ="";
    var showPlot ="";
    var showNetwork = "";
    var showDay = "";
    var showTime = "";
    var showDuration = "";
    
      // This .on("click") function will trigger the AJAX Call
      $("#find-tvShow").on("click", function(event) {

        // event.preventDefault() can be used to prevent an event's default behavior.
        // Here, it prevents the submit button from trying to submit a form when clicked
        event.preventDefault();

        // Here we grab the text from the input box
        var showTitle = $("#tvShow-input").val();

        var key = "40e9cece";
        var queryURL = "http://api.tvmaze.com/search/shows?q="+showTitle;
        var queryURLOMDB = "http://www.omdbapi.com/?t="+showTitle+"&y=&plot=short&apikey="+key;
        // http://api.tvmaze.com/search/shows?q=psych
        // http://www.omdbapi.com/?t=psych&y=&plot=short&apikey=40e9cece

        var ajaxResults;

        $.ajax({
            url: queryURL,
            method: "GET"
        })
          // After the data comes back from the API
          .then(function(response) {

              ajaxResults = response;

              return $.ajax({
                url: queryURLOMDB,
                method: "GET"
              })
          }) 
          .then(function(response){
            //console.log(ajaxResults);
            console.log(response);

            // Storing an array of results in the results variable
            var results = ajaxResults.data;
            var showTitle = ajaxResults[0].show.name;
            console.log("Show: "+showTitle);
            var showNetwork = ajaxResults[0].show.network.name;
            console.log("Network: " +showNetwork);
            var showDay = ajaxResults[0].show.schedule.days;
            console.log("Days: " +showDay+ "s");
            var showTime = ajaxResults[0].show.schedule.time;
            console.log("Time: " +showTime);
            var showTime2 = moment(showTime, 'LT').format('LT');
            console.log("Time 2: " +showTime2); 
            console.log("Time: "+ moment(showTime, 'LT').format('LT'));
            var showDuration = ajaxResults[0].show.runtime;
            console.log("Show Duration: " +showDuration);
            var title=response.Title;
            console.log("Title: "+title);
            var showRating = response.Rated;
            console.log("Rated: "+ showRating);
            var showPlot = response.Plot;
            console.log("Summary: "+ showPlot);
            

            //push to the database
            database.ref().push({
            showTitle:showTitle,
            showNetwork: showNetwork,
            showDay: showDay,
            showTime2: showTime2,
            showRating: showRating,
            showPlot: showPlot,
            dateAdded: firebase.database.ServerValue.TIMESTAMP         
            
            });
          
        });
          database.ref().on("child_added", function(snapshot) {
          // Store everything into a variable.
          var showTitle = snapshot.val().showTitle;
          var showRating =snapshot.val().showRating;
          var showPlot = snapshot.val().showPlot;
          var showNetwork = snapshot.val().showNetwork;
          var showDay = snapshot.val().showDay;
          var showTime2 = snapshot.val().showTime2;

          // Add each train's data into the table
          $("#show-table > tbody").append("<tr><td>" + showTitle +"</td><td>" +showRating + "</td><td>" +showPlot+"</td><td>" +showNetwork+"</td><td>" +showDay+ "</td><td>"+showTime2+ "</td></tr>");

          });

      });


    