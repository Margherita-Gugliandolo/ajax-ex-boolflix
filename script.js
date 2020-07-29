//chiamata: https://api.themoviedb.org/3/search/movie
//api_key: e99307154c6dfb0b4750f6603256716d

function addSearchClickListener(){
var target = $('#search');
target.click(startSearch);
}

function startSearch(query){

  var target = $('#query');
  var query = target.val();
  target.val('');

  var targetResults = $('#results');
  targetResults.text('');

  getMovies(query);
  getSeries(query);
}

function getMovies(query){

$.ajax({

  url: 'https://api.themoviedb.org/3/search/movie',
  method: 'GET',
  data: {

    'api_key': 'e99307154c6dfb0b4750f6603256716d',
    'query': query,
    'language': 'it'
  },

  success: function(data){
    console.log(data);

    var movies = data['results'];

    // scaffold di Handelbars
    var template = $('#movie-template').html();
    var compiled = Handlebars.compile(template);
    var target = $('#results');

    for (var i = 0; i < movies.length; i++) {
      var movie = movies[i];

      var vote = movie['vote_average'];
      movie.stars = getStars(vote);

      var lang = movie['original_language'];
      movie.flag = getFlag(lang);

      var title = movie['title'];

      movie.title = '<h3 class="movie-title"></h3>' + title;

      var originalTitle = movie['original_title'];
      movie.original_title = '<p class="original-title"></p>' + originalTitle;

      var movieHTML = compiled(movie);
      target.append(movieHTML);
    }
  },
  error: function(error){
    console.log('error', error);
  }
});
}

function getSeries(){


}


function getStars(vote){
  vote = Math.ceil(vote / 2);

  voteHTML = '';

  for (var j = 0; j < 5; j++) {
    if ( j < vote){
      voteHTML += '<i class="fas fa-star"></i>';
    } else{
      voteHTML += '<i class="far fa-star"></i>';
    }
  }
  return voteHTML;
}

function getFlag(lang){

  if(lang ==='it' || lang === 'en' || lang === 'ja'){
    return `<img class="flag" src="img/${lang}.png">`;
  }
  return lang;
}

function init(){
  addSearchClickListener();

  // debug;
  startSearch();
}
$(document).ready(init);
