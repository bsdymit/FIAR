function onDeviceReady() {
  setTimeout(navigator.splashscreen.hide(), 30s0);
}

$(function() {
  $('#gameTitle').fadeIn(500,function() {
    $('#play').fadeIn(500,function() {
       $('#howToPlay').fadeIn(500,function() {
         $('#about').fadeIn(500)
       })});
    });
});
