console.log('something');

  // QUESTION: What is this code doing?
  $("#search-btn").on("click", function() {
    var searchedCharacter = $("#character-search").val().trim();

    // Using a RegEx Pattern to remove spaces from searchedCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    searchedCharacter = searchedCharacter.replace(/\s+/g, "").toLowerCase();

    // QUESTION: What does $.get do? What are the parameters it is expecting?
    $.get("/api/" + searchedCharacter, function(data) {
      console.log(data);
      if (data) {
        $("#stats").show();
        $("#name").text(data.name);
        $("#role").text(data.role);
        $("#age").text(data.age);
        $("#force-points").text(data.forcePoints);
      } else {
        $("#name").text("The force is not strong with this one. Your character was not found.");
        $("#stats").hide();
      }
    });
  });

  // In this code, jQuery is used to "download" the data from our server
  // We then dynamically display this content in our table. This is very similar to the group projects you just completed.
  // It's also very similar to the NYT search application. In fact, I copied a ton of code from there.

  function runTableQuery() {

    // Here we get the location of the root page.
    // We use this instead of explicitly saying the URL is localhost:3001 because the url will change when we deploy.
    var currentURL = window.location.origin;

    // The AJAX function uses the URL of our API to GET the data associated with it (initially set to localhost)
    $.ajax({
        url: currentURL + "/api/tables",
        method: "GET"
      })
      .done(function(tableData) {

        // Here we are logging the URL so we have access to it for troubleshooting
        console.log("------------------------------------");
        console.log("URL: " + currentURL + "/api/tables");
        console.log("------------------------------------");

        // Here we then log the NYTData to console, where it will show up as an object.
        console.log(tableData);
        console.log("------------------------------------")

        // Loop through and display each of the customers
        for (var i = 0; i < tableData.length; i++) {

          // Create the HTML Well (Section) and Add the table content for each reserved table
          var tableSection = $("<div>");
          tableSection.addClass('well');
          tableSection.attr('id', 'tableWell-' + i + 1)
          $('#tableSection').append(tableSection);

          var tableNumber = i + 1;


          // Then display the remaining fields in the HTML (Section Name, Date, URL)
          $("#tableWell-" + i + 1).append('<h2><span class="label label-primary">' + tableNumber + "</span> | " + tableData[i].customerID + "</h2>");
        }
      });
  }

  function runWaitListQuery() {

    // Here we get the location of the root page.
    // We use this instead of explicitly saying the URL is localhost:3001 because the url will change when we deploy.
    var currentURL = window.location.origin;

    // The AJAX function uses the URL of our API to GET the data associated with it (initially set to localhost)
    $.ajax({
        url: currentURL + "/api/waitlist",
        method: "GET"
      })
      .done(function(waitlistData) {

        // Here we are logging the URL so we have access to it for troubleshooting
        console.log("------------------------------------");
        console.log("URL: " + currentURL + "/api/waitlist");
        console.log("------------------------------------");

        // Here we then log the NYTData to console, where it will show up as an object.
        console.log(waitlistData);
        console.log("------------------------------------")

        // Loop through and display each of the customers
        for (var i = 0; i < waitlistData.length; i++) {

          // Create the HTML Well (Section) and Add the table content for each reserved table
          var waitlistSection = $("<div>");
          waitlistSection.addClass('well');
          waitlistSection.attr('id', 'waitlistWell-' + i + 1)
          $('#waitlistSection').append(waitlistSection);

          var tableNumber = i + 1;

          // Then display the remaining fields in the HTML (Section Name, Date, URL)
          $("#waitlistWell-" + i + 1).append('<h2><span class="label label-primary">' + tableNumber + "</span> | " + waitlistData[i].customerID + "</h2>");
        }
      });
  }

  // This function resets all of the data in our tables. This is intended to let you restart a demo.
  function clearTable() {

    var currentURL = window.location.origin;
    $.ajax({
      url: currentURL + "/api/clear",
      method: "POST"
    })

  }

  $("#clear").on('click', function() {
    alert("Clearing...");
    clearTable();

    // Refresh the page after data is cleared
    location.reload();
  })


  // Run Queries!
  // ==========================================
  runTableQuery();
  runWaitListQuery();
