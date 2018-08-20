function playCpuTurn() {
    easyMove();
}

function easyMove() {
    var chosenEmptyTile = Math.random() < 0.5 ? 0 : 3;
    var locationOfChosenEmptyTile = BOARDSTATE.indexOf(chosenEmptyTile);
    var tileToMove = getTileToMove(locationOfChosenEmptyTile);
	
	makeMove(locationOfChosenEmptyTile, tileToMove);
}

function getTileToMove(locationOfChosenEmptyTile) {
    var listOfAdjTileLocs = getAdjacentTileLocations(locationOfChosenEmptyTile);
	document.getElementById("poop").innerHTML = listOfAdjTileLocs;
	return listOfAdjTileLocs[Math.floor(Math.random()*listOfAdjTileLocs.length)];
}

function getAdjacentTileLocations(locationOfChosenEmptyTile) {
    var listOfAdjacentTiles = [];

    if(locationOfChosenEmptyTile != 0 && locationOfChosenEmptyTile != 4
        && locationOfChosenEmptyTile != 8 && locationOfChosenEmptyTile != 12) {
            listOfAdjacentTiles.push(locationOfChosenEmptyTile - 1);
    }

    if(locationOfChosenEmptyTile != 3 && locationOfChosenEmptyTile != 7
        && locationOfChosenEmptyTile != 11 && locationOfChosenEmptyTile != 15) {
            listOfAdjacentTiles.push(locationOfChosenEmptyTile + 1);
    }

    if(locationOfChosenEmptyTile != 0 && locationOfChosenEmptyTile != 1
        && locationOfChosenEmptyTile != 2 && locationOfChosenEmptyTile != 3) {
            listOfAdjacentTiles.push(locationOfChosenEmptyTile - 4);
    }

    if(locationOfChosenEmptyTile != 12 && locationOfChosenEmptyTile != 13
        && locationOfChosenEmptyTile != 14 && locationOfChosenEmptyTile != 15) {
            listOfAdjacentTiles.push(locationOfChosenEmptyTile + 4);
    }

    for(i = 0; i < listOfAdjacentTiles.length; i++) {
		if(BOARDSTATE[listOfAdjacentTiles[i]] == 0 || BOARDSTATE[listOfAdjacentTiles[i]] == 3
		|| lastMovedTile(BOARDSTATE[listOfAdjacentTiles[i]]))
			listOfAdjacentTiles.splice(i, 1);
	}

    return listOfAdjacentTiles;
}

function makeMove(emptyTileLoc, selectedTileLoc) {
	var winningColor = checkForWinner();
    if(winningColor == playerColors[0] || winningColor == playerColors[1])
      endGame(playerColors.indexOf(winningColor));

    if(lastMovedTileNumber != -1)
      document.getElementById("pos" + BOARDSTATE[selectedTileLoc]).style.border = "";
    setLastMovedTileNumber(BOARDSTATE[selectedTileLoc]);
    document.getElementById("pos" + BOARDSTATE[selectedTileLoc]).style.border = "2px white dotted";

    nextPlayer(isCpuGame);
}
