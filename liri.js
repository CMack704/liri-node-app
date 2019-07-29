require("dotenv").config();

var Spotify = require('node-spotify-api');
var keys = require('./keys.js');
var newSpotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require('fs');
var action = process.argv[2];
var moment = require('moment');




switch (action) {
    case 'concert-this':
        bandsInTown(process.argv[3]);
        break;
    case 'spotify-this-song':
        spotify(process.argv[3])
        break;
    case 'movie-this':
        movieThis(process.argv[3])
        break;
    case 'do-what-it-says':
        doThis(process.argv[3])
        break;
}

function bandsInTown(artist) {
    var band = process.argv[3];
    var bandsUrl = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp";
    axios.get(bandsUrl).then(
        function (response) {
            console.log('Name of Venue: ' + response.data[0].venue.name);
            console.log('Venue Location: ' + response.data[0].venue.city + ', ' + response.data[0].venue.region + ' ' + response.data[0].venue.country)
            console.log('Event Date: ' + moment(response.data[1].datetime).format("MM/DD/YYYY"))
        })
        .catch(function (error) {
            console.log('error');
        })
}
function spotify(track) {
    var track;
    if (process.argv[3] === undefined) {
        track = 'The Sign ace of base'
    } else {
        track = process.argv[3]
    }
    newSpotify
        .search({ type: 'track', query: track })
        .then(function (response) {
            console.log('Artist: ' + response.tracks.items[0].artists[0].name);
            console.log('Song Title: ' + response.tracks.items[0].name)
            console.log('Listen to the Song: ' + response.tracks.items[0].external_urls.spotify)
            console.log('Album: ' + response.tracks.items[0].album.name)
        })
        .catch(function (error) {
            console.log('error');
        });
}
function movieThis(movieName) {
    var movie;
    if (process.argv[3] === undefined) {
        movie = 'Mr. Nobody';
    } else {
        movie = process.argv[3];
    }
    var omdbUrl = "http://www.omdbapi.com/?t=" + movie + "&apikey=ea09baf7"
    axios.get(omdbUrl).then(
        function (response) {
            console.log("Title: " + response.data.Title);
            console.log("Year Released: " + response.data.Released);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Source + " " + response.data.Ratings[1].Value);
            console.log("Countries Movie was Produced in: " + response.data.Country);
            console.log("Movie Languages: " + response.data.Language);
            console.log("Plot of the Movie: " + response.data.Plot);
            console.log("Cast: " + response.data.Actors);            
        })
        .catch(function (error) {
            console.log('error');
        })
}
function doThis(param) {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
          return console.log('error');
        }
        var dataArr = data.split(",");
        newSpotify
        .search({ type: 'track', query: dataArr[1] })
        .then(function (response) {
            console.log('Artist: ' + response.tracks.items[0].artists[0].name);
            console.log('Song Title: ' + response.tracks.items[0].name)
            console.log('Listen to the Song: ' + response.tracks.items[0].external_urls.spotify)
            console.log('Album: ' + response.tracks.items[0].album.name)
        })
        .catch(function (error) {
            console.log('error');
        });      
      });
    var text = ',movie-this,"Interstellar",concert-this,"future"'
    fs.appendFile("random.txt", text, function(error){
        if (error) {
            console.log('error');
        } else {
            console.log('success');
        }
    })
}