require("dotenv").config();

var Spotify = require('node-spotify-api');
var keys = require('./keys.js');
var newSpotify = new Spotify(keys.spotify);
var axios = require("axios");
//var fs = require('fs');

var action = process.argv[2];




switch (action) {
    case 'concert-this':
        bandsInTown(process.argv.slice(2).join(" "));
        break;
    case 'spotify-this-song':
        spotify(process.argv.slice(2).join(" "))
        break;
    case 'movie-this':
        movieThis(process.argv.slice(2).join(" "))
        break;
    case 'do-what-it-says':
        break;
}

function bandsInTown(artist) {
    var band = process.argv.slice(2).join(" ");
    var bandsUrl = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp";
    axios.get(bandsUrl).then(
        function (response) {
            console.log('Name of Venue: ' + response.data[0].venue.name);
            console.log('Venue Location: ' + response.data[0].venue.city + ', ' + response.data[0].venue.region + ' ' + response.data[0].venue.country)
            console.log('Event Date: ' + response.data[1].datetime)
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
        movie = process.argv.slice(2).join(" ");
    }
    var omdbUrl = "http://www.omdbapi.com/?t=" + movie + "&apikey=ea09baf7"
    axios.get(omdbUrl).then(
        function (response) {
            console.log("Title: " + response.data.Title);
            console.log("Year Released: " + response.data.Released);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Source + response.data.Ratings[1].Value);
            console.log("Countries Movie was Produced in: " + response.data.Country);
            console.log("Movie Languages: " + response.data.Language);
            console.log("Plot of the Movie: " + response.data.Plot);
            console.log("Cast: " + response.data.Actors);            
        })
        .catch(function (error) {
            console.log('error');
        })
}