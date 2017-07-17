function checkForWinner() {
  var winningColor = "none";

  var rowsWinner = checkRowsForWinner();
  var columnsWinner = checkColumnsForWinner();
  var diagsWinner = checkDiagsForWinner();

  if(rowsWinner != "none")
    winningColor = rowsWinner;
  else if(columnsWinner != "none")
    winningColor = columnsWinner;
  else if(diagsWinner != "none")
    winningColor = diagsWinner;

  return winningColor;
}

function checkRowsForWinner() {
  var winningColor = "none";
  var numberOfRedInRow = 0;
  var numberOfBlueInRow = 0;

  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if(document.getElementById("pos" + BOARDSTATE[(4*i)+j]).className.includes("color1"))
        numberOfRedInRow++;
      else if(document.getElementById("pos" + BOARDSTATE[(4*i)+j]).className.includes("color2"))
        numberOfBlueInRow++;
    }

    if(numberOfRedInRow == 4)
      winningColor = playerColors[0];
    else if(numberOfBlueInRow == 4)
      winningColor = playerColors[1];

    numberOfRedInRow = 0;
    numberOfBlueInRow = 0;
  }

  return winningColor;
}

function checkColumnsForWinner() {
  var winningColor = "none";
  var numberOfRedInColumn = 0;
  var numberOfBlueInColumn = 0;

  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if(document.getElementById("pos" + BOARDSTATE[(4*j)+i]).className.includes("color1"))
        numberOfRedInColumn++;

      else if(document.getElementById("pos" + BOARDSTATE[(4*j)+i]).className.includes("color2"))
        numberOfBlueInColumn++;
    }

    if(numberOfRedInColumn == 4)
      winningColor = playerColors[0];
    else if(numberOfBlueInColumn == 4)
      winningColor = playerColors[1];

    numberOfRedInColumn = 0;
    numberOfBlueInColumn = 0;
  }
  return winningColor;
}

function checkDiagsForWinner() {
  var winningColor = "none";
  var numberOfRedInDiag = 0;
  var numberOfBlueInDiag = 0;

  for (var i = 0; i < 4; i++) {
    if(document.getElementById("pos" + BOARDSTATE[(4*i)+i]).className.includes("color1"))
      numberOfRedInDiag++;

    else if(document.getElementById("pos" + BOARDSTATE[(4*i)+i]).className.includes("color2"))
      numberOfBlueInDiag++;
  }

  if(numberOfRedInDiag == 4)
      winningColor = playerColors[0];
    else if(numberOfBlueInDiag == 4)
      winningColor = playerColors[1];

    numberOfRedInDiag = 0;
    numberOfBlueInDiag = 0;

  for (var i = 0; i < 4; i++) {
    if(document.getElementById("pos" + BOARDSTATE[(4*i)+(3-i)]).className.includes("color1"))
      numberOfRedInDiag++;

    else if(document.getElementById("pos" + BOARDSTATE[(4*i)+(3-i)]).className.includes("color2"))
      numberOfBlueInDiag++;
  }

  if(numberOfRedInDiag == 4)
      winningColor = playerColors[0];
    else if(numberOfBlueInDiag == 4)
      winningColor = playerColors[1];

  return winningColor;
}

function endGame(winningColorIndex) {
  var winningPlayerName = players[winningColorIndex];
  var winningPlayerColor = playerColors[winningColorIndex];
  document.getElementById("winner").innerHTML = winningPlayerName.charAt(0).toUpperCase() + winningPlayerName.slice(1);
  document.getElementById("winner").style.color = winningPlayerColor;
	var endgamedialog = document.getElementById( 'endgamedialog'  );
	var dlg = new DialogFx( endgamedialog );
  dlg.toggle(dlg);
}
