var players = ["Player 1", "Player 2"];
var currentPlayer = players[0];
var playerColors = ["red", "blue"];

function setCurrentPlayer(currentPlayer) {
   this.currentPlayer = currentPlayer;
}

function getCurrentPlayer() {
 return currentPlayer;
}

function nextPlayer() {
  if(currentPlayer == players[0])
    currentPlayer = players[1];
  else
    currentPlayer = players[0];

  document.getElementById("currentPlayer").innerHTML = currentPlayer;
  document.getElementById("currentPlayer").style.backgroundColor = playerColors[players.indexOf(currentPlayer)];
}
