// Constructor & Properties Object (Using option A)
var bodyParser = require('body-parser');
const fetch = require("node-fetch");

var MovieData = function(Response){

    // Constructor
    if ( Response.Title !== 'undefined')
      var title = Response.Title;
    else
      var title = 'Not Available';
  
    if ( Response.Actors !== 'undefined')
      var actors = Response.Actors;
    else
      var actors = 'Not Available';
    
    if ( Response.Genre !== 'undefined')
      var genre = Response.Genre;
    else
      var genre = 'Not Available';
    
    if ( Response.Language !== 'undefined' )
        var language = Response.Language;
    else
        var language = 'Not Available';
  
    if ( Response.Poster !== 'undefined')
        var poster = Response.Poster;
    else
        var poster = 'Not Available';
  
    if ( Response.imdbRating !== 'undefined')
        var rating = Response.imdbRating;
    else
        var rating = 'Not Available';

    if ( Response.imdbID !== 'undefined' )
        var movieId = Response.imdbID;
    else
        var movieId = 'Not Available';
    
    if ( Response.Website !== 'undefined')
        var webSite = Response.Website;
    else
        var webSite = 'Not Available';
    
    if ( Response.Runtime !== 'undefined' )
        var runtime = Response.Runtime;
    else
        var runtime = 'Not Available';
    
    if ( Response.Year !== 'undefined' )
        var year = Response.Year;
    else
        var year = 'Not Available';
    
    if ( Response.Plot !== 'undefined')
        var synapsi = Response.Plot;
    else
        var synapsi = 'Not Available';

    if ( Response.Type !== 'undefined' )
        var typeMovie = Response.Type;
    else
        var typeMovie = 'Not Available';

    // Return properties
    return {
      title: title,
      actors: actors,
      genre: genre,
      language: language,
      poster: poster,
      rating: rating,
      movieId: movieId,
      webSite: webSite,
      runtime: runtime,
      year: year,
      synapsi: synapsi,
      typeMovie:typeMovie
    };
  
  };

  module.exports = MovieData;