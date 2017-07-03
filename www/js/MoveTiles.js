function moveTileRight(currXCoord, currYCoord) {
  var blankTile = document.getElementById("pos" + (BOARDSTATE[currentPositionInBoardState+1]));
  blankTile.style.left = (parseInt(blankTile.style.left.replace("px", "")) - (TILEWIDTH + SQUAREMARGIN)) + "px";

  selectedTile.style.left = (selectedTileLeft + (TILEWIDTH + SQUAREMARGIN)) + "px";

  var temp = BOARDSTATE[currentPositionInBoardState];
  BOARDSTATE[currentPositionInBoardState] = BOARDSTATE[currentPositionInBoardState+1];
  BOARDSTATE[currentPositionInBoardState+1] = temp;

  startingXCoord = currXCoord;
  startingYCoord = currYCoord;
  currentPositionInBoardState = BOARDSTATE.indexOf(selectedTileNumber);
  distanceFromStart = Math.abs(selectedTilePosition - currentPositionInBoardState);
  previousMoveDirection = "right";
}

function moveTileLeft(currXCoord, currYCoord) {
  var blankTile = document.getElementById("pos" + (BOARDSTATE[currentPositionInBoardState-1]));
  blankTile.style.left = (parseInt(blankTile.style.left.replace("px", "")) + (TILEWIDTH + SQUAREMARGIN)) + "px";

  selectedTile.style.left = (selectedTileLeft - (TILEWIDTH + SQUAREMARGIN)) + "px";

  var temp = BOARDSTATE[currentPositionInBoardState];
  BOARDSTATE[currentPositionInBoardState] = BOARDSTATE[currentPositionInBoardState-1];
  BOARDSTATE[currentPositionInBoardState-1] = temp;

  startingXCoord = currXCoord;
  startingYCoord = currYCoord;
  currentPositionInBoardState = BOARDSTATE.indexOf(selectedTileNumber);
  distanceFromStart = Math.abs(selectedTilePosition - currentPositionInBoardState);
  previousMoveDirection = "left";
}

function moveTileUp(currXCoord, currYCoord) {
  var blankTile = document.getElementById("pos" + (BOARDSTATE[currentPositionInBoardState-4]));
  blankTile.style.top = (parseInt(blankTile.style.top.replace("px", "")) + (TILEWIDTH + SQUAREMARGIN)) + "px";

  selectedTile.style.top = (selectedTileTop - (TILEWIDTH + SQUAREMARGIN)) + "px";

  var temp = BOARDSTATE[currentPositionInBoardState];
  BOARDSTATE[currentPositionInBoardState] = BOARDSTATE[currentPositionInBoardState-4];
  BOARDSTATE[currentPositionInBoardState-4] = temp;

  startingXCoord = currXCoord;
  startingYCoord = currYCoord;
  currentPositionInBoardState = BOARDSTATE.indexOf(selectedTileNumber);
  distanceFromStart = Math.abs(selectedTilePosition - currentPositionInBoardState);
  previousMoveDirection = "up";
}

function moveTileDown(currXCoord, currYCoord) {
  var blankTile = document.getElementById("pos" + (BOARDSTATE[currentPositionInBoardState+4]));
  blankTile.style.top = (parseInt(blankTile.style.top.replace("px", "")) - (TILEWIDTH + SQUAREMARGIN)) + "px";

  selectedTile.style.top = (selectedTileTop + (TILEWIDTH + SQUAREMARGIN)) + "px";

  var temp = BOARDSTATE[currentPositionInBoardState];
  BOARDSTATE[currentPositionInBoardState] = BOARDSTATE[currentPositionInBoardState+4];
  BOARDSTATE[currentPositionInBoardState+4] = temp;

  startingXCoord = currXCoord;
  startingYCoord = currYCoord;
  currentPositionInBoardState = BOARDSTATE.indexOf(selectedTileNumber);
  distanceFromStart = Math.abs(selectedTilePosition - currentPositionInBoardState);
  previousMoveDirection = "down";
}
