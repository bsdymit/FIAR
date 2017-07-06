var players = [];
var currentPlayer;
var playerColors = ["teal", "grey"];

function enterPlayer() {
  var inputElement = document.getElementById("playerInput");

  if(players.length == 0)
  {
    if(inputElement.value == "")
      players.push("Player 1");
    else
      players.push(inputElement.value);

    setCurrentPlayer(players[0]);
    document.getElementById("currentPlayer").innerHTML = getCurrentPlayer();
    document.getElementById("currentPlayer").style.color = "black";
    document.getElementById("currentPlayer").style.backgroundColor = playerColors[0];

    inputElement.value = "";
    document.getElementById("playerEntryPrompt").innerHTML = "Two";

    document.getElementById("enterPlayerOkay").setAttribute('data-dialog-close', '');
    document.getElementById("enterPlayerSkip").setAttribute('data-dialog-close', '');

    var playerEntryDialog = document.getElementById( 'playerEntryDialog'  );
		var dlg = new DialogFx( playerEntryDialog );
    dlg.toggle(dlg);
  }
  else
  {
    if(inputElement.value == "")
      players.push("Player 2");
    else
      players.push(inputElement.value);
  }
}

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
