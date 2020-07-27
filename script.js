// Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente. Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:
// 1. Titolo
// 2. Titolo Originale
// 3. Lingua
// 4. Voto

function addSearch() {
  var button = $('#btn');
  var input = $('#search');
  button.click(getClick);
}

function getClick() {
  var input = $('#search');
  var query = input.val();
  if (query) {
    search(query);
  }
}

// chiamata ajax

function search (query) {
  var apiKey = 'e99307154c6dfb0b4750f6603256716d';
  var input = $('#search');
  input.val('');

  $.ajax({
    url: 'https://api.themoviedb.org/3/search/movie',
    method: 'GET',
    data: {
      'api_key': apiKey,
      'query': query,
      'language': 'it-IT'
    },
    success: function(data) {
      var results = data['results'];
      var totalResults = data['total_results'];

      if (totalResults > 0) {

        //Print results
        printSearchResult (results);
      } else {
        console.log(error);
      }
    },
    error: function(error) {
      console.log(error);
    }
  });
}

 // print results

function printSearchResult (results){
  var template=$('#template').html();
  var templateScript = Handlebars.compile(template);
  var target = $('.container');
  target.html('');
  var compiled = Handlebars.compile(template);

  for (var i = 0; i < results.length; i++) {
    var result = results[i];
    console.log(results);
    var compiledHTML = compiled({
      name: result.title,
      original_title: result.original_title,
      original_language: result.original_language,
      popularity: result.vote_average
    });
  target.append(compiledHTML);
}
}



function init() {
  console.log('hello world');
  addSearch();
}



$(document).ready(init);
