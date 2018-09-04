document.addEventListener('deviceready', function() {
  setTimeout(function() {navigator.splashscreen.hide();}, 3000);
});

$(function() {
  $('#gameTitle').fadeIn(1000,function() {
    $('#play').fadeIn(500,function() {
       $('#howToPlay').fadeIn(500,function() {
         $('#about').fadeIn(500)
       })});
    });
});
