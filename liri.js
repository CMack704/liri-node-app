require("dotenv").config();

var Spotify = require('node-spotify-api');
var keys = require('./keys.js');
var newSpotify = new Spotify(keys.spotify);
var axios = require("axios");
//var fs = require('fs');
var bandsUrl = "https://rest.bandsintown.com/artists/" + process.argv[3] + "/events?app_id=codingbootcamp"
var action = process.argv[2];

//http://www.omdbapi.com/?i=tt3896198&apikey=ea09baf7


switch (action) {
    case 'concert-this':
        bandsInTown(process.argv.slice(2).join(""));
        break;
    case 'spotify-this-song':
        spotify(process.argv[3])
        break;
    case 'movie-this':
        break;
    case 'do-what-it-says':
        break;
}

function bandsInTown(artist) {
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
    
}