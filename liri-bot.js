require("dotenv").config();

var spotify = require("./keys"); // ????
var request = require("request");



//  * ASSUMES USER SETUP HAS BEEN COMPLETED
//  * (API KEYS ETC)

console.log(process.env.SPOTIFY_ID);
// get the user input
const input = process.argv[2];

// make a decision based on the command
switch (input) {
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
    console.log("SPOTIFY THIS SONG: " + process.argv[3]);
    var spotify = new Spotify(keys.spotify);
}

function concertThis() {
    console.log("CONCERT THIS: " + process.argv.slice(3).join(" "));
    // "https://rest.bandsintown.com/artists/" + artist + "/?app_id=codingbootcamp"

}

function movieThis() {
  console.log("MOVIE THIS: " + process.argv[3]);
  // Then run a request to the OMDB API with the movie specified
request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy",
function(error, response, body) {
  console.log(response);
  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {
    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
  }
}
);
}
function doWhatItSays() {
  console.log("DO THIS: " + process.argv[3]);
}


