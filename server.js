// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// Star Wars Characters (DATA)
// =============================================================
var reservations = [
    {
        customerName: "test 1",
        phoneNumber: "345-456-5555",
        customerEmail: "test@email.com",
        customerID: "123"
    },
    {
        customerName: "test 2",
        phoneNumber: "345-456-77777",
        customerEmail: "test@email.com",
        customerID: "333"
    }
];

// Routes
// =============================================================
app.use('/', express.static(path.join(__dirname, "client")));

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

// app.get("/reserve", function(req, res) {
//   res.sendFile(path.join(__dirname, "reserve.html"));
// });
//
// app.get("/tables", function(req, res) {
//   res.sendFile(path.join(__dirname, "tables.html"));
// });


// Search for Specific Character (or all characters) - provides JSON
 app.get("/api/:reservations?", function (req, res) {
    //var chosen = req.params.characters;

/* if (chosen) {
    console.log(chosen);

    for (var i = 0; i < characters.length; i++) {
        if (chosen === characters[i].routeName) {
            return res.json(characters[i]);
        }
<<<<<<< HEAD

        return res.json(false);
    }*/
    return res.json(reservations);
});
=======
    }

    return res.json(false);
}
return res.json(characters); */
//});
>>>>>>> 2698f2c61ebe926fe11e71e9c1d05a1763e8e23d

// Create New Characters - takes in JSON input
app.post("/api/new", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newcharacter = req.body;
  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newcharacter.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();

  console.log(newcharacter);

  characters.push(newcharacter);

  res.json(newcharacter);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
