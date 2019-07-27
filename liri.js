require("dotenv").config();

//var keys = require('./keys.js');
//var spotify = new Spotify(keys.spotify);
var axios = require("axios");
//var fs = require('fs');
var bandsUrl = "https://rest.bandsintown.com/artists/" + process.argv[3] + "/events?app_id=codingbootcamp"
var action = process.argv[2];

//http://www.omdbapi.com/?i=tt3896198&apikey=ea09baf7


switch (action) {
    case 'concert-this':
        axios.get(bandsUrl).then(
            function(response) {
                console.log('Name of Venue: ' + response.data[0].venue.name);
                console.log('Venue Location: ' + response.data[0].venue.city + ', ' + response.data[0].venue.region + ' ' + response.data[0].venue.country)
                console.log('Event Date: ' + response.data[1].datetime)
            })
            .catch(function(error) {
                console.log('error');
            })
        break;
    case 'spotify-this-song':
        break;
    case 'movie-this':
        break;
    case 'do-what-it-says':
        break;
}