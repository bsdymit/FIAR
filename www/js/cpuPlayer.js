function playCpuTurn() {
    easyMove();
}

function easyMove() {
    var chosenEmptyTile = Math.random() < 0.5 ? 0 : 3;
    var locationOfChosenEmptyTile = BOARDSTATE.indexOf(chosenEmptyTile);
    var tileToMoveLoc = getTileToMove(locationOfChosenEmptyTile);

	makeMove(chosenEmptyTile, locationOfChosenEmptyTile, BOARDSTATE[tileToMoveLoc], tileToMoveLoc);
}

function getTileToMove(locationOfChosenEmptyTile) {
    var listOfAdjTileLocs = getAdjacentTileLocations(locationOfChosenEmptyTile);
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

function makeMove(chosenEmptyTile, locationOfChosenEmptyTile, tileToMove, tileToMoveLoc) {
	var chosenEmptyTileElement = document.getElementById("pos" + chosenEmptyTile);
	var tileToMoveElement = document.getElementById("pos" + tileToMove);
	
	var chosenEmptyTileLeft = parseInt(chosenEmptyTileElement.style.left.replace("px", ""));
	var chosenEmptyTileTop = parseInt(chosenEmptyTileElement.style.top.replace("px", ""));
	var tileToMoveLeft = parseInt(tileToMoveElement.style.left.replace("px", ""));
	var tileToMoveTop = parseInt(tileToMoveElement.style.top.replace("px", ""));
	
	var tileDiff = locationOfChosenEmptyTile - tileToMoveLoc;

	if(tileDiff < 0 && tileDiff < -1) {
		chosenEmptyTileElement.style.top = (chosenEmptyTileTop + (TILEWIDTH + SQUAREMARGIN)) + "px";
		tileToMoveElement.style.top = (tileToMoveTop - (TILEWIDTH + SQUAREMARGIN)) + "px";
		
		var temp = BOARDSTATE[tileToMoveLoc];
		BOARDSTATE[tileToMoveLoc] = BOARDSTATE[tileToMoveLoc-4];
		BOARDSTATE[tileToMoveLoc-4] = temp;
	}
	else if(tileDiff < 0 && tileDiff == -1) {
		chosenEmptyTileElement.style.left = (chosenEmptyTileLeft + (TILEWIDTH + SQUAREMARGIN)) + "px";
		tileToMoveElement.style.left = (tileToMoveLeft - (TILEWIDTH + SQUAREMARGIN)) + "px";
		
		var temp = BOARDSTATE[tileToMoveLoc];
		BOARDSTATE[tileToMoveLoc] = BOARDSTATE[tileToMoveLoc-1];
		BOARDSTATE[tileToMoveLoc-1] = temp;
	}
	else if(tileDiff > 0 && tileDiff > 1){
		chosenEmptyTileElement.style.top = (chosenEmptyTileTop - (TILEWIDTH + SQUAREMARGIN)) + "px";
		tileToMoveElement.style.top = (tileToMoveTop + (TILEWIDTH + SQUAREMARGIN)) + "px";
		
		var temp = BOARDSTATE[tileToMoveLoc];
		BOARDSTATE[tileToMoveLoc] = BOARDSTATE[tileToMoveLoc+4];
		BOARDSTATE[tileToMoveLoc+4] = temp;
	}
	else {
		chosenEmptyTileElement.style.left = (chosenEmptyTileLeft - (TILEWIDTH + SQUAREMARGIN)) + "px";
		tileToMoveElement.style.left = (tileToMoveLeft + (TILEWIDTH + SQUAREMARGIN)) + "px";
		
		var temp = BOARDSTATE[tileToMoveLoc];
		BOARDSTATE[tileToMoveLoc] = BOARDSTATE[tileToMoveLoc+1];
		BOARDSTATE[tileToMoveLoc+1] = temp;
	}
	
	var winningColor = checkForWinner();
    if(winningColor == playerColors[0] || winningColor == playerColors[1])
      endGame(playerColors.indexOf(winningColor));

    if(lastMovedTileNumber != -1)
      document.getElementById("pos" + lastMovedTileNumber).style.border = "";
    setLastMovedTileNumber(tileToMove);
    document.getElementById("pos" + lastMovedTileNumber).style.border = "2px white dotted";
}
