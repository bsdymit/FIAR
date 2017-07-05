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
      if(document.getElementById("pos" + BOARDSTATE[(4*i)+j]).className.includes("red"))
        numberOfRedInRow++;
      else if(document.getElementById("pos" + BOARDSTATE[(4*i)+j]).className.includes("blue"))
        numberOfBlueInRow++;
    }

    if(numberOfRedInRow == 4)
      winningColor = "red";
    else if(numberOfBlueInRow == 4)
      winningColor = "blue";

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
      if(document.getElementById("pos" + BOARDSTATE[(4*j)+i]).className.includes("red"))
        numberOfRedInColumn++;

      else if(document.getElementById("pos" + BOARDSTATE[(4*j)+i]).className.includes("blue"))
        numberOfBlueInColumn++;
    }

    if(numberOfRedInColumn == 4)
      winningColor = "red";
    else if(numberOfBlueInColumn == 4)
      winningColor = "blue";

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
    if(document.getElementById("pos" + BOARDSTATE[(4*i)+i]).className.includes("red"))
      numberOfRedInDiag++;

    else if(document.getElementById("pos" + BOARDSTATE[(4*i)+i]).className.includes("blue"))
      numberOfBlueInDiag++;
  }

  if(numberOfRedInDiag == 4)
      winningColor = "red";
    else if(numberOfBlueInDiag == 4)
      winningColor = "blue";

    numberOfRedInDiag = 0;
    numberOfBlueInDiag = 0;

  for (var i = 0; i < 4; i++) {
    if(document.getElementById("pos" + BOARDSTATE[(4*i)+(3-i)]).className.includes("red"))
      numberOfRedInDiag++;

    else if(document.getElementById("pos" + BOARDSTATE[(4*i)+(3-i)]).className.includes("blue"))
      numberOfBlueInDiag++;
  }

  if(numberOfRedInDiag == 4)
      winningColor = "red";
    else if(numberOfBlueInDiag == 4)
      winningColor = "blue";

  return winningColor;
}

function endGame(winningColor) {
    document.getElementById("winner").innerHTML = winningColor.charAt(0).toUpperCase() + winningColor.slice(1) + " wins! ";

		var endgamedialog = document.getElementById( 'endgamedialog'  );
		var dlg = new DialogFx( endgamedialog );
    dlg.toggle(dlg);
}
