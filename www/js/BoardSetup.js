var SQUAREMARGIN = 8;
var TILEWIDTH;
var SCREENWIDTH = window.innerWidth;

window.onload = function setUpScreen() {
  setBoardAndTileSizes();
  setPlayerEntryDialogBoxes();
}

function setPlayerEntryDialogBoxes() {
  isCpuGame = window.name;
  if (isCpuGame.localeCompare("false") != 0) {
    var colorSelectionDialog = document.getElementById('colorSelectionDialog');
    var dlg2 = new DialogFx(colorSelectionDialog);
    dlg2.toggle(dlg2);
  }
  else {
    var playerEntryDialog = document.getElementById('playerEntryDialog');
    var dlg1 = new DialogFx(playerEntryDialog);
    dlg1.toggle(dlg1);
  }
}

function setBoardAndTileSizes() {

  var boardWidth = round(SCREENWIDTH - 50, 4);
  boardWidth = round(boardWidth, 5);
  boardWidth = round(boardWidth, 2);

  document.getElementById("board").style.width = boardWidth + "px";
  document.getElementById("board").style.paddingBottom = boardWidth + "px";

  setSquareWidthAndMargins((boardWidth - (SQUAREMARGIN * 5)) / 4);
  TILEWIDTH = document.getElementById("pos0").getBoundingClientRect().width;
}

function setSquareWidthAndMargins(squareWidth) {
  var elements = document.getElementsByClassName("square");
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      elements[(4 * i) + j].style.width = (squareWidth + "px");
      elements[(4 * i) + j].style.paddingBottom = (squareWidth + "px");
      elements[(4 * i) + j].style.left = (j * squareWidth) + ((j + 1) * SQUAREMARGIN) + "px";
      elements[(4 * i) + j].style.top = (i * squareWidth) + ((i + 1) * SQUAREMARGIN) + "px";
    }
  }
}

var round = function (x, to) {
  return Math.floor(x / to) * to;
};
