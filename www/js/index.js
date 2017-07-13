document.addEventListener('deviceready', function() {
  setTimeout(function() {navigator.splashscreen.hide();}, 1);
});

$(function() {
  $('#gameTitle').fadeIn(500,function() {
    $('#play').fadeIn(500,function() {
       $('#howToPlay').fadeIn(500,function() {
         $('#about').fadeIn(500)
       })});
    });
});
