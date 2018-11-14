require("dotenv").config();

const keys = require("./keys.js");
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);
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


// search for song using node-spotify-api
function spotifyThisSong() {
  // console.log("SPOTIFY THIS SONG: " + userInput);
  if (userInput === undefined || userInput === null || userInput === "") {
    userInput = "Ace of Base The Sign";
  }

  spotify.search({ type: 'track', query: userInput }, function(err, data) {
    // console.log(data.tracks.items[0]);

    if (err) {
      return console.log('Error occurred: ' + err);
    }

    let search = data.tracks.items[0];

    // console.log(data.tracks.items[0].album.name)
    console.log(`\n----------\nArtist: ${search.artists[0].name}\nSong: ${search.name}\nPreview link: ${search.preview_url}\nAlbum: ${search.album.name}\n`)

});
};


// search for concert info using bandsintown api
function concertThis() {
  // console.log("CONCERT THIS: " + userInput);
  if (userInput === undefined || userInput === null || userInput === "") {
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
};


// search for movie info using omdb api
function movieThis() {
  if (userInput === undefined || userInput === null || userInput === "") {
    userInput = "Mr. Nobody";
  }
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
    });
  };


// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
  function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
      // console.log(data.split(","));

      if (error) {
        return console.log(error);
      }

      let dataArray = data.split(",");
        userInput = dataArray[1];
  
  
        if (dataArray[0] === "spotify-this-song") {
            spotifyThisSong();
        } else if (dataArray[0] === "concert-this") {
            concertThis();
        } else if (dataArray[0] === "movie-this") {
            movieThis();
        }
    });
   
  };