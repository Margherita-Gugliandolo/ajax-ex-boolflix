function getObjectTemplate(){
  var template = $('#template').html();
  var templateScript = Handlebars.compile(template);
  var target = $('.container');
  var context ={
    titolo: 'prova',
    titoloOriginale: 2019,
    lingua: 'italiano',
    voto: 5
  }

  var html = templateScript(context);
  target.append(html);
}




function init() {
  console.log('hello world');
  getObjectTemplate();
}

$(document).ready(init);
