var friendsList = require("../data/friends");
var bodyParser = require("body-parser");




module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friendsList);
    });

    app.post("/api/friends", function (req, res) {


        var newScores = req.body.scores;
        var scoresArray = [];
        var friendCount = 0;
        var bestMatch = 0;


        for (var i = 0; i < friendsList.length; i++) {
            var difference = 0;

            for (var j = 0; j < newScores.length; j++) {
                difference += (Math.abs(parseInt(friendsList[i].scores[j]) - parseInt(newScores[j])));
            }


            scoresArray.push(difference);
        }


        for (var i = 0; i < scoresArray.length; i++) {
            if (scoresArray[i] <= scoresArray[bestMatch]) {
                bestMatch = i;
            }
        }


        var bff = friendsList[bestMatch];
        res.json(bff);


        friendsList.push(req.body);
    });



};

