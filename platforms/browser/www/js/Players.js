var players = [];
var currentPlayer;
var playerColors = ["teal", "grey"];

function enterPlayer() {
  var inputElement = document.getElementById("playerInput");

  if (players.length == 0) {
    if (inputElement.value == "")
      players.push("Teal");
    else
      players.push(inputElement.value);

    setCurrentPlayer(players[0]);
    document.getElementById("currentPlayer").innerHTML = getCurrentPlayer();
    document.getElementById("currentPlayer").style.backgroundColor = playerColors[0];

    inputElement.value = "";
    document.getElementById("playerEntryPrompt").innerHTML = "Grey";
    document.getElementById("playerEntryPrompt").style.color = playerColors[1];

    document.getElementById("enterPlayerOkay").setAttribute('data-dialog-close', '');
    document.getElementById("enterPlayerSkip").setAttribute('data-dialog-close', '');

    var playerEntryDialog = document.getElementById('playerEntryDialog');
    var dlg = new DialogFx(playerEntryDialog);
    dlg.toggle(dlg);
  }
  else {
    if (inputElement.value == "")
      players.push("Grey");
    else
      players.push(inputElement.value);
  }
}

function playerChoseFirst() {
  var colorSelectionDialog = document.getElementById('colorSelectionDialog');
  var dlg1 = new DialogFx(colorSelectionDialog);
  dlg1.toggle(dlg1);

  document.getElementById("enterPlayerSkip").setAttribute('data-dialog-close', '');
  document.getElementById("enterPlayerOkay").setAttribute('data-dialog-close', '');
  document.getElementById("enterPlayerSkip").setAttribute('onClick', 'cpuGoesSecond()');
  document.getElementById("enterPlayerOkay").setAttribute('onClick', 'cpuGoesSecond()');

  var playerEntryDialog = document.getElementById('playerEntryDialog');
  var dlg2 = new DialogFx(playerEntryDialog);
  dlg2.toggle(dlg2);
}

function cpuGoesSecond() {
  var inputElement = document.getElementById("playerInput");

  if (players.length == 0) {
    if (inputElement.value == "")
      players.push("Teal");
    else
      players.push(inputElement.value);
  }

players.push("CPU");

  setCurrentPlayer(players[0]);
  document.getElementById("currentPlayer").innerHTML = getCurrentPlayer();
  document.getElementById("currentPlayer").style.backgroundColor = playerColors[0];
}

function playerChoseSecond() {
  players.push("CPU");
  setCurrentPlayer(players[0]);

  document.getElementById("enterPlayerSkip").setAttribute('data-dialog-close', '');
  document.getElementById("enterPlayerOkay").setAttribute('data-dialog-close', '');
  document.getElementById("enterPlayerSkip").setAttribute('onClick', 'cpuGoesFirst()');
  document.getElementById("enterPlayerOkay").setAttribute('onClick', 'cpuGoesFirst()');
  document.getElementById("playerEntryPrompt").innerHTML = "Grey";
  document.getElementById("playerEntryPrompt").style.color = playerColors[1];

  var colorSelectionDialog = document.getElementById('colorSelectionDialog');
  var dlg1 = new DialogFx(colorSelectionDialog);
  dlg1.toggle(dlg1);

  var playerEntryDialog = document.getElementById('playerEntryDialog');
  var dlg3 = new DialogFx(playerEntryDialog);
  dlg3.toggle(dlg3);
}

function cpuGoesFirst() {

}

function setCurrentPlayer(currentPlayer) {
  this.currentPlayer = currentPlayer;
  document.getElementById("currentPlayer").innerHTML = currentPlayer;
  document.getElementById("currentPlayer").style.backgroundColor = playerColors[players.indexOf(currentPlayer)];
}

function getCurrentPlayer() {
  return currentPlayer;
}

function nextPlayer(isCpuTurn) {
  if (currentPlayer == players[0])
    currentPlayer = players[1];
  else
    currentPlayer = players[0];

  document.getElementById("currentPlayer").innerHTML = currentPlayer;
  document.getElementById("currentPlayer").style.backgroundColor = playerColors[players.indexOf(currentPlayer)];

  if (isCpuTurn.localeCompare("false") != 0) {
    playCpuTurn(isCpuTurn);
    nextPlayer(false);
  }
}
