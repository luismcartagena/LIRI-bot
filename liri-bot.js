require("dotenv").config();

const keys = require("./keys");
// const Spotify = require("node-spotify-api");
// const spotify = new Spotify("keys.spotify");
const request = require("request");
const moment = require("moment");
moment().format();
const fs = require("fs");

// get user command
const command = process.argv[2];
// console.log(command);

// get user input
let userInput = process.argv.slice(3).join(" ");



// make a decision based on the command
switch (command) {
  case "concert-this":
    concertThis();
    break;
  case "spotify-this-song":
    spotifyThisSong();
    break;
  case "movie-this":
    movieThis();
    break;
  case "do-what-it-says":
    doWhatItSays();
    break;
  default:
    console.log("I don't understand, ask Foogle-Bot");
    break;
}

function spotifyThisSong() {
  // console.log("SPOTIFY THIS SONG: " + userInput);

}

function concertThis() {
  // console.log("CONCERT THIS: " + userInput);
  if (userInput === undefined || userInput === null) {
    userInput = "Kamasi Washington";
  }

  let URL =  "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";

  request(URL, function(error, response, body) {
    // Parse the body of the site
    let concertBody = JSON.parse(body);
    // console.log(concertBody[0]);

    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {
      console.log(`\n----------\nArtist: ${concertBody[0].lineup}\nVenue: ${concertBody[0].venue.name}\nLocation: ${concertBody[0].venue.city}, ${concertBody[0].venue.region}\nDate: ${moment(concertBody[0].datetime).format("MM/DD/YYYY")}\n`);
    };
    }
  );
}

function movieThis() {
  if (userInput === undefined || userInput === null) {
    userInput = "Mr. Nobody";
  };
  // console.log("MOVIE THIS: " + userInput);

  let URL = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy"

  // run a request to the OMDB API with the movie specified
  request(URL,function(error, response, body) {
    
    // Parse the body of the site
    let movieBody = JSON.parse(body);
    // console.log(movieBody);

      // If the request is successful (i.e. if the response status code is 200)
      if (!error && response.statusCode === 200) {
        console.log(`\n----------\nMovie Title: ${movieBody.Title}\nYear: ${movieBody.Year}\nIMDB Rating: ${movieBody.imdbRating}\nRotten Tomatoes Rating: ${movieBody.Ratings[1].Value}\nCountry: ${movieBody.Country}\nLanguage: ${movieBody.Language}\nPlot: ${movieBody.Plot}\nActors: ${movieBody.Actors}\n`);
      }
    }
  );
}
function doWhatItSays() {
  // console.log("DO THIS: " + userInput);
}
