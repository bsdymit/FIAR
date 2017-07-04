var SQUAREMARGIN = 8;
var TILEWIDTH;

window.onload = function setUpScreen() {
  setBoardAndTileSizes();
  setGameDialogBoxes();
  document.getElementById("currentPlayer").innerHTML = getCurrentPlayer();
  document.getElementById("currentPlayer").style.color = "black";
}

function setGameDialogBoxes() {
/*   document.getElementById("quitToMenuScreen").style.left = screen.width/4 + "px";
  document.getElementById("quitToMenuScreen").style.top = screen.height/4 + "px"; */
}

function setBoardAndTileSizes() {

  var boardWidth = round(screen.width - 50, 4);
  boardWidth = round(boardWidth, 5);
  boardWidth = round(boardWidth, 2);

  document.getElementById("board").style.width = boardWidth + "px";
  document.getElementById("board").style.paddingBottom = boardWidth + "px";

  setSquareWidthAndMargins((boardWidth - (SQUAREMARGIN * 5)) / 4);
  TILEWIDTH = document.getElementById("pos0").getBoundingClientRect().width;
}

function setSquareWidthAndMargins(squareWidth){
  var elements = document.getElementsByClassName("square");
  for (var i = 0; i < 4; i++) {
    for(var j = 0; j < 4; j++) {
      elements[(4*i)+j].style.width = (squareWidth + "px");
      elements[(4*i)+j].style.paddingBottom = (squareWidth + "px");
      elements[(4*i)+j].style.left = (j*squareWidth) + ((j+1)*SQUAREMARGIN) + "px";
      elements[(4*i)+j].style.top = (i*squareWidth) + ((i+1)*SQUAREMARGIN) + "px";
    }
  }
}

var round = function (x, to) {
    return Math.floor(x / to) * to;
};
