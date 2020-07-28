// Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente. Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:
// 1. Titolo
// 2. Titolo Originale
// 3. Lingua
// 4. Voto

//chiamata: https://api.themoviedb.org/3/search/movie
//api_key: e99307154c6dfb0b4750f6603256716d

function addSearchClickListener(){
var target = $('#search');
target.click(getMovies);
}

function getMovies(){
  var target = $('#query');
  var query = target.val();
  var apiKey = 'e99307154c6dfb0b4750f6603256716d';
  target.val('');

$.ajax({

  url: 'https://api.themoviedb.org/3/search/movie',
  method: 'GET',
  data: {

    'api_key': apiKey,
    'query': query,
    'language': 'it'
  },

  success: function(data){
    console.log(data);

    var movies = data['results'];

    //voto stelle numerico

    var results = movies.map(function(voto) {return voto.vote_average;});
    console.log('result',results);

    for (var i = 0; i < results.length; i++) {
      var stars = results[i];
      var star = ((Math.ceil(stars))/2).toFixed(0);
      console.log(star);
   }

    // scaffold di Handelbars
    var target = $('#results ul')
    var template = $('#movie-template').html();
    var compiled = Handlebars.compile(template);
    target.text('');

    for (var i = 0; i < movies.length; i++) {
      var movie = movies[i];
      var movieHTML = compiled(movie);
      target.append(movieHTML);
    }
  },
  error: function(error){
    console.log('error', error);
  }
});
}


// Trasformiamo poi la stringa statica della lingua in una vera e propria bandiera della nazione corrispondente, gestendo il caso in cui non abbiamo la bandiera della nazione ritornata dall’API (le flag non ci sono in FontAwesome).

// Allarghiamo poi la ricerca anche alle serie tv. Con la stessa azione di ricerca dovremo prendere sia i film che corrispondono alla query, sia le serie tv, stando attenti ad avere alla fine dei valori simili (le serie e i film hanno campi nel JSON di risposta diversi, simili ma non sempre identici)






function init(){
  addSearchClickListener();
}
$(document).ready(init);
